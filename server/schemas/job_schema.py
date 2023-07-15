from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    Job
)

class JobSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = Job
        load_instance = True
        ordered = True
        fields = ("id", "job_type", "description", 'pay_rate', "address", 'city', 'state', 'employee_id', 'start_time', 'end_time', 'status', 'hires', "url")
    
    reviews = fields.Nested("ReviewSchema", only=("id", "url"))
    user = fields.Nested("UserSchema", only=("id", "email", "url"))
    hires = fields.Nested('HireSchema', only=('id', 'url'))
    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "jobbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("jobs")
        }
    )