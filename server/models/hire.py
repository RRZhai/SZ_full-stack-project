from .__init__ import db

class Hire(db.Model):
    __tablename__ = 'hires'

    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.String, nullable=False)
    job_seeker_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    #relationship
    job = db.relationship("Job", back_populates="hires")
    job_seeker = db.relationship("User", back_populates="hires")

    def __repr__(self):
        return (
            f"Hire #{self.id}: "
            + f"{self.job.user}"
            + f"{self.job_seeker}"
        )