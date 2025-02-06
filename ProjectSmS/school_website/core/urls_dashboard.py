# core/urls_dashboard.py (Dashboard URLs)
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', views.admin_dashboard, name='admin_dashboard'),
    path('teacher/', views.teacher_dashboard, name='teacher_dashboard'),
    path('student/', views.student_dashboard, name='student_dashboard'),
    path('parent/', views.parent_dashboard, name='parent_dashboard'),
]