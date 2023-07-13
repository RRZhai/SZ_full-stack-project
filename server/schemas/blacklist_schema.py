from .__init__ import (
    fields, 
    validate, 
    validates, 
    ValidationError, 
    ma, 
    Blacklist
)

class BlacklistSchema(ma.SQLAlchemySchema):
    class Meta(): 
        model = Blacklist
        load_instance = True
        ordered = True
        fields = ('id', "email", "url")
    
    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "blacklistbyid",
                values=dict(id="<id>")
            ),
            "collection": ma.URLFor("blacklists")
        }
    )