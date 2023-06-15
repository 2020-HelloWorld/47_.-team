from django.urls import path 
from . import views

urlpatterns = [
    path('login',views.login_api),
    path('logout',views.logout_api),
    path('cookie',views.cookie_test),
    path('',views.home),
]