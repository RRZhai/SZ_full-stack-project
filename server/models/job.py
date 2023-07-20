from .__init__ import db

class Job(db.Model):
    __tablename__="jobs"
    
    id = db.Column(db.Integer, primary_key=True)
    job_type = db.Column(db.String, nullable=False)
    description = db.Column(db.Integer, nullable=False)
    pay_rate = db.Column(db.Float, nullable=False)
    address = db.Column(db.String,nullable=False)
    city = db.Column(db.String,nullable=False)
    state = db.Column(db.String,nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    hire_id = db.Column(db.Integer, db.ForeignKey("hires.id"))
    date = db.Column(db.String, nullable=False)
    start_time = db.Column(db.String)
    end_time = db.Column(db.String)
    status = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    user = db.relationship("User", back_populates="jobs")
    reviews = db.relationship("Review", back_populates="job")
    hires = db.relationship("Hire", back_populates="job")


    def __repr__(self):
        return (
            f"Job #{self.id}: "
            + f"{self.job_type}"
            + f"{self.description}"
            + f"{self.pay_rate}"
            + f"{self.employee_id}"
            + f"{self.hires}"
            + f"{self.status}"
        )