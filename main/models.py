from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
import uuid

# Create your models here.

# Each individual piece is a MenuItem that staff can add to a daily meal menu
# Breakfast will be the same every day. This will be reflected in the views/templates.
class MenuItem(models.Model):
    types = (
        ("Breakfast", "Breakfast"),
        ("Lunch", "Lunch"),
        ("Dinner", "Dinner")
    )    
    price = models.FloatField()
    item = models.CharField(max_length=30)
    type = models.CharField(max_length=30, choices=types)
    quantity = models.IntegerField(default=99) 
    
    def __str__(self):
        return self.item
    
# This will be an order "summary" relating to an individual member detailing the total
# price of the order and when it was placed
class MealOrder(models.Model):
    types = (
        ("Breakfast", "Breakfast"),
        ("Lunch", "Lunch"),
        ("Dinner", "Dinner")
    )    
    total_price = models.FloatField()
    member = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=30, choices=types)
    time_placed = models.DateTimeField(default=timezone.localtime(timezone.now()))
    notes = models.CharField(max_length=50)
    acknowledged = models.BooleanField(default=False) # the staff will set this to TRUE when they receive the order

    class Meta:
        ordering = ['-time_placed']
        
    def __str__(self):
        return self.member.username + " " + str(self.id)
        
 
# This model represents each individual item that will be added to a meal
# Therefore the MealOrder model has multiple of these "items" that build up to
# represent the entire order
class MealOrderItem(models.Model):
    item = models.CharField(max_length=30)
    order = models.ForeignKey(MealOrder, on_delete=models.CASCADE, null=True, related_name="items") 
    price = models.FloatField()   
    
    def __str__(self):
        return self.item + ": " + str(self.price)

    