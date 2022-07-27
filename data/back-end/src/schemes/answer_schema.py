import pydantic as _pydantic
from bson import ObjectId


class TextAreaAnswer(_pydantic.BaseModel):
    question: str
    answer: str


class InputAnswer(_pydantic.BaseModel):
    question: str
    answer: str


class SelectArea(_pydantic.BaseModel):
    question: str
    answer: str


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class FormSchemaAnswer(_pydantic.BaseModel):
    form_id: PyObjectId = _pydantic.Field(default_factory=PyObjectId)
    text_area_answers: list[TextAreaAnswer]
    input_answers: list[InputAnswer]
    select_areas: list[SelectArea]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class FormSchemaAnswerGet(FormSchemaAnswer):
    id: PyObjectId = _pydantic.Field(default_factory=PyObjectId, alias="_id")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
