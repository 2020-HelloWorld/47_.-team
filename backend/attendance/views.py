from django.http import JsonResponse
import json
from home.views import auth
from home.models import student,subject,faculty
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


def getDeclaration(request):
    req_body = request.body.decode('utf-8')
    message,status = auth(req_body=req_body)
    req = json.loads(req_body)
    print(message,req)
    declarationList = list()
    if status==200 :
        try:
            declarations = ["hehe"]
            if message["group"]=="faculties":
                facultyId = faculty.objects.get(id=message["id"])
                if facultyId.access >= 1:
                    if facultyId.access == 1:
                        declarations = models.declaration.objects.filter(student__fams__faculty__id=message["id"], signed = 0)
                    elif facultyId.access == 2:
                        declarations = models.declaration.objects.filter(student__department__chairperson__id = facultyId.id, signed = 1)
                    elif facultyId.access == 3:
                        declarations = models.declaration.objects.filter(signed = 2)
                        
            elif message["group"] == "students":
                declarations = models.declaration.objects.filter(student__srn=message["id"])
            
            for itr in declarations:
                declarationList.append({
                    "srn":itr.student.srn,
                    "name":itr.student.name,
                    "doc":itr.doc.url,
                    "id":itr.id,
                    "status" : itr.signed,
                    })
    
            message["declaration"] = declarationList
        except Exception as e:
            print("ERROR:",e)
            message['message'] = "FAILURE"
            status = 404
    else:
        message['message'] = "FAILURE"
        status = 401
    return JsonResponse(message,status=status)

def signDeclaration(request):
    req_body = request.body.decode('utf-8')
    message,status = auth(req_body=req_body)
    req = json.loads(req_body)
    print(message,req)    
    if status==200 and message["group"]=="faculties":
        try:
            declaration = models.declaration.objects.get(id=req["id"])
            if req["result"] == True:
                declaration.signed = declaration.signed + 1
            else:
                declaration.signed = -1
            declaration.save()
        except Exception as e:
            print("ERROR:",e)
            message['message'] = "FAILURE"
            status = 401
    else:
        message['message'] = "FAILURE"
        status = 401
    return JsonResponse(message,status=status)