from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate,login,logout
from django.http import JsonResponse
import json
from django.contrib.sessions.models import Session
from django.contrib.auth import get_user_model

# Create your views here.
def login_api(request):    
    req_body = request.body.decode('utf-8')
    req = json.loads(req_body)
    username = req["id"]
    password = req["passwd"]
    user = authenticate(request, username=username, password=password)

    if user is not None:
        # Authentication successful
        login(request, user) 
        groups = user.groups.all()         
        response =  JsonResponse({'group': f'{groups[0]}','message':'Login Successful'})   
        return response   
    else:
        # Authentication failed
        return JsonResponse({'message': 'Login failed'}, status=401)


def home(request):
    # sessions = Session.objects.all()
    # for session in sessions:
    #     print(f"Session Key: {session.session_key}")
    #     print(f"Session Data: {session.get_decoded()}")
    #     print(f"Session Expire Date: {session.expire_date}")
    #     print("---------------------------------------")
    req_body = request.body.decode('utf-8')
    print(req_body)
    try:
        req = json.loads(req_body)
        cookie = req["cookies"]
        session_key = cookie.split("=")[1]
        print(session_key)
    except:
        return JsonResponse({'message': 'Not Authenticated'}, status=401)
        
    User = get_user_model()
    try:
        session = Session.objects.get(session_key=session_key)
        user_id = session.get_decoded().get('_auth_user_id')
        if user_id:
            user = User.objects.get(pk=user_id)
            print(user)
            if user.is_authenticated:
                return JsonResponse({'message': 'Authenticated'}, status=200)
            else:
                JsonResponse({'message': 'Not Authenticated'}, status=401)
    except Session.DoesNotExist:
        return JsonResponse({'message': 'Not Authenticated'}, status=401)
        

def logout_api(request):
    return HttpResponse("User logged out")

