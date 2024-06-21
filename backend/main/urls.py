from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from .views import *


router = routers.DefaultRouter()
router.register(r'register', RegisterView, basename='register')
router.register(r'login', LoginView, basename='login')
router.register(r'profile', ProfileView, basename='profile')
router.register(r'dashboard', DashboardView, basename='dashboard')
router.register(r'projects', ProjectsView, basename='projects')
router.register(r'assignments', AssignmentsView, basename='assignment')
router.register(r'manageprojects', ManageProjectsView, basename='manageprojects')
router.register(r'project', ProjectView, basename='project')


urlpatterns = [
    path("", include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)