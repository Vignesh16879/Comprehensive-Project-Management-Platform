from django.db.models import *
from datetime import datetime
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(email, password, **extra_fields)


def user_profile_path(instance, filename):
    return f'user_{instance.id}/{filename}'


class User(AbstractBaseUser):
    email = EmailField(unique=True)
    username = CharField(max_length=120)
    password = CharField(max_length=120)
    projects = ManyToManyField('Project', related_name='users')
    profile = ImageField(upload_to=user_profile_path)
    role = CharField(max_length=120)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.email


class Discussion(Model):
    user = ForeignKey(User, on_delete=CASCADE)
    time = DateTimeField(default=datetime.now)
    comment = TextField()
    
    def __str__(self):
        return f"Discussion by {self.user.username} at {self.time}"


class Project(Model):
    title = CharField(max_length=120)
    description = TextField()
    objectives = JSONField(default=list)
    status = CharField(max_length=120)
    files = JSONField(default=list)
    open_for_hire = BooleanField(default=False)
    team = ManyToManyField(User, related_name='team')
    pseudo_team = ManyToManyField(User, related_name='pseudo_team')
    discussions = ManyToManyField(Discussion, related_name='dicussion')
    start_date = DateTimeField(default=datetime.now)
    
    def __str__(self):
        return self.title


class Assignment(Model):
    title = CharField(max_length=120)
    description = TextField()
    files = JSONField(default=list)
    project = ForeignKey(Project, related_name='assignments', on_delete=CASCADE)
    
    def __str__(self):
        return self.title


class Submission(Model):
    assingment = ForeignKey(Assignment, on_delete=CASCADE)
    user = ForeignKey(User, on_delete=CASCADE)
    description = TextField()
    files = JSONField(default=list)
    comments = JSONField(default=list)
    
    def __str__(self):
        return f"Submission by {self.user.username} for {self.assingment.title}"


class HomeTestimonial(Model):
    name = CharField(max_length=100)
    image = ImageField(upload_to='testimonials/')
    content = TextField()

class HomeTeamMember(Model):
    name = CharField(max_length=100)
    image = ImageField(upload_to='team/')
    position = CharField(max_length=100)
    bio = TextField()
    linkedin_url = URLField()
    github_url = URLField()


class HomeStatistic(Model):
    name = CharField(max_length=100)
    value = IntegerField()
    
    def __str__(self):
        return self.name


class ColabProfile(Model):
    user = OneToOneField(User, on_delete=CASCADE)
    profession = CharField(max_length=255)
    img = ImageField(upload_to='profiles/', default='profiles/default.jpg')
    location = CharField(max_length=255)
    times = CharField(max_length=50, choices=[('Full-time', 'Full-time'), ('Part-time', 'Part-time'), ('Free Lancer', 'Free Lancer')])
    wages = CharField(max_length=100)
    exp =  CharField(max_length=100)
    description = TextField()
    
    def __str__(self):
        return self.user.username