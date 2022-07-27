from src.database.abstract.idatabase import IDataBase


class IFactory:
    @staticmethod
    def create_mongo(host: str, port: int, db_name: str) -> IDataBase:
        raise NotImplementedError()