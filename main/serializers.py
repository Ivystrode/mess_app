# this takes our models and translates them into json
from rest_framework import serializers
from .models import *

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ('id','price','item','type','quantity')
        
class CreateMenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ('item', 'price','type','quantity')



class MealOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealOrder
        fields = ('id','total_price','member','type','time_placed','notes','acknowledged')
        
class CreateMealOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealOrder
        fields = ('total_price','member','type','time_placed','notes','acknowledged')



class MealOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealOrderItem
        fields = ('id','item','price','order')
        
class CreateMealOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealOrderItem
        fields = ('item','price','order')