#python
# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        (1, 'Admin'),
        (2, 'Teacher'),
        (3, 'Student'),
        (4, 'Parent'),
        (5, 'Staff'),
    )
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=1)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)

    class Meta:
        ordering = ['-date_joined']

class School(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    website = models.URLField(blank=True)
    logo = models.ImageField(upload_to='school/')
    established_date = models.DateField()

    def __str__(self):
        return self.name

class AcademicYear(models.Model):
    name = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    current_year = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class GradeLevel(models.Model):
    name = models.CharField(max_length=50)  # e.g., Grade 9, Class 10
    code = models.CharField(max_length=10)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    grade_level = models.ForeignKey(GradeLevel, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.code})"

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    student_id = models.CharField(max_length=20, unique=True)
    grade_level = models.ForeignKey(GradeLevel, on_delete=models.SET_NULL, null=True)
    admission_date = models.DateField()
    parents = models.ManyToManyField('ParentProfile', related_name='children')

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.student_id})"

class TeacherProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile')
    teacher_id = models.CharField(max_length=20, unique=True)
    qualifications = models.TextField()
    subjects = models.ManyToManyField(Subject)
    hire_date = models.DateField()

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.teacher_id})"

class ParentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='parent_profile')
    occupation = models.CharField(max_length=100)
    employer = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.get_full_name()

class Class(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20)
    grade_level = models.ForeignKey(GradeLevel, on_delete=models.CASCADE)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.SET_NULL, null=True)
    students = models.ManyToManyField(StudentProfile)

    def __str__(self):
        return f"{self.name} - {self.academic_year}"

class Attendance(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent')])
    remarks = models.TextField(blank=True)

    class Meta:
        unique_together = ('student', 'date')

class Exam(models.Model):
    name = models.CharField(max_length=100)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    date = models.DateField()
    max_marks = models.DecimalField(max_digits=5, decimal_places=2)
    weightage = models.DecimalField(max_digits=3, decimal_places=2)  # e.g., 0.25 for 25%

    def __str__(self):
        return f"{self.name} - {self.subject}"

class Grade(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    marks_obtained = models.DecimalField(max_digits=5, decimal_places=2)
    comments = models.TextField(blank=True)

    class Meta:
        unique_together = ('student', 'exam')

class FeeStructure(models.Model):
    grade_level = models.ForeignKey(GradeLevel, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    frequency = models.CharField(max_length=20, choices=[
        ('ONE_TIME', 'One Time'),
        ('MONTHLY', 'Monthly'),
        ('TERM', 'Per Term'),
        ('ANNUAL', 'Annual')
    ])

    def __str__(self):
        return f"{self.grade_level} - {self.name}"

class Payment(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    fee_structure = models.ForeignKey(FeeStructure, on_delete=models.CASCADE)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField()
    transaction_id = models.CharField(max_length=100)
    payment_method = models.CharField(max_length=50)

class Timetable(models.Model):
    class_schedule = models.ForeignKey(Class, on_delete=models.CASCADE)
    day_of_week = models.CharField(max_length=3, choices=[
        ('MON', 'Monday'),
        ('TUE', 'Tuesday'),
        ('WED', 'Wednesday'),
        ('THU', 'Thursday'),
        ('FRI', 'Friday'),
        ('SAT', 'Saturday'),
        ('SUN', 'Sunday')
    ])
    start_time = models.TimeField()
    end_time = models.TimeField()
    room = models.CharField(max_length=50)

class LibraryBook(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    isbn = models.CharField(max_length=20)
    publication_date = models.DateField()
    quantity = models.PositiveIntegerField()
    available = models.PositiveIntegerField()

class BookLoan(models.Model):
    book = models.ForeignKey(LibraryBook, on_delete=models.CASCADE)
    borrower = models.ForeignKey(User, on_delete=models.CASCADE)
    loan_date = models.DateField()
    return_date = models.DateField()
    returned = models.BooleanField(default=False)

class Notice(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    audience = models.CharField(max_length=3, choices=[
        ('ALL', 'Everyone'),
        ('STU', 'Students'),
        ('TEA', 'Teachers'),
        ('PAR', 'Parents')
    ])
    publish_date = models.DateField(auto_now_add=True)
    expiry_date = models.DateField()



# This model provides a solid foundation for a comprehensive school management system. You can extend it further based on specific institutional requirements.