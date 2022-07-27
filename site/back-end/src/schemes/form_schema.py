import pydantic as _pydantic
from bson import ObjectId
from pydantic import Field


class TextArea(_pydantic.BaseModel):
    question: str
    description: str | None


class Input(_pydantic.BaseModel):
    question: str
    description: str | None


class Select(_pydantic.BaseModel):
    text: str


class SelectArea(_pydantic.BaseModel):
    question: str
    description: str | None
    selects: list[Select]


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


class FormSchemaGet(_pydantic.BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    description: str | None
    date: str
    text_areas: list[TextArea] | None
    inputs: list[Input] | None
    select_areas: list[SelectArea] | None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

