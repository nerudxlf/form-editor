import json

import bson.errors
from bson import ObjectId
from fastapi import HTTPException, status

from src.database.abstract.idatabase import IDataBase
from src.rpc.v1.controller.acontroller import AApiController
from src.rpc.v1.controller.icontroller import IApiController
from src.rpc.v1.service.iservice import IApiService
from src.schemes.answer_schema import FormSchemaAnswer, FormSchemaAnswerGet
from src.schemes.form_schema import FormSchemaGet


class ApiController(IApiController, AApiController):
    @staticmethod
    async def get_form(message: dict, service: IApiService, db: IDataBase):
        form_id = message.get('form_id')
        if not form_id:
            return "error", "There is not id in the message"
        try:
            object_id = ObjectId(form_id)
        except bson.errors.InvalidId:
            return "error", f"{form_id} is not a valid ObjectId"
        form = await service.get(object_id, db)
        if not form:
            return "error", "Form not found"
        return "ok", FormSchemaGet(**form).json()

    @staticmethod
    async def send_answer(message: dict, service: IApiService, db: IDataBase):
        answer = message.get('answer')
        if not answer:
            return "error", "There is not id in the message"
        schema_answer = FormSchemaAnswer(**dict(json.loads(answer)))
        form = await service.get(schema_answer.form_id, db)
        if not form:
            return "error", "Form not found"
        result = await service.add_answer(schema_answer, db)
        return "ok", result

    @staticmethod
    async def get_answers(message: dict, service: IApiService, db: IDataBase):
        answer_id = message.get('answer_id')
        if not answer_id:
            return "error", "There is not id in the message"
        try:
            object_id = ObjectId(answer_id)
        except bson.errors.InvalidId:
            return "error", f"{answer_id} is not a valid ObjectId"
        answer = await service.get_answers(ObjectId(object_id), db)
        if not answer:
            return "error", "Answer not found"
        return "ok", FormSchemaAnswerGet(**answer).json()
