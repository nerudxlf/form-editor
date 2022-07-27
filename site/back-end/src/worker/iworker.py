from src.schemes.answer_schema import FormSchemaAnswer


class IWorker:
    async def get(self, form_id: str):
        raise NotImplementedError()

    async def send(self, form_schema: FormSchemaAnswer):
        raise NotImplementedError()

    async def read(self, answer_id: str):
        raise NotImplementedError()
