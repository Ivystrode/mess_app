from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.contrib import messages
from django.core.mail import send_mail

from rest_framework import generics, status
from .models import *
from .serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response


# So these views allow us to view the objects in JSON format
# AND to create them (POST)
class MenuItemView(generics.ListCreateAPIView):
    """This shows all the menu items, in JSON format"""
    
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    
class MealOrderView(generics.ListCreateAPIView):
    """This shows all the menu items, in JSON format"""
    
    queryset = MealOrder.objects.all()
    serializer_class = MealOrderSerializer
    
class MealOrderItemView(generics.ListCreateAPIView):
    """This shows all the menu items, in JSON format"""
    
    queryset = MealOrderItem.objects.all()
    serializer_class = MealOrderItemSerializer
    
# These views are the detail views allowing us to view a single object
# when the id is passed into the url bar (see urls.py)
class MenuItemDetailView(generics.RetrieveDestroyAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
class MealOrderDetailView(generics.RetrieveDestroyAPIView):
    queryset = MealOrder.objects.all()
    serializer_class = MealOrderSerializer
class MealOrderItemDetailView(generics.RetrieveDestroyAPIView):
    queryset = MealOrderItem.objects.all()
    serializer_class = MealOrderItemSerializer
    
# This just creates a new menu item. 
# Seems kind of redundant and excessive with the above being possible...
class CreateMenuItemView(APIView):
    """This creates a new menu item. 
    If it already exists, it updates it based on the new data entered.
    The serializer puts it in JSON form."""
    # API view allows us to override default methods ie GET, POST, PUT...
    
    serializer_class = CreateMenuItemSerializer
    
    
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            item = serializer.data.get('item')
            price = serializer.data.get('price')
            type = serializer.data.get('type')
            quantity = serializer.data.get('quantity')
            queryset = MenuItem.objects.filter(item=item)
            
            if queryset.exists():
                menuitem = queryset[0]
                # menuitem.item = item
                menuitem.price = price
                menuitem.type = type
                menuitem.quantity = quantity
                menuitem.save(update_fields=['price','type','quantity'])
                return Response(MenuItemSerializer(menuitem).data, status=status.HTTP_200_OK)
                
            else:
                menuitem = MenuItem(item=item, price=price, type=type, quantity=quantity)
                menuitem.save()
                
            return Response(MenuItemSerializer(menuitem).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request':'Invalid data!'}, status=status.HTTP_400_BAD_REQUEST)
# Create your views here.
def index(request):
    print("home page")
    return render(request, 'main/index.html')
