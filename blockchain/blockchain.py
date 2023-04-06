import pickle

from chain import BlockChain

def initialize():
    try:
        with open("chain.pickle", "rb") as f:
            blockchain = pickle.load(f) 
    except:
        blockchain = BlockChain()

    return blockchain

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

    with open("chain.pickle", "wb") as f:
        pickle.dump(blockchain, f)

def new_user(blockchain,id):
    last_block = blockchain.latest_block
    last_proof_no = last_block.proof_no
    proof_no = blockchain.proof_of_work(last_proof_no)
    last_hash = last_block.calculate_hash
    block = blockchain.construct_block(proof_no, last_hash,newuser=True,id=id)
    with open("chain.pickle", "wb") as f:
        pickle.dump(blockchain, f)



if __name__=="__main__":
    blockchain = initialize()
    
    # new_user(blockchain=blockchain,id="A")
    # new_user(blockchain=blockchain,id="B")
    # new_user(blockchain=blockchain,id="C")
    # transaction(blockchain=blockchain,sender="admin",recipient="B",quantity= 10,proof= "ID")
    # transaction(blockchain=blockchain,sender="B",recipient="C",quantity= 3,proof= "ID")
    # transaction(blockchain=blockchain,sender="C",recipient="A",quantity= 1,proof= "ID")

    print("\n\tTRANSACTION SUCCESSFUL\n")
    print(blockchain.latest_block.users)
    print(blockchain.latest_block.data)


