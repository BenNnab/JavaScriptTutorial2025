from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Custom User Model
class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
        ('parent', 'Parent'),
        ('staff', 'Non-Academic Staff'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')

    def __str__(self):
        return self.username

# News Model
class News(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='news_posts')

    def __str__(self):
        return self.title

# Event Model
class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255)
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='events_posted')

    def __str__(self):
        return self.title

# Subject Model
class Subject(models.Model):
    name = models.CharField(max_length=100)
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'}, related_name='subjects_taught')

    def __str__(self):
        return self.name

# Class Model
class Class(models.Model):
    name = models.CharField(max_length=50)
    subjects = models.ManyToManyField(Subject, related_name='classes')
    students = models.ManyToManyField(settings.AUTH_USER_MODEL, limit_choices_to={'role': 'student'}, related_name='classes_enrolled')
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name="classes")  # Make sure this field exists

    def __str__(self):
        return self.name
    


# Parent Model
class Parent(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='parent_profile')
    children = models.ManyToManyField('Student', related_name='parents')

    def __str__(self):
        return self.user.get_full_name()

# Student Model
class Student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    classes = models.ManyToManyField(Class, related_name='students_enrolled')

    def __str__(self):
        return self.user.get_full_name()

# Grade Model
class Grade(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='grades')
    subject = models.CharField(max_length=100)
    grade = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.subject}: {self.grade}"