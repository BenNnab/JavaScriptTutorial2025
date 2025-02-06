from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
#Create Authentication URLs
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
# USER DASHBOARD
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('teacher-dashboard/', views.teacher_dashboard, name='teacher_dashboard'),   
    path('student-dashboard/', views.student_dashboard, name='student_dashboard'),
    path('parent-dashboard/', views.parent_dashboard, name='parent_dashboard'),
        
    #Add URLs for Managing Content
    path('manage-news/', views.manage_news, name='manage_news'),
    path('manage-events/', views.manage_events, name='manage_events'),
    
    #Add URLs for Grade Management
    path('assign-grades/', views.assign_grades, name='assign_grades'),
    path('student-grades/', views.student_grades, name='student_grades'),
    path('parent-grades/', views.parent_view_grades, name='parent_grades'),
#Add URL for the Chart API
    path('student-grade-chart/', views.student_grade_chart, name='student_grade_chart'),
    
    #Add URLs for Attendance Management
    path('mark-attendance/', views.mark_attendance, name='mark_attendance'),
    path('student-attendance/', views.student_attendance, name='student_attendance'),
    path('parent-attendance/', views.parent_attendance, name='parent_attendance'),
    path('student-attendance-chart/', views.student_attendance_chart, name='student_attendance_chart'),
]
