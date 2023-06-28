from django.urls import path 
from . import views

urlpatterns = [
    path('add/',views.addEvent),
    path('get/',views.eventList),
    path('report/add/',views.addReport),
    path('participant/add/',views.addParticipant),
    path('participant/get/',views.participantList),
    path('organizer/add/',views.addOrganizer),
    path('organizer/get/',views.organizerList),
    path('report/get/',views.getReport),
    path('club/get/',views.getClubList),
    path('approvals/get/',views.eventApprovals),
    path('approval/',views.signEvent),
]