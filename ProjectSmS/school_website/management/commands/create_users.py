from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Create users'

    def handle(self, *args, **kwargs):
        # Create a student
        student_user = User.objects.create_user(username='student3', email='student3@schoolwebapp.com', password='password')
        student_user.role = 'student'
        student_user.save()
        self.stdout.write(self.style.SUCCESS('Successfully created student user'))

        # Create a parent
        parent_user = User.objects.create_user(username='parent3', email='parent3@schoolwebapp.com', password='password')
        parent_user.role = 'parent'
        parent_user.save()
        self.stdout.write(self.style.SUCCESS('Successfully created parent user'))
