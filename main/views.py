from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.contrib import messages
from django.core.mail import send_mail

from rest_framework import generics, status, viewsets
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly, DjangoModelPermissions, IsAuthenticatedOrReadOnly, AllowAny
from .models import *
from .serializers import *

from rest_framework.views import APIView
from rest_framework.response import Response

# permissions classes
class MealOrderUserWritePermission(BasePermission):
    message = 'Editing orders is possible only to the member who placed the order'
    
    def has_object_permission(self, request, view, obj):
        
        if request.method in SAFE_METHODS:
            return True
        
        return obj.member == request.user # this returns false if the member the database says owns the order is not the logged in user
    
#==========Model Viewset Method==========    
# Allows us to use even less code than even the normal viewset method
# Has all the functionality you need - create, retrieve, update, partial update, destroy and list!
# All you need to do is serialize and provide the queryset.
# Permission classes are optional
    
class MenuItemList(viewsets.ModelViewSet):    
    # Technically this is all that is needed:
    permission_classes = [AllowAny]
    serializer_class = MenuItemSerializer
    queryset = MenuItem.objects.all()
    # --------------------------------------

    # This function returns lets us use a different attribute to get the object
    # ie if it was a blog post whose primary key is the title we can use that instead of the id - more SEO friendly
    # Not so important for this app - the default settings let me just use the id which is all I need!
    # Plus mealorders will be differentiated by id anyway
    # if you want to select by slug then do the below but I don't need to I think
    
    # def get_object(self, queryset=None, **kwargs):
    #     item = self.kwargs.get('pk')
    #     return get_object_or_404(MenuItem, slug=item)

    #     #define custom queryset
    #     return MenuItem.objects.all()
    
class MealOrderList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = MealOrderSerializer
    queryset = MealOrder.objects.all()

    # def get_object(self, queryset=None, **kwargs):
    #     item = self.kwargs.get('pk')
    #     return get_object_or_404(MealOrder, slug=item)

    #     #define custom queryset
    #     return MenuItem.objects.all()
    
class MealOrderItemList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = MealOrderItemSerializer
    queryset = MealOrderItem.objects.all()

    # def get_object(self, queryset=None, **kwargs):
    #     item = self.kwargs.get('pk')
    #     return get_object_or_404(MealOrderItem, slug=item)

    #     #define custom queryset
    #     return MealOrderItem.objects.all()


#==========Viewsets method==========
# Can use a number of functions ie create, retrieve, etc, to perform actions on objects

# class MealOrderList(viewsets.ViewSet):
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     queryset = MealOrder.objects.all()
    
#     def list(self, request):
#         serializer_class = MealOrderSerializer(self.queryset, many=True)
#         return Response(serializer_class.data)
    
#     def retrieve(self, request, pk=None):
#         order = get_object_or_404(self.queryset, pk=pk)
#         serializer_class = MealOrderSerializer(order)
#         return Response(serializer_class.data)
# class MenuItemList(viewsets.ViewSet):
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     queryset = MenuItem.objects.all()
    
#     def list(self, request):
#         serializer_class = MenuItemSerializer(self.queryset, many=True)
#         return Response(serializer_class.data)
    
#     def retrieve(self, request, pk=None):
#         order = get_object_or_404(self.queryset, pk=pk)
#         serializer_class = MenuItemSerializer(order)
#         return Response(serializer_class.data)
# class MealOrderItemList(viewsets.ViewSet):
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     queryset = MealOrderItem.objects.all()
    
#     def list(self, request):
#         serializer_class = MealOrderItemSerializer(self.queryset, many=True)
#         return Response(serializer_class.data)
    
#     def retrieve(self, request, pk=None):
#         order = get_object_or_404(self.queryset, pk=pk)
#         serializer_class = MealOrderItemSerializer(order)
#         return Response(serializer_class.data)
    

#==========Basic method==========
# Shows a list of objects
# Can be a number of types ie ListUpdateDestroy, Update, RetrieveUpdate, etc

# class MenuItemView(generics.ListCreateAPIView):
#     """This shows all the menu items, in JSON format"""
    
#     # permission_classes = [IsAdminUser] # restricts this to admin only
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     queryset = MenuItem.objects.all()
#     serializer_class = MenuItemSerializer
    
# class MealOrderView(generics.ListCreateAPIView):
#     """This shows all the menu items, in JSON format"""
    
#     queryset = MealOrder.objects.all()
#     serializer_class = MealOrderSerializer
    
    
# class MealOrderItemView(generics.ListCreateAPIView):
#     """This shows all the menu items, in JSON format"""
    
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     queryset = MealOrderItem.objects.all()
#     serializer_class = MealOrderItemSerializer
    
#==========Basic method - detail views==========
# When the id is appended to the url as defined in urls.py

# class MenuItemDetailView(generics.RetrieveDestroyAPIView):
#     queryset = MenuItem.objects.all()
#     serializer_class = MenuItemSerializer
    
# class MealOrderDetailView(generics.RetrieveUpdateDestroyAPIView, MealOrderUserWritePermission):
#     permission_classes = [MealOrderUserWritePermission]
#     queryset = MealOrder.objects.all()
#     serializer_class = MealOrderSerializer
    
# class MealOrderItemDetailView(generics.RetrieveDestroyAPIView):
#     permission_classes = [DjangoModelPermissions]
#     queryset = MealOrderItem.objects.all()
#     serializer_class = MealOrderItemSerializer
    
# This just creates a new menu item. 
# Seems kind of redundant and excessive with the above being possible...


#==========Create menuitem==========

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
