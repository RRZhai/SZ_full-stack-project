from .__init__ import db

class Blacklist(db.Model):
    __tablename__ = 'blacklists'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    #relationship


    def __repr__(self):
        return f"Blacklist #{self.id}: {self.email}"
    
