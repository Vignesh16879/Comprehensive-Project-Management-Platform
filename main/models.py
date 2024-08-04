from django.db.models import *
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser, BaseUserManager, Group, Permission


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
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(email, password, **extra_fields)


def user_profile_path(instance, filename):
    return f'user_{instance.id}/{filename}'


class User(AbstractUser):
    email = EmailField(unique=True)
    password = CharField(max_length=120)
    name = CharField(max_length=120)
    doe = DateField(default=now)
    rating = FloatField(default=0.0)
    languages = JSONField(default=list)
    profile = ImageField(upload_to=user_profile_path, null=True, blank=True)
    projects = ManyToManyField('Project', related_name='UserProjects')
    submissions = ManyToManyField('Submission', related_name='UserSubmissions')
    groups = ManyToManyField(Group, related_name='custom_user_set')
    user_permissions = ManyToManyField(Permission, related_name='custom_user_set_permissions')
    #######################
    objects = UserManager()


class Project(Model):
    title = CharField(max_length=120)
    description = TextField()
    start_date = DateTimeField(default=now)
    end_date = DateTimeField()
    rating = FloatField()
    progress = IntegerField(default=0)
    host = ManyToManyField('User', related_name='hosts')
    invited = ManyToManyField('User', related_name='invited')
    user = ManyToManyField('User', related_name='ProjectUser')
    potential_user = ManyToManyField('User', related_name='PotentialUser')
    assignments = ManyToManyField('Assignment', related_name='ProjectAssignment')
    status = CharField(max_length=120)
    comments = ManyToManyField('Discussion', related_name='ProjectDiscussion')
    tags = JSONField(default=list)
    languages = JSONField(default=list)
    skills = JSONField(default=list)


class Team(Model):
    name = CharField(max_length=120)
    project = OneToOneField('Project', related_name='TeamProject', on_delete=CASCADE)
    users = ManyToManyField('User', related_name='TeamUser')


class Discussion(Model):
    title = CharField(max_length=120)
    description = TextField()
    reply_to = OneToOneField('Discussion', related_name='Comments', on_delete=CASCADE)
    files = JSONField(default=list)
    date = DateTimeField(default=now)
    by = OneToOneField('User', related_name='UserDiscussion', on_delete=CASCADE)


class Assignment(Model):
    title = CharField(max_length=120)
    description = TextField()
    start_date = DateTimeField(default=now)
    end_date = DateTimeField()
    files = JSONField(default=list)
    by = OneToOneField('User', related_name='HostAssignment', on_delete=CASCADE)
    comments = ManyToManyField('Discussion', related_name='AssignmentDiscussion')
    project = OneToOneField('Project', related_name='AssignmentProject', on_delete=CASCADE)
    submitted_by = ManyToManyField('User', related_name='AssignmentUser')


class Submission(Model):
    title = CharField(max_length=120)
    description = TextField()
    files = JSONField(default=list)
    date = DateTimeField(default=now)
    by = OneToOneField('User', related_name='SubmissionUser', on_delete=CASCADE)
    assignment = OneToOneField('Assignment', related_name='SubmissionAssignment', on_delete=CASCADE)


class Notification(Model):
    title = CharField(max_length=120)
    description = TextField()
    date = DateTimeField(default=now)
    is_viewed = BooleanField(default=False)
    by = OneToOneField('User', related_name='tempNotification', on_delete=CASCADE)
    to = OneToOneField('User', related_name='UserNotification', on_delete=CASCADE)