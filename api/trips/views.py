from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import (IsAuthenticated, IsAdminUser, AllowAny) 
from .models import Trip, Step, LinkedItem, Payment, Booking
from .serializers import TripSerializer, StepSerializer, LinkedItemSerializer, PaymentSerializer, BookingSerializer

# Create your views here.

class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer

class LinkedItemViewSet(viewsets.ModelViewSet):
    queryset = LinkedItem.objects.all()
    serializer_class = LinkedItemSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = [AllowAny]

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


    