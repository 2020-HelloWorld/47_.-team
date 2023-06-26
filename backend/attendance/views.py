from django.http import JsonResponse
import json
from home.views import auth
from home.models import student,subject
from attendance import models
from datetime import datetime
from dateutil.parser import parse

# Create your views here.
def addDeclaration(request):
    req_body = request.POST.get('request')
    file = request.FILES.get('file')
    message,status = auth(req_body=req_body)
    req = json.loads(req_body)
    if status==200:
        try:
            srn = student.objects.get(srn=message["id"])
            new = models.declaration(
                student = srn,
                signed = 0,
                doc = file
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
        
        
def addAttendanceRequest(request):
    req_body = request.body.decode('utf-8')
    message,status = auth(req_body=req_body)
    req = json.loads(req_body)
    print(req,message)
    if status==200:
        try:
            srn = student.objects.get(srn=message["id"])
            newForm = models.attendaceRequest(
                student = srn,
                signed = 0,
            )
            newForm.save()
            for iter in req["attendancerequest"]:
                new = models.subjectAttendaceRequest(
                    subject = subject.objects.get(id=iter["subject"]),
                    form = newForm,
                    date = datetime.strptime(iter["date"], "%Y-%m-%d").date(),
                    start = parse(iter["start"]).time(),
                    end = parse(iter["end"]).time(),
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
