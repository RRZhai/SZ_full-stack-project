from .__init__ import db

class Review(db.Model):
    __tablename__="reviews"
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    job_id = db.Column(db.Integer,db.ForeignKey("jobs.id"))
    reviewer_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    job = db.relationship("Job", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")

    def __repr__(self):
        return (
            f"Review #{self.id}: "
            + f"{self.content}"
            + f"{self.rating}"
            + f"{self.reviewer_id}"
        )