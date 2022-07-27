from src.database.factory.ifactory import IFactory
from src.database.abstract.idatabase import IDataBase
from src.database.mongo import Mongo


class DBFactory(IFactory):
    @staticmethod
    def create_mongo(host: str, port: int, db_name: str) -> IDataBase:
        return Mongo(host, port, db_name)
