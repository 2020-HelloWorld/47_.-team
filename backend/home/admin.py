from django.contrib import admin
from .models import student,faculty,club
# Register your models here.
admin.site.register(student)
admin.site.register(faculty)
admin.site.register(club)