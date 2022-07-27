from bson import ObjectId

from src.schemes.form_schema import FormSchemaCreate


class IService:
    """
    Interface for the controller
    """

    @staticmethod
    async def create(form: FormSchemaCreate, db):
        raise NotImplementedError()

    @staticmethod
    async def get(form_id: ObjectId, db):
        raise NotImplementedError()
