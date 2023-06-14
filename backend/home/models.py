from django.db import models

# Create your models here.

class student(models.Model):
    srn  = models.CharField(max_length=13,primary_key=True)
    name = models.CharField(max_length=25) 
    
class faculty(models.Model):
    id = models.CharField(max_length=13,primary_key=True)
    name = models.CharField(max_length=25)
    
    class Meta:
        verbose_name_plural = 'Faculties'
    
class club(models.Model):
    id = models.CharField(max_length=13,primary_key=True)
    name = models.CharField(max_length=25)
    head = models.ForeignKey(student,on_delete=models.CASCADE)
    faculty = models.ForeignKey(faculty,on_delete=models.CASCADE)
    
    