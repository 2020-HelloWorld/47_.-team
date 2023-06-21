from django.shortcuts import render
from django.http import HttpResponse
from home.views import auth
from events import models
from home.models import club 
from django.http import JsonResponse
import json
from datetime import datetime

# Create your views here.

def addEvent(request):
    message,status = auth(request=request)
    if status==200 and message["group"]=="clubs":
        try:
            req_body = request.body.decode('utf-8')
            req = json.loads(req_body)
            clubId =  club.objects.get(id=message["id"])
            dateStr  = datetime.strptime(req["date"], "%Y-%m-%d").date()
            new = models.event(name=req["name"],club=clubId,date=dateStr,details=req["details"])
            new.save()
        except Exception as e:
            print("ERROR:",e)
            message['message'] = "FAILURE"
            status = 401
    else:
        message['message'] = "FAILURE"
        status = 401
    return JsonResponse(message,status=status)

    
def eventList(request):
    message,status = auth(request=request)
    print(message)
    eventList = list()
    if status==200:
        if message['group']=="clubs":
            events = models.event.objects.filter(club=message['id'])
            eventList = list()
            for event in  events:
                eventList.append({
                    "id" : event.id,
                    "name":event.name,
                    "date":event.date,
                    "details":event.details
                })
            message["events"] = eventList
        elif message['group']=="students":
            events =  models.event.objects.filter(participant__srn__srn=message['id'])
            for event in  events:
                eventList.append({
                    "id" : event.id,
                    "name":event.name,
                    "date":event.date,
                    "details":event.details
                })
            message["events"] = eventList
        else:
            try:
                req_body = request.body.decode('utf-8')
                req = json.loads(req_body)
                events =  models.event.objects.filter(participant__srn__srn=req['club'])
                for event in  events:
                    eventList.append({
                        "id" : event.id,
                        "name":event.name,
                        "date":event.date,
                        "details":event.details
                    })   
            except:
                pass
            message["events"] = eventList
    return JsonResponse(message,status=status)