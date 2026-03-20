from django.db import models
from django.contrib.auth.models import User

from users.models import Profile


# Create your models here.
class Trip(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, default="planned")
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class Step(models.Model):
    trip = models.ForeignKey(Trip, related_name="steps", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    type = models.CharField(max_length=20, default="night")
    is_optionnal = models.BooleanField(default=False)
    date = models.DateField()

    def __str__(self):
        return f"{self.name} (Order: {self.type})"


class LinkedItem(models.Model):
    step = models.ForeignKey(
        Step, related_name="linked_items", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20, default="e-ticket")
    assets = models.FilePathField(path="/path/to/assets")  # Changer le path
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, null=True, blank=True
    )

    def __str__(self):
        return self.name


class Payment(models.Model):
    trip = models.ForeignKey(Trip, related_name="payments", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    method = models.CharField(max_length=20, default="credit_card")
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="payments_history"
    )

    def __str__(self):
        return f"{self.method} - {self.amount}€ on {self.date}"
