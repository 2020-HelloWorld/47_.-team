from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate,login,logout

# Create your views here.
from django.http import JsonResponse

def login_api(request):
    if request.method == "GET":
        return JsonResponse({'message': 'LOGIN PAGE'})
    username = request.POST.get('id')
    password = request.POST.get('passwd')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        # Authentication successful
        login(request, user) 
        return JsonResponse({'message': 'Login successful'})
    else:
        # Authentication failed
        return JsonResponse({'message': 'Login failed'}, status=401)

def home(request):
    if request.user.is_authenticated:
        return HttpResponse("Home Page")
    else:
        return HttpResponse("Login Page")

def logout_api(request):
    logout(request)
    return HttpResponse("User logged out")