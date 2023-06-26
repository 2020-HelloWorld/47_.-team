from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class student(models.Model):
    srn  = models.CharField(max_length=13,primary_key=True)
    name = models.CharField(max_length=25) 
    sem = models.IntegerField()
    
class faculty(models.Model):
    id = models.CharField(max_length=13,primary_key=True)
    name = models.CharField(max_length=25)
    access = models.IntegerField(default=0)
    class Meta:
        verbose_name_plural = 'Faculties'
    
class club(models.Model):
    id = models.CharField(max_length=13,primary_key=True)
    name = models.CharField(max_length=25)
    head = models.ForeignKey(student,on_delete=models.CASCADE)
    faculty = models.ForeignKey(faculty,on_delete=models.CASCADE)
    
class department(models.Model):
    id =  models.CharField(primary_key=True,max_length=15)
    name = models.CharField(max_length=15)
    chairperson = models.ForeignKey(faculty,on_delete=models.DO_NOTHING)

class subject(models.Model):
    id = models.CharField(primary_key=True,max_length=15)
    name = models.CharField(max_length=15)
    department = models.ForeignKey(department,on_delete=models.CASCADE)
