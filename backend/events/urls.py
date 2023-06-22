from django.urls import path 
from . import views

urlpatterns = [
    path('add/',views.addEvent),
    path('get/',views.eventList),
    path('report/add/',views.addReport),
    path('participant/add/',views.addParticipant),
    path('participant/get/',views.participantList),
]