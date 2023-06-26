from django.shortcuts import render
from django.http import HttpResponse
from home.views import auth
from events import models
from home.models import club,student
from django.http import JsonResponse
import json
from datetime import datetime
# Create your views here.

def addEvent(request):
    req_body = request.body.decode('utf-8')
    message,status = auth(req_body=req_body)
    req = json.loads(req_body)
    print(message,req)
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
    req_body = request.body.decode('utf-8')
    message,status = auth(req_body=req_body)
    req = json.loads(req_body)
    print(message,req)
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
            events = models.event.objects.filter(participants__srn__srn=message["id"])
            for event in  events:
                eventList.append({
                    "id" : event.id,
                    "name":event.name,
                    "date":event.date,
                    "details":event.details
                })
            message["events"] = eventList
        elif message['group']=="faculties":
            try:
                req_body = request.body.decode('utf-8')
                req = json.loads(req_body)
                clubId = club.objects.get(id = req['club'])
                events =  models.event.objects.filter(club=clubId)
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
        else:
            message['message'] = "FAILURE"
            status = 401
    return JsonResponse(message,status=status)

def addReport(request):
    req_body = request.POST.get('request')
    file = request.FILES.get('file')
    print(file)
    message,status = auth(req_body=req_body)

    if status==200:
        if message['group']=="clubs":
            try:
                req = json.loads(req_body)
                eventId = models.event.objects.get(id=req["eventid"])
                new = models.report(
                    details = req["details"],
                    img = file,
                    event = eventId
                )
                new.save()
            except Exception as e:
                print("ERROR:",e)
                message['message'] = "FAILURE"
                status = 401
        else:
            message['message'] = "FAILURE"
            status = 401
        return JsonResponse(message,status=status)
    
def addParticipant(request):
    req_body = request.body.decode('utf-8')
    message,status = auth(req_body=req_body)
    print(message,status)
    if status==200:
        if message['group']=="clubs":
            try:
                req = json.loads(req_body)
                eventId = models.event.objects.get(id=req["eventid"])
                srn = student.objects.get(srn=req["srn"])
                new = models.participant(
                    srn = srn,
                    event = eventId,
                )
                new.save()
            except Exception as e:
                print("ERROR:",e)
                message['message'] = "FAILURE"
                status = 401
        else:
            message['message'] = "FAILURE"
            status = 401
    return JsonResponse(message,status=status)

def participantList(request):
    req_body = request.body.decode('utf-8')
    message,status = auth(req_body=req_body)
    if status==200:
        if message['group']=="clubs":
            req = json.loads(req_body)
            print(req)
            eventId = models.event.objects.get(id=req["eventid"])
            participants = models.participant.objects.filter(event=eventId)
            print(participants)
            participant_list = list()
            for participant in  participants:
                participant_list.append({
                    "srn" : participant.srn.srn,
                    "name":participant.srn.name,
                })
        message["participants"] = participant_list
    return JsonResponse(message,status=status)

def addOrganizer(request):
    req_body = request.body.decode('utf-8')
    message,status = auth(req_body=req_body)
    print(message,status)
    if status==200:
        if message['group']=="clubs":
            try:
                req = json.loads(req_body)
                eventId = models.event.objects.get(id=req["eventid"])
                srn = student.objects.get(srn=req["srn"])
                new = models.organizer(
                    srn = srn,
                    event = eventId,
                    role = req["role"],
                )
                new.save()
            except Exception as e:
                print("ERROR:",e)
                message['message'] = "FAILURE"
                status = 401
        else:
            message['message'] = "FAILURE"
            status = 401
    return JsonResponse(message,status=status)

def organizerList(request):
    req_body = request.body.decode('utf-8')
    message,status = auth(req_body=req_body)
    if status==200:
        if message['group']=="clubs":
            req = json.loads(req_body)
            print(req)
            eventId = models.event.objects.get(id=req["eventid"])
            organizers = models.organizer.objects.filter(event=eventId)
            print(organizers)
            organizer_list = list()
            for organizer in  organizers:
                organizer_list.append({
                    "srn" : organizer.srn.srn,
                    "name":organizer.srn.name,
                    "role" : organizer.role,
                })
        message["organizers"] = organizer_list
    return JsonResponse(message,status=status)

def getReport(request):
    req_body = request.body.decode('utf-8')
    message,status = auth(req_body=req_body)
    if status==200:
        try:
            req_object = request.body.decode('utf-8')
            req = json.loads(req_object)
            report_obj = models.report.objects.filter(event__id=req["eventid"]).first()
            print(report_obj)
            image_url = report_obj.img.url
            message["image"] = image_url
            message["report"] = report_obj.details
        except Exception as e:
                print("ERROR:",e)
                message['message'] = "FAILURE"
                status = 404
    else:
        message['message'] = "FAILURE"
        status = 401
    return JsonResponse(message,status=status)   

def getClubList(request):
    req_body = request.body.decode('utf-8')
    message,status = auth(req_body=req_body)
    req = json.loads(req_body)
    print(message,req)
    if status==200:
        try:
            clubList = list()
            clubs = club.objects.all()
            for Itr in clubs:
                clubList.append({
                    "name" : Itr.name,
                    "id" : Itr.id,
                    "headSRN" : Itr.head.srn,
                    "headName": Itr.head.name,
                    "facultyId" : Itr.faculty.id,
                    "facultyName":Itr.faculty.name,
                })
            message["clubs"] = clubList
        except Exception as e:
                print("ERROR:",e)
                message['message'] = "FAILURE"
                status = 404
    else:
        message['message'] = "FAILURE"
        status = 401
    return JsonResponse(message,status=status)  