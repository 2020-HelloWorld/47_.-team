from django.urls import path 
from . import views

urlpatterns = [
    path('declaration/add/',views.addDeclaration),
    path('request/add/',views.addAttendanceRequest),
]