from django.contrib import admin
from .models import Trip, Step, LinkedItem, Payment

# Register your models here.
admin.site.register(Trip)
admin.site.register(Step)
admin.site.register(LinkedItem)
admin.site.register(Payment)