from django.urls import path 
from . import views
from django.urls import re_path

urlpatterns = [
    path('login',views.login_api),
    path('logout',views.logout_api),
    path('auth',views.auth_api),
    re_path(r'^proxy/(.*)$', views.proxy_handler),
]