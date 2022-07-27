import motor.motor_asyncio as _moto_async

from src.database.abstract.idatabase import IDataBase


class Mongo(IDataBase):
    def __init__(self, host: str, port: int, db_name: str):
        self.host = host
        self.port = port
        self.db_name = db_name

    def connect(self):
        client = _moto_async.AsyncIOMotorClient(self.host, self.port)
        return client[self.db_name]
