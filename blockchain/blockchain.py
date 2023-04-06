import hashlib
import time

class Block:

    def __init__(self, index, proof_no, prev_hash, data, timestamp=None):
        self.index = index
        self.proof_no = proof_no
        self.prev_hash = prev_hash
        self.data = data
        self.timestamp = timestamp or time.time()

    @property
    def calculate_hash(self):
        block_of_string = "{}{}{}{}{}".format(self.index, self.proof_no,
                                              self.prev_hash, self.data,
                                              self.timestamp)

        return hashlib.sha256(block_of_string.encode()).hexdigest()

    def __repr__(self):
        return "{} - {} - {} - {} - {}".format(self.index, self.proof_no,
                                               self.prev_hash, self.data,
                                               self.timestamp)

        
    
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
