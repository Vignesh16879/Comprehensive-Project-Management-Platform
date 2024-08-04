from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from .views import *


urlpatterns = [
    path('', Home, name='home'),
    path('login', Login, name='login'),
    path('logout/', Logout, name='logout'),
    path('register', Register, name='register'),
    path('projects', Projects, name='projects'),
    path('addproject', CreateProject, name='addproject'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)