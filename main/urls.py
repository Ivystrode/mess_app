# from django.urls import path, include
# from . import views

# app_name = 'main'

# urlpatterns = [
#     # path('', views.index, name="index"),
#     # Object API list/create views
#     path('menuitems', views.MenuItemView.as_view()),
#     path('mealorders', views.MealOrderView.as_view()),
#     path('mealorderitems', views.MealOrderItemView.as_view()),
#     # Detail views
#     path('menuitems/<int:pk>/', views.MenuItemDetailView.as_view()),
#     path('mealorders/<int:pk>/', views.MealOrderDetailView.as_view()),
#     path('mealorderitems/<int:pk>/', views.MealOrderItemDetailView.as_view()),
#     ##################
#     path('create-menu-item', views.CreateMenuItemView.as_view()),
# ]

from .views import *
from rest_framework.routers import DefaultRouter

app_name = 'main'

router = DefaultRouter()

router.register('mealorders', MealOrderList, basename='orders')
router.register('menuitems', MenuItemList, basename='menuitems')
router.register('mealorderitems', MealOrderItemList, basename='mealorderitems')

urlpatterns = router.urls