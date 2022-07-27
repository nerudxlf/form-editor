import bson.errors
from bson import ObjectId
from fastapi import HTTPException, status

from src.routers.form.controller.acontroller import AController
from src.routers.form.controller.icontoller import IController
from src.routers.form.service.iservice import IService
from src.schemes.form_schema import FormSchemaCreate, FormSchemaGet


class Controller(IController, AController):
    """
    Controller handles data and errors
    """
    @staticmethod
    async def create_form(form: FormSchemaCreate, service: IService, db):
        result = await service.create(form, db)
        return result

    @staticmethod
    async def get_form(form_id: str, service: IService, db) -> list[FormSchemaGet]:
        try:
            object_id = ObjectId(form_id)
        except bson.errors.InvalidId:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"{form_id} is not a valid ObjectId")
        result = await service.get(object_id, db)
        return result
