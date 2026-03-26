from django.forms import ValidationError
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
    
    def validate(self, attrs):
        request_user = self.context['request'].user
        booking = attrs.get('booking')
        if booking.user != request_user:
            raise serializers.ValidationError({"booking" : "Vous ne pouvez pas ajouter de paiement à une réservation qui vous ne est pas associée"})
        #TODO- ajouter un validateur pour ne pas payer plus que le montant restant
        return attrs
    

class TripSerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True, read_only=True)
    payments = PaymentSerializer(many=True, read_only=True)
    class Meta:
        model = Trip
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    trip = TripSerializer(read_only=True)
    class Meta:
        model = Booking
        fields = ['id', 
            'trip', 
            'user', 
            'booking_date', 
            'total_paid', 
            'remaining_balance',
            'get_status']

