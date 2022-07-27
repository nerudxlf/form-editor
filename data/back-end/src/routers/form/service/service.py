from bson import ObjectId
from datetime import date

from src.routers.form.service.aservice import AService
from src.routers.form.service.iservice import IService
from src.schemes.form_schema import FormSchemaCreate


class Service(IService, AService):
    """
    The service interacts with the database
    """

    @staticmethod
    async def create(form: FormSchemaCreate, db):
        current_date = date.today().strftime("%d/%m/%Y")
        form_data = form.dict()
        form_data["date"] = current_date
        await db['forms'].insert_one(form_data)

    @staticmethod
    async def get(form_id: ObjectId, db):
        result = []
        cursor = db['answers']
        async for document in cursor.find({"form_id": form_id}):
            result.append(document)
        return result
