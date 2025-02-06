from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import User,News, Event, Grade, Attendance


#Create Forms for Registration & Login
class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'role', 'password1', 'password2']

class LoginForm(AuthenticationForm):
    pass
#Create Forms for CMS Management

class NewsForm(forms.ModelForm):
    class Meta:
        model = News
        fields = ['title', 'content']

class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = ['title', 'description', 'date', 'time', 'location']
#Create a Form for Teachers to Assign Grades
class GradeForm(forms.ModelForm):
    class Meta:
        model = Grade
        fields = ['student', 'subject', 'score']
#Create a Form for Teachers to Mark Attendance
class AttendanceForm(forms.ModelForm):
    class Meta:
        model = Attendance
        fields = ['student', 'status']
