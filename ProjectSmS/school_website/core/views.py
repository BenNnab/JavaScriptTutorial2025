
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from .forms import RegisterForm, LoginForm, NewsForm, EventForm, GradeForm, AttendanceForm
from django.contrib.auth.decorators import login_required, user_passes_test
from .models import News, Event, Subject, Class, Grade, AbstractUser, User, Parent, Student, Attendance
from django.contrib import messages
from django.db import IntegrityError
from django.http import JsonResponse








def home(request):
    news = News.objects.order_by('-date_posted')[:5]
    events = Event.objects.order_by('-date')[:5]
    return render(request, 'core/home.html', {'news': news, 'events': events})    

def about(request):
    return render(request, 'core/about.html')

def contact(request):
    return render(request, 'core/contact.html')

#Create Authentication Views

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = RegisterForm()
    return render(request, 'core/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')
    else:
        form = LoginForm()
    return render(request, 'core/login.html', {'form': form})

def user_logout(request):
    logout(request)
    return redirect('login')

#Role-Based Access Control (RBAC)

def is_admin(user):
    return user.role == 'admin'

def is_teacher(user):
    return user.role == 'teacher'

def is_student(user):
    return user.role == 'student'

def is_parent(user):
    return user.role == 'parent'
#Create Views for Managing Content
@login_required
@user_passes_test(is_admin)
def admin_dashboard(request):
    news_count = News.objects.count()
    event_count = Event.objects.count()
    teachers_count = request.user.__class__.objects.filter(role='teacher').count()
    students_count = request.user.__class__.objects.filter(role='student').count()
    parents_count = request.user.__class__.objects.filter(role='parent').count()
    
    return render(request, 'core/admin_dashboard.html', {
        'news_count': news_count,
        'event_count': event_count,
        'teachers_count': teachers_count,
        'students_count': students_count,
        'parents_count': parents_count,
    })
    

@login_required
@user_passes_test(is_teacher)
def teacher_dashboard(request):
    subjects = Subject.objects.filter(teacher=request.user)
    return render(request, 'core/teacher_dashboard.html', {'subjects': subjects}) 

@login_required
@user_passes_test(is_student)
def student_dashboard(request):
    student_classes = Class.objects.filter(students=request.user)
    return render(request, 'core/student_dashboard.html', {'classes': student_classes})

@login_required
@user_passes_test(is_parent)
def parent_dashboard(request):
    return render(request, 'core/parent_dashboard.html') 
   

@login_required
@user_passes_test(lambda user: user.role == 'admin' or user.role == 'teacher')
def manage_news(request):
    if request.method == 'POST':
        form = NewsForm(request.POST)
        if form.is_valid():
            news = form.save(commit=False)
            news.posted_by = request.user
            news.save()
            return redirect('manage_news')
    else:
        form = NewsForm()

    news_list = News.objects.all()
    return render(request, 'core/manage_news.html', {'form': form, 'news_list': news_list})

@login_required
@user_passes_test(lambda user: user.role == 'admin')
def manage_events(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('manage_events')
    else:
        form = EventForm()

    events_list = Event.objects.all()
    return render(request, 'core/manage_events.html', {'form': form, 'events_list': events_list})

@login_required
@user_passes_test(lambda user: user.role in ['admin', 'teacher'])
def assign_grades(request):
    if request.method == 'POST':
        form = GradeForm(request.POST)
        if form.is_valid():
            grade = form.save(commit=False)
            
            # Ensure the teacher is set correctly
            grade.teacher = request.user
            
            try:
                grade.save()
                messages.success(request, "Grade assigned successfully!")
            except IntegrityError:
                messages.error(request, "An error occurred while assigning the grade. Please check the student and subject details.")
            
            return redirect('assign_grades')
    else:
        form = GradeForm()

    if request.user.role == 'admin':
        grades = Grade.objects.all()  # Admins can see all grades
    else:
        grades = Grade.objects.filter(teacher=request.user)

    students = User.objects.filter(role='student')  # Filter by student role

    return render(request, 'core/assign_grades.html', {'form': form, 'grades': grades, 'students': students})


@login_required
@user_passes_test(lambda user: user.role == 'student')
def student_grades(request):
    grades = Grade.objects.filter(student=request.user)
    return render(request, 'core/student_grades.html', {'grades': grades})

# @login_required
# @user_passes_test(lambda user: user.role == 'parent')
# def parent_view_grades(request):
#     children = request.user.children.all()  # Assuming a parent-child relationship exists
#     grades = Grade.objects.filter(student__in=children)
#     return render(request, 'core/parent_grades.html', {'grades': grades})



@login_required
@user_passes_test(is_parent)
def parent_view_grades(request):
    parent = request.user.parent_profile  # Access the parent profile
    children = parent.children.all()  # Get the children associated with the parent

    # Get grades for all children
    grades = Grade.objects.filter(student__student_profile__in=children)

    return render(request, 'core/parent_grades.html', {'grades': grades, 'children': children})



@login_required
@user_passes_test(lambda user: user.role == 'student')
def student_grade_chart(request):
    grades = Grade.objects.filter(student=request.user)
    subjects = [grade.subject.name for grade in grades]
    scores = [grade.score for grade in grades]
    
    return JsonResponse({'subjects': subjects, 'scores': scores})

#Create Views for Attendance Management
@login_required
@user_passes_test(lambda user: user.role == 'teacher')
def mark_attendance(request):
    if request.method == 'POST':
        form = AttendanceForm(request.POST)
        if form.is_valid():
            attendance = form.save(commit=False)
            attendance.teacher = request.user
            attendance.save()
            return redirect('mark_attendance')
    else:
        form = AttendanceForm()

    attendance_records = Attendance.objects.filter(teacher=request.user)
    return render(request, 'core/mark_attendance.html', {'form': form, 'attendance_records': attendance_records})

@login_required
@user_passes_test(lambda user: user.role == 'student')
def student_attendance(request):
    attendance_records = Attendance.objects.filter(student=request.user)
    return render(request, 'core/student_attendance.html', {'attendance_records': attendance_records})

@login_required
@user_passes_test(lambda user: user.role == 'parent')
def parent_attendance(request):
    children = request.user.children.all()  # Assuming a parent-child relationship exists
    attendance_records = Attendance.objects.filter(student__in=children)
    return render(request, 'core/parent_attendance.html', {'attendance_records': attendance_records})

@login_required
@user_passes_test(lambda user: user.role == 'student')
def student_attendance_chart(request):
    attendance_records = Attendance.objects.filter(student=request.user)
    present_count = attendance_records.filter(status='Present').count()
    absent_count = attendance_records.filter(status='Absent').count()
    late_count = attendance_records.filter(status='Late').count()

    return JsonResponse({
        'labels': ['Present', 'Absent', 'Late'],
        'data': [present_count, absent_count, late_count]
    })
