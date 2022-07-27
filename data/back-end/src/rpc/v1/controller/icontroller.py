from src.database.abstract.idatabase import IDataBase
from src.rpc.v1.service.iservice import IApiService


class IApiController:
    @staticmethod
    async def get_form(message: dict, service: IApiService, db: IDataBase):
        raise NotImplementedError()

    @staticmethod
    async def send_answer(message: dict, service: IApiService, db: IDataBase):
        raise NotImplementedError()

    @staticmethod
    async def get_answers(message: dict, service: IApiService, db: IDataBase):
        raise NotImplementedError()
