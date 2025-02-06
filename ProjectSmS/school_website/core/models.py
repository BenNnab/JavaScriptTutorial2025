from django.contrib.auth.models import AbstractUser
from django.db import models
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

# CMS Models
class News(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField(help_text="Format: YYYY-MM-DD (e.g., 2025-02-06)")
    time = models.TimeField(help_text="Format: HH:MM:SS (24-hour format, e.g., 14:30:00)")
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.title

# Grade Model
class Grade(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE)
    score = models.FloatField()
    grade = models.CharField(max_length=2, blank=True)
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='teacher_grades')
    date_assigned = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.score >= 90:
            self.grade = 'A'
        elif self.score >= 80:
            self.grade = 'B'
        elif self.score >= 70:
            self.grade = 'C'
        elif self.score >= 60:
            self.grade = 'D'
        else:
            self.grade = 'F'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student} - {self.subject}: {self.grade}"

# Parent and Student Models
class Parent(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='parent_profile')
    children = models.ManyToManyField('Student', related_name='parent_set', blank=True)  # Made optional with `blank=True`

    def __str__(self):
        return self.user.get_full_name()

class Student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    classes = models.ManyToManyField('Class', related_name='students_enrolled')
    parents = models.ManyToManyField(Parent, related_name='student_set', blank=True)  # Made optional with `blank=True`

    def __str__(self):
        return self.user.get_full_name()

# Class and Subject Models
class Class(models.Model):
    name = models.CharField(max_length=50)
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={'role': 'teacher'},
        related_name='classes'
    )
    subjects = models.ManyToManyField('Subject', related_name='class_subjects')
    students = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        limit_choices_to={'role': 'student'},
        related_name='classes_enrolled'
    )

    def __str__(self):
        return self.name

class Subject(models.Model):
    name = models.CharField(max_length=100)
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'teacher'})
    classes = models.ManyToManyField(Class, related_name='subject_classes')

    def __str__(self):
        return self.name
#Create the Attendance Model
class Attendance(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    date = models.DateField(auto_now_add=True)
    status = models.CharField(
        max_length=10,
        choices=[('Present', 'Present'), ('Absent', 'Absent'), ('Late', 'Late')],
        default='Present'
    )
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='attendance_teacher')

    def __str__(self):
        return f"{self.student} - {self.date}: {self.status}"
