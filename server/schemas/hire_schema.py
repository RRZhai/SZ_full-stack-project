from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    Hire
)

class HireSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = Hire
        load_instance = True
        ordered = True
        fields = ("id", "job_id", "job_seeker_id", "url")
    
    job = fields.Nested("JobSchema", only=("id", "url"))
    user = fields.Nested("UserSchema", only=("id", "email", "url"))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "postlikebyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("postlikes")
        }
    )