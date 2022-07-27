from src.routers.form.service.iservice import IService
from src.schemes.form_schema import FormSchemaCreate, FormSchemaGet


class IController:
    """
    Interface for the controller
    """

    @staticmethod
    async def create_form(form: FormSchemaCreate, service: IService, db):
        raise NotImplementedError()

    @staticmethod
    async def get_form(form_id: str, service: IService, db) -> list[FormSchemaGet]:
        raise NotImplementedError()
