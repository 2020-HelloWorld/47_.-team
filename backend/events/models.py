from django.db import models

# Create your models here.

class student(models.Model):
    srn  = models.CharField(max_length=13,primary_key=True)
    name = models.CharField(max_length=25) 
    
    
class teacher(models.Model):
    id = models.CharField(max_length=13,primary_key=True)
    name = models.CharField(max_length=25)
    

class club(models.Model):
    id = models.CharField(max_length=13,primary_key=True)
    name = models.CharField(max_length=25)
    head = models.ForeignKey(student,on_delete=models.CASCADE)
    faculty = models.ForeignKey(teacher,on_delete=models.CASCADE)
    
class event(models.Model):
    id = models.CharField(max_length=13,primary_key=True)
    name = models.CharField(max_length=25)
    date = models.DateField()
    club = models.ForeignKey(club,on_delete=models.CASCADE)

class participant(models.Model):
    id = models.CharField(max_length=13,primary_key=True)
    event = models.ForeignKey(event,on_delete=models.CASCADE)

class member(models.Model):
    id = models.CharField(max_length=13,primary_key=True)
    club = models.ForeignKey(club,on_delete=models.CASCADE)  

    
    
    
    