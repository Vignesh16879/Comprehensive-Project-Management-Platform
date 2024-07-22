from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.template import loader
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

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
    
    return render(request, "singn-in&sign-up/index.html", {})

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


def ProjectView(request, projectID):
    project = Project.objects.get(pk=projectID)
    members = project.team.all()
    pseudo_members = project.pseudo_team.all()
    discussions = project.discussions.all()
    assignments = Assignment.objects.get(project=projectID)
    submissions = []
    
    for assignment in assignments:
        submissions.append(Submission.objects.get(assignment=assignment.id))
    
    if request.method == 'POST':
        pass
    
    return render(request, "project/index.html", { 'project' : project, 'members' : members, 'pseudo_members' : pseudo_members, 'discussions' : discussions, "assignments" : assignments, 'submissions' : submissions })


def Projects(request):
    projects = Project.objects.all().values()
    
    return render(request, "projects/index.html", { 'projects' : projects })

def Dash(request):
    return render(request, "dashboard/index.html", {})


def Profile(request, userID):
    return render(request, "profile/index.html", {})


def HomePage(request):
    testimonials = HomeTestimonial.objects.all()
    team_members = HomeTeamMember.objects.all()
    stats = HomeStatistic.objects.all()
    
    return render(request, 'home/index.html', { 'testimonials': testimonials, 'team_members': team_members, 'stats': stats })


def Colab(request):
    slider_images = {
        'img1.jpg': ['<h2>Slide 1</h2>', '<p>Content 1</p>'],
        'img2.jpg': ['<h2>Slide 2</h2>', '<p>Content 2</p>'],
        'img3.jpg': ['<h2>Slide 3</h2>', '<p>Content 3</p>'],
    }
    profiles = ColabProfile.objects.all() 
    countryOptions = []
    
    return render(request, 'colab/index.html', { 'sliderImages': slider_images, 'profiles': profiles, 'countryOptions': countryOptions })


def Logout(request):
    auth_logout(request)
    
    return redirect('login')


@login_required
def add_comment_view(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    
    if request.method == 'POST':
        comment_text = request.POST['comment']
        
        if comment_text:
            discussion = Discussion.objects.create(project=project, user=request.user, text=comment_text)
            project.discussions.add(discussion)
            project.save()
        
        return redirect('project/index.html', project_id=project.id)
    
    return render(request, 'project/index.html', {'project': project})


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