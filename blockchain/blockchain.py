import pickle

from chain import BlockChain

COIN1 = "$GOLD"
COIN2 = "$SILVER"
FILE1 = "chain1.pickle"
FILE2 = "chain2.pickle"
RATIO = 2

def initialize():
    try:
        with open(FILE1, "rb") as f:
            blockchain1 = pickle.load(f) 
    except:
        blockchain1 = BlockChain(COIN1)
        with open(FILE1, "wb") as f:
            pickle.dump(blockchain1, f)

    try:
        with open(FILE2, "rb") as f:
            blockchain2 = pickle.load(f) 
    except:
        blockchain2 = BlockChain(COIN2)
        with open(FILE2, "wb") as f:
            pickle.dump(blockchain2, f)

    return blockchain1,blockchain2

def transaction(blockchain,sender,recipient,quantity,proof):
    last_block = blockchain.latest_block
    last_proof_no = last_block.proof_no
    proof_no = blockchain.proof_of_work(last_proof_no)

    blockchain.new_data(
        sender=sender,  #it implies that this node has created a new block
        recipient=recipient,  #let's send Quincy some coins!
        quantity=quantity,  #creating a new block (or identifying the proof number) is awarded with 1
        proof = proof
    )

    last_hash = last_block.calculate_hash
    block = blockchain.construct_block(proof_no, last_hash)

    FILE = None
    if blockchain.coin == COIN1:
        FILE = FILE1
    else:
        FILE = FILE2

    with open(FILE, "wb") as f:
        pickle.dump(blockchain, f)

def new_user(blockchain1,blockchain2,id):
    last_block = blockchain1.latest_block
    last_proof_no = last_block.proof_no
    proof_no = blockchain1.proof_of_work(last_proof_no)
    last_hash = last_block.calculate_hash
    block = blockchain1.construct_block(proof_no, last_hash,newuser=True,id=id)
    with open(FILE1, "wb") as f:
        pickle.dump(blockchain1, f)


    last_block = blockchain2.latest_block
    last_proof_no = last_block.proof_no
    proof_no = blockchain2.proof_of_work(last_proof_no)
    last_hash = last_block.calculate_hash
    block = blockchain2.construct_block(proof_no, last_hash,newuser=True,id=id)
    with open(FILE2, "wb") as f:
        pickle.dump(blockchain2, f)


def claim_credit(blockchain,user,quantity,proof):
    transaction(blockchain=blockchain,sender="admin",recipient=user,quantity= quantity,proof= proof)

def convert_coin(blockchain1,blockchain2,user,amount):
    transaction(blockchain=blockchain1,sender=user,recipient="admin",quantity= amount,proof="CONVERSION")
    transaction(blockchain=blockchain2,sender="admin",recipient=user,quantity= amount*RATIO,proof="CONVERSION")


if __name__=="__main__":
    blockchain1,blockchain2 = initialize()
    
    # new_user(blockchain=blockchain,id="A")
    # new_user(blockchain=blockchain,id="B")
    # new_user(blockchain=blockchain,id="C")
    # transaction(blockchain=blockchain,sender="admin",recipient="B",quantity= 10,proof= "ID")
    # transaction(blockchain=blockchain,sender="B",recipient="C",quantity= 3,proof= "ID")
    # transaction(blockchain=blockchain,sender="C",recipient="A",quantity= 1,proof= "ID")

    print("\n\tTRANSACTION SUCCESSFUL\n")
    print("CHAIN 1")
    print(blockchain1.latest_block.users)
    print(blockchain1.latest_block.data)
    print("CHAIN 2")
    print(blockchain1.latest_block.users)
    print(blockchain1.latest_block.data)


