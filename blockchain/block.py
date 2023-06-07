import hashlib
import time

class Block(object):
    def __init__(self, index, proof_number, previous_hash, data, timestamp=None):
        self.index = index
        self.proof_number = proof_number
        self.previous_hash = previous_hash
        self.data = data
        self.timestamp = timestamp or time.time()
    @property
    def compute_hash(self):
        string_block = "{}{}{}{}{}".format(self.index, self.proof_number, self.previous_hash, self.data, self.timestamp)
        return hashlib.sha256(string_block.encode()).hexdigest()
    def __repr__(self):
        return "{} - {} - {} - {} - {}".format(self.index, self.proof_number, self.previous_hash, self.data, self.timestamp)
