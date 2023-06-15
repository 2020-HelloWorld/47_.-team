from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def addEvent(request):
    if request.method == "POST":
        # if request.user.is_authenticated:
            name = request.POST.get('name')
            details = request.POST.get('details')
            date = request.POST.get('date')
            user = request.user
            print(name,details,date,user)
    
    return HttpResponse("Done")


