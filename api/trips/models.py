from email.policy import default
from random import choices
from django.db import models
from django.contrib.auth.models import User

from users.models import Profile


# Create your models here.
class Trip(models.Model):
    class TripStatus(models.TextChoices):
        PLANNED = "planned"
        IN_PROGRESS = "in_progress"
        COMPLETED = "completed"
        CANCELLED = "cancelled"

    name = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=TripStatus.choices, default=TripStatus.PLANNED)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    travellers = models.ManyToManyField(Profile, related_name="trips", null=True, through="trips.Booking")
    details = models.JSONField(default=dict, null=True)

    def __str__(self):
        return self.name


class Step(models.Model):
    class StepTypes(models.TextChoices):
        MORNING = "morning"
        AFTERNOON = "afternnon"
        EVENING = "evening"
        LUNCH = "lunch"
        DINNER = "dinner"
        BREAKFAST = "breakfast"
    trip = models.ForeignKey(Trip, related_name="steps", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    type = models.CharField(choices=StepTypes.choices) 
    is_optionnal = models.BooleanField(default=False)
    date = models.DateField()
    details = models.JSONField(default=dict, null=True)
    def __str__(self):
        return f"{self.name} (Order: {self.type})"


class LinkedItem(models.Model):
    step = models.ForeignKey(Step, related_name="linked_items", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20, default="e-ticket")
    assets = models.FilePathField(path="/path/to/assets")  # Changer le path
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, null=True, blank=True
    )

    def __str__(self):
        return self.name


class Payment(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    method = models.CharField(max_length=20, default="credit_card")
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="payments_history"
    )
    booking = models.ForeignKey('trips.Booking', related_name="payments", on_delete=models.CASCADE, null=True)


    def __str__(self):
        return f"{self.method} - {self.amount}€ on {self.date}"

class Booking(models.Model) : 
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    booking_date=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.trip.name} - {self.user.user}"

    def total_paid(self):
        return sum(p.amount for p in self.payments)

    def remaining_balance(self):
        return self.trip.price - self.total_paid()
    