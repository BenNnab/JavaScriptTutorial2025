# core/urls_manage.py (Content Management URLs)
from django.urls import path
from . import views

urlpatterns = [
    path('news/', views.manage_news, name='manage_news'),
    path('events/', views.manage_events, name='manage_events'),
    path('subjects/', views.subject_list, name='subject_list'),
    path('subjects/add/', views.add_subject, name='add_subject'),
    path('subjects/edit/<int:subject_id>/', views.edit_subject, name='edit_subject'),
    path('subjects/delete/<int:subject_id>/', views.delete_subject, name='delete_subject'),
]