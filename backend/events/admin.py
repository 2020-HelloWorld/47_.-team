from django.contrib import admin
from .models import student,teacher,club,event,participant,member

# Register your models here.
admin.site.register(student)
admin.site.register(teacher)
admin.site.register(club)
admin.site.register(event)
admin.site.register(participant)
admin.site.register(member)
