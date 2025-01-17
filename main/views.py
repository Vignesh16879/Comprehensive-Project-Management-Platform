import traceback

from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.template import loader
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.utils import timezone

from .models import *


# Create your views here.
def Home(request):
    data = {}
    
    try:
        user = get_object_or_404(User, id=request.user.id)
        user = authenticate(request, username=user.email, password=user.password)
        data = {"user" : request.user}
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(
        request,
        "home/index.html",
        data
    )


@csrf_exempt
def Login(request):
    data = {}
    
    try:
        if request.method == "POST":
            user = authenticate(request, email=request.POST.get('email'), password=request.POST.get('password'))
            
            if user is not None:
                auth_login(request, user)
                
                return redirect('/')
            else:
                messages.error(request, 'Invalid email or password.')
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(request, 'login/index.html', data)


@csrf_exempt
def Register(request):
    data = {}
    
    try:
        if request.method == "POST":
            if request.POST.get('password') != request.POST.get('confirm_password'):
                messages.error(request, 'Passwords do not match.')
            elif User.objects.filter(email=request.POST.get('email')).exists():
                messages.error(request, 'Email is already registered.')
            else:
                User.objects.create_user(username=request.POST.get("username"), name=f"{request.POST.get('f_name')} {request.POST.get('l_name')}", f_name=request.POST.get('f_name'), l_name=request.POST.get('l_name'), email=request.POST.get('email'), password=request.POST.get('password')).save()
                messages.success(request, 'Account created successfully.')
                
                return redirect('/login')
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(request, 'register/index.html', data)


def SendNotification(tos, by, title, description, date):
    try:
        tos = list(tos)
        
        for to in tos:
            notification = Notification(to=User.objects.get(id=to.id), by=User.objects.get(id=by.id), title=title, description=description, date=date, is_viewed=False)
            notification.save()
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()


@csrf_exempt
def Projects(request):
    data = {}
    
    try:
        if not request.user.is_authenticated:
            return redirect("/login")
        
        data = {"projects" : Project.objects.all(), "user" : User.objects.get(id=request.user.id)}
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(request, "projects/index.html", data)


def JoinProject(project, user):
    if user in project.invited.all():
        project.user.add(User.objects.get(id=user.id))
        SendNotification(project.host.all(), user, f"User: {user.name} joined the project.")
    else:
        project.potential_user.add(User.objects.get(id=user.id))
        SendNotification(project.host.all(), user, "Request to Join.", f"Hey, I am {user.name}. I want to join your project.", now())


@csrf_exempt
def CreateProject(request):
    data = {}
    
    try:
        if not request.user.is_authenticated:
            return redirect("/login")
        
        if request.method == "POST":
            project = Project(title=request.POST.get('title'), description=request.POST.get('description'), tags=list(request.POST.getlist('tags')), skills=list(request.POST.getlist('skills')), start_date=now(), end_date=now(), progress=request.POST.get('progress'), rating=0.0, status="Ongoing")
            project.save()
            project.host.add(User.objects.get(id=request.user.id))
            project.user.add(User.objects.get(id=request.user.id))
            user = get_object_or_404(User, id=request.user.id)
            user.projects.add(Project.objects.get(id=project.id))
            
            return redirect("/projects")
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(request, "addproject/index.html", data)


@csrf_exempt
def ProjectView(request, ProjectID, tab):
    data = {'tab' : tab}
    
    try:
        if not request.user.is_authenticated:
            return redirect("/login")
        
        project = get_object_or_404(Project, id=ProjectID)
        data.update({"user" : User.objects.get(id=request.user.id)})
        data.update({'tab' : tab, 'project': project, 'users': project.user.all(), 'potential_users': project.potential_user.all(), 'assignments': project.assignments.all(), 'comments': project.comments.all(), 'tags': project.tags, 'languages': project.languages, 'skills': project.skills})
        
        if request.method == "POST":
            req = request.POST
            
            if "discussions" in req:
                if "add":
                    comment = Discussion(title=request.POST.get("title"), description=request.POST.get("description"), project=Project.objects.get(id=ProjectID), reply_to=None, date=now(), files=request.POST.get("files"), by=request.user)
                elif "reply" in req:
                    comment = Discussion(title=request.POST.get("title"), description=request.POST.get("description"), project=Project.objects.get(id=ProjectID), reply_to=request.POST.get("reply_to"), date=now(), files=request.POST.get("files"), by=request.user)
                
                comment.save()
                project.comments.add(Discussion.objects.get(id=comment.id))
                
                return redirect(f"/project/{ProjectID}/discussions")
            elif "members" in req:
                if "add" in req:
                    invite = User.objects.get(id=request.POST.get("invited"))
                    project.invited.add(invite)
                    # send notification
                elif "hire" in req:
                    hire = User.objects.get(id=request.POST.get("hire"))
                    project.user.add(hire)
                    project.potential_user.remove(hire)
                    hire.projects.add(project)
                    # send notification
                elif "delete" in req:
                    hire = User.objects.get(id=request.POST.get("hire"))
                    project.potential_user.remove(hire)
                    # send notification
                elif "remove" in req:
                    if request.user in project.host.all():
                        member = User.objects.get(id=request.POST.get("member"))
                        project.user.remove(member)
                        project.host.remove(member)
                        project.save()
                        # send notification
                elif "makehost" in req:
                    if request.user in project.host.all():
                        member = User.objects.get(id=request.POST.get("member"))
                        project.host.add(member)
                        project.save()
                        SendNotification(member, request.user, f"Host: {project.title}", f"{request.user.name} added you to host for the project {project.title}.", now())
                elif "drophost" in req:
                    if len(project.host.all()) > 2 and request.user in project.host.all():
                        member = User.objects.get(id=request.POST.get("member"))
                        project.host.remove(member)
                        project.save()
                        SendNotification(member, request.user, f"No longer host", f"You are no longer host of the project {project.title}. Removed by {request.user.name}", now())
            elif "assignment" in req:
                if "add" in req:
                    if request.user in project.host.all():
                        assignment = Assignment(title=request.POST.get("title"), description=request.POST.get("description"), start_date=now(), end_date=request.POST.get("end_date"), files=request.POST.get("files"), by=request.user)
                        send_to = project.user.all()
                        send_to.remove(request.user)
                        SendNotification(send_to, request.user, f"New Assignment published.", f"New assignment made by {request.user.name} on date {now()} of the project {project.title()} submit it by {assignment.end_date}.", now())
                elif "submit" in req:
                    assignment = request.POST.get("assignment")
                    submission = Submission(title=request.POST.get("title"), description=request.POST.get("description"), files=request.POST.get("files"), assignment = assignment, by=request.user)
                    submission.save()
                    SendNotification(assignment.by, request.user, f"Assignment-{title} Submitted", f"Assignment-{title} submitted by {request.user.name} on date {now()}.", now())
                elif "delete" in req:
                    assignment = get_object_or_404(Assignment, id=request.POST.get["assignment"])
                    title = assignment.title
                    assignment.delete()
                    send_to = project.user.all()
                    send_to.remove(request.user)
                    SendNotification(send_to, request.user, f"Assignment-{title} deleted", f"Assignment-{title} deleted by {request.user.name} on date {now()}.", now())
            elif "settings" in req:
                if "change" in req:
                    Project.objects.filter(id=ProjectID).update(title=request.POST.get('title'), description=request.POST.get('description'), objectives=request.POST.get('objectives'), status=request.POST.get('status'), hiring=request.POST.get('hiring'))
                elif "completed" in req:
                    Project.objects.filter(id=ProjectID).update(status="Completed", hiring=False)
                elif "suspend" in req:
                    Project.objects.filter(id=ProjectID).update(status="Suspended", hiring=False)
                elif "delete" in req:
                    Project.objects.filter(id=ProjectID).delete()
        else:
            pass
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(request, "project/index.html", data)


@csrf_exempt
def Profile(request, tab="profile"):
    data = {'tab' : tab}
    
    try:
        if not request.user.is_authenticated:
            return redirect("/login")
        
        data.update({"user" : User.objects.get(id=request.user.id)})
        
        if request.method == "POST":
            req = request.POST
            
            if "Profile" in req:
                pass
            elif "Billing" in req:
                pass
            elif "Security" in req:
                pass
            elif "Notifications" in req:
                data.update({"notifications" : get_object_or_404(Notification, to=request.user)})
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(request, "profile/index.html", data)


def Colab(request):
    data = {}
    
    try:
        if not request.user.is_authenticated:
            return redirect("/login")
        
        data = {"user" : User.objects.get(id=request.user.id)}
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(request, 'colab/index.html', data)


def Dashboard(request):
    data = {}
    
    try:
        if not request.user.is_authenticated:
            return redirect("/login")
        
        data = {"user" : User.objects.get(id=request.user.id)}
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(request, 'dashboard/index.html', data)


def Logout(request):
    auth_logout(request)
    
    return redirect('login')
