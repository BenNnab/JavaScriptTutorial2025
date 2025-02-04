from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate, get_user_model
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from .forms import RegisterForm, LoginForm, NewsForm, EventForm
from .models import Subject, Class, News, Event


User = get_user_model()  # Ensure compatibility with custom user models

# User Registration
def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful! Welcome!")
            return redirect('home')
    else:
        form = RegisterForm()
    return render(request, 'core/register.html', {'form': form})

# User Login
def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, f"Welcome back, {user.username}!")
            return redirect('home')
        else:
            messages.error(request, "Invalid username or password.")
    else:
        form = LoginForm()
    return render(request, 'core/login.html', {'form': form})

# User Logout
def user_logout(request):
    logout(request)
    messages.info(request, "You have successfully logged out.")
    return redirect('login')

# Homepage with Latest News & Events
def home(request):
    news = News.objects.order_by('-date_posted')[:5]
    events = Event.objects.order_by('-date')[:5]
    return render(request, 'core/home.html', {'news': news, 'events': events})

# Static Pages
def about(request):
    return render(request, 'core/about.html')

def contact(request):
    return render(request, 'core/contact.html')

# Role-based Access Control
def is_admin(user):
    return user.is_authenticated and user.role == 'admin'

def is_teacher(user):
    return user.is_authenticated and user.role == 'teacher'

# Admin Dashboard
@login_required
@user_passes_test(is_admin)
def admin_dashboard(request):
    return render(request, 'core/admin_dashboard.html')

# Teacher Dashboard
@login_required
@user_passes_test(is_teacher)
def teacher_dashboard(request):
    return render(request, 'core/teacher_dashboard.html')

# # Manage News (Admins & Teachers)
# @login_required
# @user_passes_test(lambda user: user.role in ['admin', 'teacher'])
# def manage_news(request):
#     if request.method == 'POST':
#         form = NewsForm(request.POST)
#         if form.is_valid():
#             news = form.save(commit=False)
#             news.posted_by = request.user
#             news.save()
#             messages.success(request, "News posted successfully!")
#             return redirect('manage_news')
#     else:
#         form = NewsForm()

#     news_list = News.objects.all()
#     return render(request, 'core/manage_news.html', {'form': form, 'news_list': news_list})

# # Manage Events (Admins only)
# @login_required
# @user_passes_test(lambda user: user.role == 'admin')
# def manage_events(request):
#     if request.method == 'POST':
#         form = EventForm(request.POST)
#         if form.is_valid():
#             form.save()
#             messages.success(request, "Event added successfully!")
#             return redirect('manage_events')
#     else:
#         form = EventForm()

#     events_list = Event.objects.all()
#     return render(request, 'core/manage_events.html', {'form': form, 'events_list': events_list})

# Helper functions for role checks
def is_admin(user):
    return user.role == 'admin'

def is_teacher(user):
    return user.role == 'teacher'

def is_student(user):
    return user.role == 'student'

def is_parent(user):
    return user.role == 'parent'

# Manage News (Admins & Teachers)
@login_required
@user_passes_test(lambda user: user.role in ['admin', 'teacher'])
def manage_news(request):
    if request.method == 'POST':
        form = NewsForm(request.POST)
        if form.is_valid():
            news = form.save(commit=False)
            news.posted_by = request.user
            news.save()
            messages.success(request, "News posted successfully!")
            return redirect('manage_news')
    else:
        form = NewsForm()

    news_list = News.objects.all().order_by('-posted_on')  # Show latest news first
    return render(request, 'core/manage_news.html', {'form': form, 'news_list': news_list})

# Manage Events (Admins only)
@login_required
@user_passes_test(is_admin)
def manage_events(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            event = form.save(commit=False)
            event.posted_by = request.user
            event.save()
            messages.success(request, "Event added successfully!")
            return redirect('manage_events')
    else:
        form = EventForm()

    events_list = Event.objects.all().order_by('-event_date')  # Show upcoming events first
    return render(request, 'core/manage_events.html', {'form': form, 'events_list': events_list})

# Admin Dashboard
@login_required
@user_passes_test(is_admin)
def admin_dashboard(request):
    news_count = News.objects.count()
    event_count = Event.objects.count()
    teachers_count = request.user.__class__.objects.filter(role='teacher').count()
    students_count = request.user.__class__.objects.filter(role='student').count()

    return render(request, 'core/admin_dashboard.html', {
        'news_count': news_count,
        'event_count': event_count,
        'teachers_count': teachers_count,
        'students_count': students_count,
    })

# Teacher Dashboard
@login_required
@user_passes_test(is_teacher)
def teacher_dashboard(request):
    subjects = Subject.objects.filter(teacher=request.user)
    return render(request, 'core/teacher_dashboard.html', {'subjects': subjects})

# Student Dashboard
@login_required
@user_passes_test(is_student)
def student_dashboard(request):
    student_classes = Class.objects.filter(students=request.user)
    return render(request, 'core/student_dashboard.html', {'classes': student_classes})

# Parent Dashboard
@login_required
@user_passes_test(is_parent)
def parent_dashboard(request):
    # Fetch the parent's profile
    parent = request.user.parent_profile

    # Fetch the parent's children
    children = parent.children.all()

    # Fetch classes and grades for each child
    children_data = []
    for child in children:
        child_classes = child.classes.all()
        child_grades = child.grades.all()
        children_data.append({
            'child': child,
            'classes': child_classes,
            'grades': child_grades,
        })

    return render(request, 'core/parent_dashboard.html', {'children_data': children_data})

from .models import Grade
from .forms import GradeForm

@login_required
@user_passes_test(lambda user: user.role in ['admin', 'teacher'])
def assign_grades(request):
    if request.method == 'POST':
        form = GradeForm(request.POST)
        if form.is_valid():
            grade = form.save(commit=False)
            grade.teacher = request.user
            grade.save()
            return redirect('assign_grades')
    else:
        form = GradeForm()

    grades = Grade.objects.filter(teacher=request.user)
    return render(request, 'core/assign_grades.html', {'form': form, 'grades': grades})

@login_required
@user_passes_test(lambda user: user.role == 'student')
def student_grades(request):
    grades = Grade.objects.filter(student=request.user)
    return render(request, 'core/student_grades.html', {'grades': grades})

@login_required
@user_passes_test(lambda user: user.role == 'parent')
def parent_view_grades(request):
    children = request.user.children.all()  # Assuming a parent-child relationship exists
    grades = Grade.objects.filter(student__in=children)
    return render(request, 'core/parent_grades.html', {'grades': grades})

