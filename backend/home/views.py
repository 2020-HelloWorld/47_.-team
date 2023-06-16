from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate,login,logout
from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt

# Create your views here.

# @csrf_exempt
def login_api(request):
    print(request.is_secure())
    if request.method == "GET":
        return JsonResponse({'message': 'LOGIN PAGE'})
    username = request.POST.get('id')
    password = request.POST.get('passwd')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        # Authentication successful
        login(request, user) 
        groups = user.groups.all()         
        response =  JsonResponse({'group': f'{groups[0]}','message':'Login Successful'})   
        # response.set_cookie("hehe","hello",samesite='None',secure=True)  
        # print(response.cookies)
        return response   
    else:
        # Authentication failed
        return JsonResponse({'message': 'Login failed'}, status=401)


def home(request):
    if request.user.is_authenticated:
        # User is logged in
        return HttpResponse("You are logged in.")
    else:
        # User is not logged in
        return HttpResponse("Please log in.")

def logout_api(request):
    logout(request)
    return HttpResponse("User logged out")


# def cookie_test(request):
#     res = HttpResponse()
#     res.set_cookie('data','Cookie-Information')
#     cookie_data = request.COOKIES.get('data')
#     if cookie_data==None:
#         cookie_data = "Reload to get Cookie Data"
#     res.content = f'{cookie_data}'
#     return res

