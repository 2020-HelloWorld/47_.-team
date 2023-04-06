class Block:

    def __init__():

    #first block class

        pass
    
    def calculate_hash():
    
    #calculates the cryptographic hash of every block
        
    
class BlockChain:
    
    def __init__(self):
     # constructor method
        pass
    
    def construct_genesis(self):
        # constructs the initial block
        pass

    def construct_block(self, proof_no, prev_hash):
        # constructs a new block and adds it to the chain
        pass

    @staticmethod
    def check_validity():
        # checks whether the blockchain is valid
        pass

    def new_data(self, sender, recipient, quantity):
        # adds a new transaction to the data of the transactions
        pass

    @staticmethod
    def construct_proof_of_work(prev_proof):
        # protects the blockchain from attack
        pass
   
    @property
    def last_block(self):
        # returns the last block in the chain
        return self.chain[-1]
