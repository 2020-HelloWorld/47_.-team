from django.db import models
from home.models import student,faculty

# Create your models here.
class project(models.Model):
    id = models.AutoField(primary_key=True)
    guide = models.ForeignKey(faculty,null=True,on_delete=models.DO_NOTHING)
    title = models.CharField(max_length=25)
    details = models.CharField(max_length=500)

class studentProject(models.Model):
    project = models.ForeignKey(project,null=False,on_delete=models.DO_NOTHING)
    student = models.ForeignKey(student,null=False,on_delete=models.DO_NOTHING)
    
    class Meta:
        unique_together = (('project','student'),)