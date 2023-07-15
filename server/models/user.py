from .__init__ import db
from config import bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    name = db.Column(db.String)
    bio = db.Column(db.String)
    profile_pic_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    #relationship
    jobs = db.relationship("Job", back_populates="user", cascade="all, delete-orphan")
    hires = db.relationship("Hire", back_populates="user", cascade="all, delete-orphan")
    reviews = db.relationship("Review", back_populates="user", cascade="all, delete-orphan")
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, 
                                            password.encode('utf-8'))
    
    def __repr__(self):
        return f"User #{self.id}: {self.email}"