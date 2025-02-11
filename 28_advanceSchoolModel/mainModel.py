from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

# User model with multiple roles
class User(AbstractUser):
    USER_TYPE_CHOICES = (
        (1, 'Admin'),
        (2, 'Teacher'),
        (3, 'Student'),
        (4, 'Parent'),
        (5, 'Staff'),
        (6, 'Medic'),
        (7, 'Accountant'),
        (8, 'Facility Manager'),
        (9, 'Transport Manager'),
        (10, 'Cafeteria Manager'),
        (11, 'Hostel Manager'),
        (12, 'Librarian'),
    )
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=1)
    date_of_birth = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-date_joined']

# User Profile model
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)

    def __str__(self):
        return f"Profile of {self.user.get_full_name()}"

# Student Profile
class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    student_id = models.CharField(max_length=20, unique=True)
    grade_level = models.ForeignKey('GradeLevel', on_delete=models.SET_NULL, null=True)
    admission_date = models.DateField()
    parents = models.ManyToManyField('ParentProfile', related_name='children')

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.student_id})"

# Teacher Profile
class TeacherProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile')
    teacher_id = models.CharField(max_length=20, unique=True)
    qualifications = models.TextField()
    subjects = models.ManyToManyField('Subject', blank=True)
    hire_date = models.DateField()
    is_class_teacher = models.BooleanField(default=False)
    assigned_class = models.ForeignKey('Class', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.teacher_id})"

# Parent Profile
class ParentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='parent_profile')
    occupation = models.CharField(max_length=100)
    employer = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.get_full_name()

# Medic Profile for First Aid Management
class MedicProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='medic_profile')
    qualifications = models.TextField()
    hire_date = models.DateField()
    contact_info = models.CharField(max_length=100)

    def __str__(self):
        return self.user.get_full_name()

# Facility Manager Profile for Asset Management
class FacilityManagerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='facility_manager_profile')
    asset_management_experience = models.TextField()

    def __str__(self):
        return self.user.get_full_name()
class Asset(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    purchase_date = models.DateField()
    condition = models.CharField(max_length=50, choices=[
        ('New', 'New'),
        ('Good', 'Good'),
        ('Needs Repair', 'Needs Repair'),
        ('Damaged', 'Damaged')
    ])
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    recorded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 8})

    def __str__(self):
        return f"{self.name} ({self.condition})"

# Transport Manager Profile for Logistics
class TransportManagerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='transport_manager_profile')
    vehicle_management_experience = models.TextField()

    def __str__(self):
        return self.user.get_full_name()

# Cafeteria Manager Profile for Feeding Management
class CafeteriaManagerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cafeteria_manager_profile')
    meal_planning_experience = models.TextField()

    def __str__(self):
        return self.user.get_full_name()

# Hostel Manager Profile for Boarding Facilities
class HostelManagerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='hostel_manager_profile')
    hostel_management_experience = models.TextField()

    def __str__(self):
        return self.user.get_full_name()

# Librarian Profile for Library Management
class LibrarianProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='librarian_profile')
    library_management_experience = models.TextField()

    def __str__(self):
        return self.user.get_full_name()

### ACADEMIC RELATED MODELS

# School model
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

# Academic Year model
class AcademicYear(models.Model):
    name = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    current_year = models.BooleanField(default=False)

    def __str__(self):
        return self.name

# Grade Level model
class GradeLevel(models.Model):
    name = models.CharField(max_length=50)  # e.g., Grade 9, Class 10
    code = models.CharField(max_length=10)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

# Subject model
class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    grade_level = models.ForeignKey(GradeLevel, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.code})"

# Class Model (Grade, Teacher, Students)
class Class(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20)
    grade_level = models.ForeignKey(GradeLevel, on_delete=models.CASCADE)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.SET_NULL, null=True)
    students = models.ManyToManyField(StudentProfile)

    def __str__(self):
        return f"{self.name} - {self.academic_year}"

# Attendance model
class Attendance(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent')])
    remarks = models.TextField(blank=True)

    class Meta:
        unique_together = ('student', 'date')

# Exam model
class Exam(models.Model):
    name = models.CharField(max_length=100)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    date = models.DateField()
    max_marks = models.DecimalField(max_digits=5, decimal_places=2)
    weightage = models.DecimalField(max_digits=3, decimal_places=2)

    def __str__(self):
        return f"{self.name} - {self.subject}"

# Grade model
class Grade(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    marks_obtained = models.DecimalField(max_digits=5, decimal_places=2)
    comments = models.TextField(blank=True)

    class Meta:
        unique_together = ('student', 'exam')

# Notice model
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

# Timetable model
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

## LIBRARY RELATED MODELS

# Library Book model
class LibraryBook(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    isbn = models.CharField(max_length=20)
    publication_date = models.DateField()
    quantity = models.PositiveIntegerField()
    available = models.PositiveIntegerField()

# Book Loan model
class BookLoan(models.Model):
    book = models.ForeignKey(LibraryBook, on_delete=models.CASCADE)
    borrower = models.ForeignKey(User, on_delete=models.CASCADE)
    loan_date = models.DateField()
    return_date = models.DateField()
    returned = models.BooleanField(default=False)

## CAFETERIA RELATED MODELS

class Meal(models.Model):
    name = models.CharField(max_length=100)
    meal_type = models.CharField(max_length=50, choices=[
        ('Breakfast', 'Breakfast'),
        ('Lunch', 'Lunch'),
        ('Dinner', 'Dinner'),
    ])
    date = models.DateField()
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)  # Cost per meal
    prepared_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 10})  # Cafeteria Manager

    def __str__(self):
        return f"{self.meal_type} - {self.name} ({self.date})"

class MealConsumption(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type__in': [3, 5]})  # Students & Staff
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=20, choices=[
        ('Prepaid', 'Prepaid'),
        ('Billed', 'Billed'),
        ('Free', 'Free'),
    ])
    consumed_at = models.DateTimeField(auto_now_add=True)
    recorded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 10})  # Cafeteria Manager

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.meal.name} ({self.status})"

class MealPayment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type__in': [3, 5]})  # Students & Staff
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ('Paid', 'Paid'),
        ('Pending', 'Pending'),
        ('Overdue', 'Overdue'),
    ])
    processed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 7})  # Accountant

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.total_amount} ({self.status})"

## HOSTEL RELATED MODELS

class Hostel(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField()
    manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 11})

    def __str__(self):
        return self.name

class HostelRoom(models.Model):
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE)
    room_number = models.CharField(max_length=10)
    capacity = models.PositiveIntegerField()
    current_occupancy = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.hostel.name} - Room {self.room_number}"

class Boarder(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    hostel_room = models.ForeignKey(HostelRoom, on_delete=models.CASCADE)
    check_in_date = models.DateField()
    check_out_date = models.DateField(null=True, blank=True)
    managed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 11})

    def __str__(self):
        return f"{self.student} - {self.hostel_room}"

## TRANSPORT RELATED MODELS

class TransportRoute(models.Model):
    name = models.CharField(max_length=100)
    start_location = models.CharField(max_length=100)
    end_location = models.CharField(max_length=100)
    assigned_driver = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 9})

    def __str__(self):
        return f"{self.name}: {self.start_location} - {self.end_location}"

class TransportRecord(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    route = models.ForeignKey(TransportRoute, on_delete=models.CASCADE)
    pickup_time = models.TimeField()
    dropoff_time = models.TimeField()
    recorded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 9})

    def __str__(self):
        return f"{self.student} - {self.route}"

class TransportVehicle(models.Model):
    vehicle_number = models.CharField(max_length=20, unique=True)  # License plate
    driver_name = models.CharField(max_length=100)
    driver_contact = models.CharField(max_length=20)
    capacity = models.IntegerField()
    route = models.ForeignKey('TransportRoute', on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('Active', 'Active'), ('Under Maintenance', 'Under Maintenance')])

    def __str__(self):
        return f"{self.vehicle_number} - {self.driver_name}"

class TransportEnrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transport_enrollment')
    route = models.ForeignKey(TransportRoute, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(TransportVehicle, on_delete=models.SET_NULL, null=True)
    pickup_location = models.CharField(max_length=150)
    drop_off_location = models.CharField(max_length=150)
    fee = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=[('Active', 'Active'), ('Cancelled', 'Cancelled')])

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.route.route_name}"

class TransportPayment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    transaction_id = models.CharField(max_length=100, unique=True)
    payment_method = models.CharField(max_length=50, choices=[
        ('Cash', 'Cash'),
        ('Bank Transfer', 'Bank Transfer'),
        ('Credit Card', 'Credit Card'),
        ('Mobile Money', 'Mobile Money'),
    ])
    status = models.CharField(max_length=20, choices=[('Paid', 'Paid'), ('Pending', 'Pending')])
    processed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 7})  # Accountant

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.amount_paid} ({self.status})"

class TransportRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reason = models.TextField()
    pickup_location = models.CharField(max_length=150)
    drop_off_location = models.CharField(max_length=150)
    requested_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=[
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected')
    ])
    processed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 8})  # Transport Manager

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.status})"
    
    
## MEDICS RELATED MODELS STARTS HERE!

class Medic(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='medic')
    qualifications = models.TextField()
    hire_date = models.DateField()
    contact_info = models.CharField(max_length=100)

    def __str__(self):
        return self.user.get_full_name()

class MedicalRecord(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='medical_records')
    recorded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 6})
    visit_date = models.DateTimeField(auto_now_add=True)
    symptoms = models.TextField()
    diagnosis = models.TextField()
    prescribed_medication = models.TextField(blank=True)
    remarks = models.TextField(blank=True)

    def __str__(self):
        return f"{self.student} - {self.visit_date}"

class MedicalIncident(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Related to both student and staff
    medic = models.ForeignKey(Medic, on_delete=models.CASCADE, related_name='incidents')  # Medic responsible
    incident_type = models.CharField(max_length=100)  # e.g., Injury, Illness, First Aid
    description = models.TextField()
    date = models.DateField(auto_now_add=True)
    treatment_given = models.TextField(blank=True)
    follow_up_required = models.BooleanField(default=False)
    incident_status = models.CharField(max_length=20, choices=[('Ongoing', 'Ongoing'), ('Resolved', 'Resolved')], default='Ongoing')
    reported_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='incident_reported_by')

    def __str__(self):
        return f"Incident on {self.date} - {self.user.get_full_name()}"

class FirstAidSupply(models.Model):
    name = models.CharField(max_length=100)  # e.g., Bandage, Painkillers
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(0)])
    last_updated = models.DateField(auto_now=True)
    supplier = models.CharField(max_length=100, blank=True)
    medic = models.ForeignKey(Medic, on_delete=models.CASCADE, related_name='first_aid_supplies')

    def __str__(self):
        return f"{self.name} - {self.quantity} available"

class MedicalHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='medical_history')  # Could be student or staff
    conditions = models.TextField(blank=True)  # Past medical conditions
    allergies = models.TextField(blank=True)  # Allergies
    medications = models.TextField(blank=True)  # Ongoing medications
    last_checkup = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Medical History - {self.user.get_full_name()}"
    
## FINANCIAL RELATED MODEL STARTS HERE!

class FeeStructure(models.Model):
    fee_type = models.CharField(max_length=50, choices=[
        ('Tuition', 'Tuition'),
        ('Hostel', 'Hostel'),
        ('Transport', 'Transport'),
        ('Meals', 'Meals'),
        ('Other', 'Other'),
    ])
    grade_level = models.ForeignKey(GradeLevel, on_delete=models.CASCADE, null=True, blank=True)  # Only for tuition fees
    description = models.TextField(blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    frequency = models.CharField(max_length=20, choices=[
        ('ONE_TIME', 'One Time'),
        ('MONTHLY', 'Monthly'),
        ('TERM', 'Per Term'),
        ('ANNUAL', 'Annual'),
    ])
    due_date = models.DateField()

    def __str__(self):
        return f"{self.fee_type} - {self.amount} ({self.frequency})"

class StudentPayment(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='payments')
    parent = models.ForeignKey(ParentProfile, on_delete=models.CASCADE, related_name='payments')  # Parent making the payment
    fee_structure = models.ForeignKey(FeeStructure, on_delete=models.CASCADE, related_name='payments')
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    payment_date = models.DateTimeField(auto_now_add=True)
    transaction_id = models.CharField(max_length=100, unique=True)
    payment_method = models.CharField(max_length=50, choices=[
        ('Cash', 'Cash'),
        ('Bank Transfer', 'Bank Transfer'),
        ('Credit Card', 'Credit Card'),
        ('Mobile Money', 'Mobile Money'),
    ])
    status = models.CharField(max_length=20, choices=[
        ('Paid', 'Paid'),
        ('Pending', 'Pending'),
        ('Overdue', 'Overdue'),
    ])
    processed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 7})  # Accountant

    def __str__(self):
        return f"{self.student.user.get_full_name()} - {self.fee_structure.fee_type} - {self.amount_paid} ({self.status})"

class Invoice(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='invoices')
    amount_due = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(0)])
    balance_due = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    invoice_date = models.DateField(auto_now_add=True)
    due_date = models.DateField()
    payment_status = models.CharField(max_length=20, choices=[('Paid', 'Paid'), ('Unpaid', 'Unpaid'), ('Partial', 'Partial')])
    transaction_id = models.CharField(max_length=100, unique=True)
    processed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 7})  # Accountant

    def __str__(self):
        return f"Invoice #{self.id} - {self.student.user.get_full_name()}"

    def save(self, *args, **kwargs):
        self.balance_due = self.amount_due - self.amount_paid
        self.payment_status = 'Paid' if self.balance_due == 0 else 'Unpaid' if self.balance_due == self.amount_due else 'Partial'
        super().save(*args, **kwargs)

# Payment model
class Payment(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    fee_structure = models.ForeignKey(FeeStructure, on_delete=models.CASCADE)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField()
    transaction_id = models.CharField(max_length=100)
    payment_method = models.CharField(max_length=50)

class Budget(models.Model):
    year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    category = models.CharField(max_length=100)  # e.g., Tuition, Transport, Cafeteria
    planned_amount = models.DecimalField(max_digits=10, decimal_places=2)
    actual_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    variance = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # Difference between planned & actual

    def save(self, *args, **kwargs):
        self.variance = self.planned_amount - self.actual_amount
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.category} Budget for {self.year.name}"

# models.py
class SalaryStructure(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="salary_structure")
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    housing_allowance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    transport_allowance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    other_allowance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # Deductions like taxes

    def total_salary(self):
        return self.basic_salary + self.housing_allowance + self.transport_allowance + self.other_allowance - self.deductions

    def __str__(self):
        return f"Salary Structure for {self.user.get_full_name()}"

# models.py
class Payslip(models.Model):
    staff = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 5})  # Accountant can generate for staff only
    salary_structure = models.ForeignKey(SalaryStructure, on_delete=models.CASCADE)
    month = models.DateField()  # Will store the specific month of the payslip
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    housing_allowance = models.DecimalField(max_digits=10, decimal_places=2)
    transport_allowance = models.DecimalField(max_digits=10, decimal_places=2)
    other_allowance = models.DecimalField(max_digits=10, decimal_places=2)
    deductions = models.DecimalField(max_digits=10, decimal_places=2)
    total_salary = models.DecimalField(max_digits=10, decimal_places=2)

    def generate_payslip(self):
        self.basic_salary = self.salary_structure.basic_salary
        self.housing_allowance = self.salary_structure.housing_allowance
        self.transport_allowance = self.salary_structure.transport_allowance
        self.other_allowance = self.salary_structure.other_allowance
        self.deductions = self.salary_structure.deductions
        self.total_salary = self.salary_structure.total_salary()
        self.save()

    def __str__(self):
        return f"Payslip for {self.staff.get_full_name()} - {self.month.strftime('%B, %Y')}"

#3 FINANCIAL RELATED MODEL ENDS HERE! 


# Key Features Covered:
# 1. *User Management*: Custom user model with different roles (Admin, Teacher, Student, Parent, Staff)
# 2. *Academic Structure*: Grade levels, subjects, classes, and academic years
# 3. *Student Information*: Admissions, parent relationships, attendance tracking
# 4. *Grade Management*: Exams, marks recording, and grading system
# 5. *Financial Management*: Fee structures and payment tracking
# 6. *Timetable Management*: Class schedules and room allocations
# 7. *Library Management*: Book inventory and loan tracking
# 8. *Communication*: Notice board system

# Recommended Next Steps:
# 1. Create Django admin interfaces for each model
# 2. Implement views and URLs for frontend interaction
# 3. Add permission classes for different user types
# 4. Create REST API endpoints using Django REST Framework
# 5. Implement reporting features (attendance reports, grade reports)
# 6. Add search functionality for student/teacher records
# 7. Implement bulk import/export features
# 8. Add data validation and business logic
# 9. Set up automated notifications and reminders
# 10. Implement user authentication and authorization flows