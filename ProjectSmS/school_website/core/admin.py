from django.contrib import admin
from .models import News, Event, Subject, Class, User, Parent, Student, Grade

# Registering simple models
admin.site.register(News)
admin.site.register(Event)
admin.site.register(Subject)
admin.site.register(User)

# Parent model admin
@admin.register(Parent)
class ParentAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_children')

    def get_children(self, obj):
        return ", ".join([child.user.get_full_name() for child in obj.children.all()])
    get_children.short_description = 'Children'

# Student model admin
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_classes')

    def get_classes(self, obj):
        return ", ".join([class_.name for class_ in obj.classes.all()])
    get_classes.short_description = 'Classes'

# Class model admin (Fixed: Removed duplicate registration)
@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = ('name', 'teacher')

# Grade model admin
@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'grade')
