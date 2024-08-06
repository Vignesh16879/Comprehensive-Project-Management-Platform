from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.template import loader
from django.http import JsonResponse
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.utils import timezone

import traceback

from .models import *
from .forms import *


# Create your views here.
@csrf_exempt
def Login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if "confirm_password" in request.POST:
            confirm_password = request.POST.get('confirm_password')

            if password != confirm_password:
                messages.error(request, 'Passwords do not match.')
            elif User.objects.filter(email=email).exists():
                messages.error(request, 'Email is already registered.')
            else:
                User.objects.create_user(email=email, password=password).save()
                messages.success(request, 'Account created successfully.')

                return redirect('/')
        else:
            user = authenticate(request, username=email, password=password)

            if user is not None:
                auth_login(request, user)
                
                return redirect('/')
            else:
                messages.error(request, 'Invalid email or password.')

    return render(request, 'login/index.html', {})

@csrf_exempt
def Register(request):
    data = {}
    
    try:
        if request.method == "POST":
            username = request.POST.get("username")
            f_name = request.POST.get('f_name')
            l_name = request.POST.get('l_name')
            email = request.POST.get('email')
            password = request.POST.get('password')
            confirm_password = request.POST.get('confirm_password')
            
            if password != confirm_password:
                messages.error(request, 'Passwords do not match.')
            elif User.objects.filter(email=email).exists():
                messages.error(request, 'Email is already registered.')
            else:
                User.objects.create_user(username=username, name=f"{f_name} {l_name}", f_name=f_name, l_name=l_name, email=email, password=password).save()
                messages.success(request, 'Account created successfully.')
                
                return redirect('/')
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(request, 'register/index.html', data)

@csrf_exempt
def Profile(request):
    data = {}
    
    try:
        user = get_object_or_404(User, id=request.user.id)
        data = {"user" : user}
        
        if request.method == "POST":
            req = request.POST
            
            if "Profile" in req:
                pass
            elif "Billing" in req:
                pass
            elif "Security" in req:
                pass
            elif "Notifications" in req:
                notifications = get_object_or_404(Notification, to=request.user)
                data["notifications"] = notifications
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()
    
    return render(
        request,
        "profile/index.html",
        data
    )

def GetUserId(request, user_id):
    user = get_object_or_404(User, id=user_id)
    return render(request, 'profile.html', {'user': user})


def CreateProject(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/projects')
    else:
        form = ProjectForm()
    return render(request, 'create-project/index.html', {'form': form})


def SendNotification(to, bys, title, description, date):
    try:
        bys = list(bys)
        
        for by in bys:
            notification = Notification(to=to, by=by, title=title, description=description, date=date, is_viewed=False)
            notification.save()
    except Exception as e:
        print("An error occurred:", e)
        traceback.print_exc()

def ProjectView(request, projectID):
    project = Project.objects.get(pk=projectID)
    
    # Fetch existing team and pseudo-team members
    members = project.team.all()
    pseudo_members = list(project.pseudo_team.all())
    
    # Fetch existing discussions
    discussions = list(project.discussions.all())
    
    # Fetch assignments and submissions
    try:
        assignments = Assignment.objects.filter(project=project)
    except Assignment.DoesNotExist:
        assignments = []
        
    submissions = []
    for assignment in assignments:
        submissions.extend(Submission.objects.filter(assignment=assignment))
        
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
                project.team.add(hire)
                project.pseudo_team.remove(hire)
                hire.projects.add(project)
                project.save()
                # send notification
            elif "delete" in req:
                hire = request.POST.get("hire")
                project.pseudo_team.remove(hire)
                project.save()
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
                    SendNotification(send_to, request.user, f"New Assignment published.", f"New assignment made by {request.user.name} on date {now()} of the project {project.title()} submit it by {assignment.end_date}.")
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
        elif 'mark_as_completed' in request.POST:
            project.status = 'Completed'  # Update status to 'Completed'
            project.save()
            return redirect('projects')
        elif 'suspend_project' in request.POST:
            project.status = 'Suspended'  # Update status to 'Suspended'
            project.save()
            return redirect('projects')
        
        elif 'delete_project' in request.POST:
            project.delete()
            return redirect('projects')
        elif "settings" in req:
            title = request.POST.get('title')
            description = request.POST.get('description')
            objectives = request.POST.get('objectives')
            tags = request.POST.get('tags')
            start_date = request.POST.get('start_date')
            open_for_hire = request.POST.get('open_for_hire') == 'yes'

            # Create a new project
            Project.objects.create(
                title=title,
                description=description,
                objectives=objectives,
                tags=[tag.strip() for tag in tags.split(',')],
                start_date=start_date,
                open_for_hire=open_for_hire,
                status='New',  # Set the initial status
                created_at=timezone.now()  # Optional: add a timestamp
            )

            # Redirect to a success page or project list
            return redirect('projects')
    
        
       
    # Extend the original lists with the example data
    hosts = list(project.hosts.all())
    members = list(members)
    pseudo_members = list(pseudo_members) 
    discussions = list(discussions) 
    assignments = list(assignments) 
    
    return render(request, "project/index.html", { 
        'project': project,
        'hosts': hosts,
        'members': members, 
        'pseudo_members': pseudo_members, 
        'discussions': discussions, 
        'assignments': assignments, 
        'submissions': submissions
    })


def Projects(request):
    projects = Project.objects.all()
    
    if request.method == "POST":
        user = request.user
        if 'confirm_join' in request.POST:
            if project.open_for_hire and not project.pseudo_team.filter(id=user.id).exists():
                project.pseudo_team.add(user)
                project.save()
                messages.success(request, 'You have successfully joined the project!')
        return redirect('projects')

    return render(request, "projects/index.html", { 'projects': projects, 'active_page': 'projects' })


def project_info(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    return render(request, 'project/index.html', {'project': project})

def project_discussions(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    return render(request, 'project/index.html', {'project': project})

def project_teams(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    return render(request, 'project/index.html', {'project': project})

def project_assignments(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    return render(request, 'project/index.html', {'project': project})

def project_settings(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    return render(request, 'project/index.html', {'project': project})

def Dash(request):
    projects = list(Project.objects.all().values())
    reviews = list(NetworkReview.objects.all().values())
    notifications = list(Notification.objects.all().values())
    todo_list = list(ToDoList.objects.all().values())
    
    # Calculate metrics
    total_projects = Project.objects.count()
    active_projects = Project.objects.filter(status='Active').count()
    completed_projects = Project.objects.filter(status='Completed').count()
    pending_projects = Project.objects.filter(status='Pending').count()
    
    # Assuming you have a way to get followers, adjust as needed
    followers = User.objects.count()
    
    tasks_done = Task.objects.filter(status='Completed').count()  # Adjust Task model as necessary

    # Calculate percentage changes (dummy data used here; replace with actual calculation)
    last_week_total_projects = 100  # Replace with actual data
    last_week_active_projects = 50  # Replace with actual data
    last_week_completed_projects = 30  # Replace with actual data
    last_week_pending_projects = 20  # Replace with actual data
    last_week_followers = 200  # Replace with actual data
    last_week_tasks_done = 150  # Replace with actual data

    percentage_changes = {
        'total_projects': ((total_projects - last_week_total_projects) / last_week_total_projects * 100) if last_week_total_projects else 0,
        'active_projects': ((active_projects - last_week_active_projects) / last_week_active_projects * 100) if last_week_active_projects else 0,
        'completed_projects': ((completed_projects - last_week_completed_projects) / last_week_completed_projects * 100) if last_week_completed_projects else 0,
        'pending_projects': ((pending_projects - last_week_pending_projects) / last_week_pending_projects * 100) if last_week_pending_projects else 0,
        'followers': ((followers - last_week_followers) / last_week_followers * 100) if last_week_followers else 0,
        'tasks_completed': ((tasks_done - last_week_tasks_done) / last_week_tasks_done * 100) if last_week_tasks_done else 0,
    }


    context = {
        'projects': projects,
        'reviews':reviews,
        'notifications': notifications,
        'todo_list': todo_list,
        'active_page': 'dashb',
        'users_total_projects': total_projects,
        'user_active_projects': active_projects,
        'user_completed_proj': completed_projects,
        'user_pending_proj': pending_projects,
        'followers': followers,
        'tasks_done': tasks_done,
        'percentage_changes': percentage_changes,

    }
    return render(request, "dashboard/index.html", context)


# -----------------

def HomePage(request):
    # user = get_object_or_404(User, id=user_id)
    # auth = authenticate(request, username=user.email, password=user.password)
    testimonials = HomeTestimonial.objects.all()
    team_members = HomeTeamMember.objects.all()
    stats = HomeStatistic.objects.all()
    
    return render(request, 'home/index.html', {
        # 'is_authenticated': auth,
        'testimonials': testimonials,
        'team_members': team_members,
        'stats': stats,
    })


def Colab(request):
    slider_images = {
        'img1.jpg': ['<h2>Slide 1</h2>', '<p>Content 1</p>'],
        'img2.jpg': ['<h2>Slide 2</h2>', '<p>Content 2</p>'],
        'img3.jpg': ['<h2>Slide 3</h2>', '<p>Content 3</p>'],
    }
    profiles = ColabProfile.objects.all() 
    countryOptions = [...]

    return render(request, 'colab/index.html', {
        'sliderImages': slider_images,
        'profiles': profiles,
        'countryOptions': countryOptions,
        'active_page': 'collab'
    })
    
def Logout(request):
    auth_logout(request)
    return redirect('login')
    

@login_required
def mark_as_completed(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    if request.user in project.team.all():  
        project.status = 'Completed'
        project.save()
    return redirect('projects') 

@login_required
def suspend_project(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    if request.user in project.team.all():  
        project.status = 'Suspended'
        project.save()
    return redirect('projects') 

@login_required
def delete_project(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    # if request.user in project.team.all():  
    project.delete()
    return redirect('projects')

@login_required
def profile_update(request):
    if request.method == 'POST':
        form = UserUpdateForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your profile has been updated!')
            return redirect('profile')  # Redirect to the profile page or another page
    else:
        form = UserUpdateForm(instance=request.user)
    
    return render(request, 'profile/index.html', {'form': form})
