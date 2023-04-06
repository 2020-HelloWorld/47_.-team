from flask import Blueprint, request

from blockchain import transaction,get_balance,new_user,claim_credit,convert_coin
from app import blockchain1,blockchain2

from config import COIN1
from config import SUCCESS,FAILURE

views = Blueprint('views', __name__)

@views.route('/initiate/transaction', methods=['GET', 'POST'])
def transaction():
    if request.method == 'POST': 
        sender = request.form.get('sender')
        recipient = request.form.get('recipient')
        quantity = request.form.get('amount')
        token =  request.form.get('token_type')
        blockchain = None
        if token==COIN1:
            blockchain = blockchain1
        else:
            blockchain = blockchain2

        re = transaction(blockchain=blockchain,sender=sender,recipient=recipient,quantity=quantity)
        if re:
            return SUCCESS
        else:
            return FAILURE

@views.route('/fetch/userbalance', methods=['GET', 'POST'])
def userbalance():
    if request.method == 'POST': 
        username = request.form.get('username')
        re = get_balance(username=username)
    return re

@views.route('/fetch/history', methods=['GET', 'POST'])
def history():
    if request.method == 'POST': 
        name = request.form.get('name')#Gets the note from the HTML 
        #Code 
    return #Something

@views.route('/create/user', methods=['GET', 'POST'])
def create():
    if request.method == 'POST': 
        username = request.form.get('username')
        re = new_user(blockchain1=blockchain1,blockchain2=blockchain2,id=username)
        if re:
            return SUCCESS
        else:
            return FAILURE

@views.route('/claim/credits', methods=['GET', 'POST'])
def claim():
    if request.method == 'POST': 
        recipient = request.form.get('recipient')
        quantity = request.form.get('amount')
        token =  request.form.get('token_type')
        proof = request.form.get('doc_id')
        if token==COIN1:
            blockchain = blockchain1
        else:
            blockchain = blockchain2

        re = claim_credit(blockchain=blockchain,user=recipient,quantity=quantity,proof=proof)
        if re:
            return SUCCESS
        else:
            return FAILURE

@views.route('/convert/credits', methods=['GET', 'POST'])
def convert():
    if request.method == 'POST': 
        username = request.form.get('username')
        quantity = request.form.get('amount')
        re = convert_coin(blockchain1=blockchain1,blockchain2=blockchain2,user=username,amount=quantity)
        if re:
            return SUCCESS
        else:
            return FAILURE
        
@views.route('/', methods=['GET', 'POST'])
def test():
    return "SUCCESS"