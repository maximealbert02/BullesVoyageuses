from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import (IsAuthenticated) 
from .models import Trip, Step, LinkedItem, Payment, Booking
from .serializers import TripSerializer, StepSerializer, LinkedItemSerializer, PaymentSerializer, BookingSerializer

# Create your views here.

class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
    permission_classes = [IsAuthenticated]

class LinkedItemViewSet(viewsets.ModelViewSet):
    queryset = LinkedItem.objects.all()
    serializer_class = LinkedItemSerializer
    permission_classes = [IsAuthenticated]

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Booking.objects.all()
        
        return Booking.objects.filter(user=user)
    


    