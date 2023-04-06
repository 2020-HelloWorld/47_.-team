from flask import Blueprint, render_template, request, flash
import os

views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST': 
        name = request.form.get('name')#Gets the note from the HTML 
        #Code 
    return #Something