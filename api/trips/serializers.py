from rest_framework import serializers
from .models import Booking, Trip, Step, LinkedItem, Payment

    
class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = '__all__'
    
class LinkedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkedItem
        fields = '__all__'
    
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class TripSerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True, read_only=True)
    payments = PaymentSerializer(many=True, read_only=True)
    class Meta:
        model = Trip
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model : Booking
        fields = '__all__'