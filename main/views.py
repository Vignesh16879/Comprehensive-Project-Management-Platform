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
from .forms import *


# Create your views here.
def Home(request):
    try:
        data = {}
        user = get_object_or_404(User, id=request.user)
        auth = authenticate(request, username=user.email, password=user.password)
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
        data = {}
    
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
            email = request.POST.get('email')
            password = request.POST.get('password')
            user = authenticate(request, email=email, password=password)
            
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
            name = request.POST.get('name')
            email = request.POST.get('email')
            password = request.POST.get('password')
            confirm_password = request.POST.get('confirm_password')
            
            if password != confirm_password:
                messages.error(request, 'Passwords do not match.')
            elif User.objects.filter(email=email).exists():
                messages.error(request, 'Email is already registered.')
            else:
                User.objects.create_user(username=email, name=name, email=email, password=password).save()
                messages.success(request, 'Account created successfully.')
                
                return redirect('/')
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(request, 'register/index.html', data)


def SendNotification(to, bys, title, description, date):
    try:
        bys = list(bys)
        
        for by in bys:
            notification = Notification(to=to, by=by, title=title, description=description, date=date, is_viewed=False)
            notification.save()
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()


@csrf_exempt
def Projects(request):
    data = {}
    
    try:
        data = {"projects" : Project.objects.all()}
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(request, "projects/index.html", data)


@csrf_exempt
def CreateProject(request):
    data = {}
    
    try:
        if request.method == "POST":
            project = Project(title=request.POST.get('title'), description=request.POST.get('description'), tags=list(request.POST.getlist('tags')), skills=list(request.POST.getlist('skills')), start_date=now(), progress=request.POST.get('progress'))
            user = request.user
            project.host.add(user)
            project.user.add(user)
            project.save()
            user.projects.add(project)
            user.save()
            
            return redirect("/projects")
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(request, "addproject/index.html", data)


@csrf_exempt
def ProjectView(request, ProjectID):
    data = {}
    
    try:
        project = get_object_or_404(Project, id=ProjectID)
        data = {'project': project, 'users': project.user.all(), 'potential_users': project.potential_user.all(), 'assignments': project.assignments.all(), 'comments': project.comments.all(), 'tags': project.tags, 'languages': project.languages, 'skills': project.skills}
        
        if request.method == "POST":
            req = request.POST
            
            if "discussions" in req:
                if "add":
                    comment = Discussion(title=request.POST.get("title"), description=request.POST.get("description"), reply_to=None, date=now(), files=request.POST.get("files"), by=request.user)
                    comment.save()
                elif "reply" in req:
                    comment = Discussion(title=request.POST.get("title"), description=request.POST.get("description"), reply_to=request.POST.get("reply_to"), date=now(), files=request.POST.get("files"), by=request.user)
                    comment.save()
            elif "members" in req:
                if "add" in req:
                    invite = request.POST.get("invited")
                    project.invited.add(invite)
                    project.save()
                    # send notification
                elif "hire" in req:
                    hire = request.POST.get("hire")
                    project.user.add(hire)
                    project.potential_user.remove(hire)
                    hire.projects.add(project)
                    # send notification
                elif "delete" in req:
                    hire = request.POST.get("hire")
                    project.potential_user.remove(hire)
                    # send notification
                elif "remove" in req:
                    if request.user in project.host.all():
                        member = request.POST.get("member")
                        project.user.remove(member)
                        project.host.remove(member)
                        project.save()
                        # send notification
                elif "makehost" in req:
                    if request.user in project.host.all():
                        member = request.POST.get("member")
                        project.host.add(member)
                        project.save()
                        # send notification
                elif "drophost" in req:
                    if len(project.host.all()) > 2 and request.user in project.host.all():
                        member = request.POST.get("member")
                        project.host.remove(member)
                        project.save()
                        # send notification
            elif "assignment" in req:
                if "add":
                    if request.user in project.host.all():
                        assignment = Assignment(title=request.POST.get("title"), description=request.POST.get("description"), start_date=now(), end_date=request.POST.get("end_date"), files=request.POST.get("files"), by=request.user)
                        send_to = project.user.all()
                        send_to.remove(request.user)
                        # send notification
                elif "submit" in req:
                    assignment = request.POST.get("assignment")
                    submission = Submission(title=request.POST.get("title"), description=request.POST.get("description"), files=request.POST.get("files"), assignment = assignment, by=request.user)
                    submission.save()
                    SendNotification(assignment.by, request.user, f"Assignment-{title} Submitted", f"Assignment-{title} submitted by {request.user.name} on date {now()}.", now())
                    pass
                elif "delete" in req:
                    assignment = get_object_or_404(Assignment, id=request.POST.get["assignment"])
                    title = assignment.title
                    assignment.delete()
                    send_to = project.user.all()
                    send_to.remove(request.user)
                    SendNotification(send_to, request.user, f"Assignment-{title} deleted", f"Assignment-{title} deleted by {request.user.name} on date {now()}.", now())
            elif "settings" in req:
                # send notification
                pass
        else:
            pass
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(request, "project/index.html", data)


@csrf_exempt
def Profile(request):
    try:
        data = {}
        
        user = get_object_or_404(Project, id=request.user)
        data = {
            "user" : user
        }
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
        data = {}
    
    return render(
        request,
        "profile/index.html",
        data
    )


def Logout(request):
    auth_logout(request)
    
    return redirect('login')