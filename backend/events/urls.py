from django.urls import path 
from . import views

urlpatterns = [
    path('add/',views.addEvent),
    path('get/',views.eventList),
]