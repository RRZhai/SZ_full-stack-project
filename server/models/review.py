from .__init__ import db

class Review(db.Model):
    __tablename__="reviews"
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Integer, nullable=False)
    rate = db.Column(db.Integer, nullable=False)
    job_id = db.Column(db.Integer,db.ForeignKey("jobs.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", back_populates="reviews")
    job = db.relationship("Job", back_populates="reviews")

    def __repr__(self):
        return (
            f"Review #{self.id}: "
            + f"{self.content}"
            + f"{self.rate}"
        )