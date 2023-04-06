import os
import pickle

from chain import BlockChain

def initialize():
    blockchain = BlockChain()

    if 'chain.pickle' in os.listdir():
        with open("chain.pickle", "rb") as f:
            blockchain = pickle.load(f) 

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


if __name__=="__main__":
    blockchain = initialize()
    transaction(blockchain=blockchain,sender="A",recipient="B",quantity= 2,proof= "ID")
    print("\n\tTRANSACTION SUCCESSFUL\n")
    print(blockchain.latest_block.users)
    print(blockchain.latest_block.data)


