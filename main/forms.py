# main/forms.py

from django import forms
from .models import *
from django.utils.timezone import now


class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'description', 'tags', 'skills', 'start_date', 'progress']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['start_date'].initial = now()
        self.fields['progress'].initial = 0
