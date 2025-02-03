from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import User

from .models import News, Event


class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'role', 'password1', 'password2']

class LoginForm(AuthenticationForm):
    pass


class NewsForm(forms.ModelForm):
    class Meta:
        model = News
        fields = ['title', 'content']

class EventForm(forms.ModelForm):
    date = forms.DateField(widget=forms.DateInput(format='%Y-%m-%d', attrs={'type': 'date'}))
    time = forms.TimeField(widget=forms.TimeInput(format='%H:%M', attrs={'type': 'time'}))
    class Meta:
        model = Event
        fields = ['title', 'description', 'date', 'time', 'location']
