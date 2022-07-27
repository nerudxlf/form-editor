from bson import ObjectId

from src.database.abstract.idatabase import IDataBase
from src.rpc.v1.service.aservice import AApiService
from src.rpc.v1.service.iservice import IApiService
from src.schemes.answer_schema import FormSchemaAnswer


class ApiService(IApiService, AApiService):
    @staticmethod
    async def get(form_id: ObjectId, db: IDataBase):
        result = await db['forms'].find_one({"_id": form_id})
        return result

    @staticmethod
    async def add_answer(answer: FormSchemaAnswer, db: IDataBase):
        result = await db['answers'].insert_one(answer.dict())
        return result

    @staticmethod
    async def get_answers(answer_id: ObjectId, db: IDataBase):
        result = await db['answers'].find_one({"_id": answer_id})
        return result
