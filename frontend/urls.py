from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('main_menu', index),
    path('breakfast', index),
    path('lunch', index),
    path('dinner', index),
    path('orders', index),
    path('create', index),
]