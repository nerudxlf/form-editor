from bson import ObjectId

from src.database.abstract.idatabase import IDataBase
from src.schemes.answer_schema import FormSchemaAnswer


class IApiService:
    @staticmethod
    async def get(form_id: ObjectId, db: IDataBase):
        raise NotImplementedError()

    @staticmethod
    async def add_answer(answer: FormSchemaAnswer, db: IDataBase):
        raise NotImplementedError()

    @staticmethod
    async def get_answers(answer_id: ObjectId, db: IDataBase):
        raise NotImplementedError()
