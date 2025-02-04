from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),

    # Dashboard Routes
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('teacher-dashboard/', views.teacher_dashboard, name='teacher_dashboard'),
    
    path('parent-dashboard/', views.parent_dashboard, name='parent_dashboard'),
    path('student-dashboard/', views.student_dashboard, name='student_dashboard'),


 # Dashboard Routes for managing Contents
    path('manage-news/', views.manage_news, name='manage_news'),
    path('manage-events/', views.manage_events, name='manage_events'),
# Grades  URLS Management
    path('assign-grades/', views.assign_grades, name='assign_grades'),
    path('student-grades/', views.student_grades, name='student_grades'),
    path('parent-grades/', views.parent_view_grades, name='parent_grades'),
]
