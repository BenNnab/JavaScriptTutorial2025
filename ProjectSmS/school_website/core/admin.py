from django.contrib import admin
from .models import News, Event, Subject, Class, User, Grade, Parent, Student

@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ['student', 'subject', 'score', 'grade', 'teacher', 'date_assigned']
    search_fields = ['student__username', 'subject__name', 'teacher__username']
    list_filter = ['grade', 'date_assigned']
    ordering = ['-date_assigned']
    raw_id_fields = ['student', 'subject', 'teacher']

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'date_posted']
    search_fields = ['title', 'content']
    list_filter = ['date_posted']
    ordering = ['-date_posted']

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'time', 'location']
    search_fields = ['title', 'description']
    list_filter = ['date']
    ordering = ['-date']

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'teacher']
    search_fields = ['name', 'teacher__username']
    filter_horizontal = ['classes']

@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = ['name', 'teacher']
    search_fields = ['name', 'teacher__username']
    filter_horizontal = ['subjects', 'students']

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'role']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    list_filter = ['role']

@admin.register(Parent)
class ParentAdmin(admin.ModelAdmin):
    list_display = ['user']
    search_fields = ['user__username']
    filter_horizontal = ['children']

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['user']
    search_fields = ['user__username']
    filter_horizontal = ['classes', 'parents']
