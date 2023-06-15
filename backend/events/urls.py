from django.urls import path 
from . import views

urlpatterns = [
    path('addEvent/',views.addEvent),
]