import json

import httpx
from fastapi import HTTPException, status

from src.schemes.answer_schema import FormSchemaAnswer
from src.worker.aworker import AWorker
from src.worker.iworker import IWorker


class Worker(IWorker, AWorker):
    """
    Worker to work with another service via JSON-rpc
    """
    __headers = {'Content-Type': 'application/json;charset=UTF-8'}

    async def get(self, form_id: str):
        async with httpx.AsyncClient() as client:
            payload = {
                "method": "get_form",
                "jsonrpc": "2.0",
                "params": [{"form_id": form_id}],
                "id": 0
            }
            resp = await client.post(self.url, json=payload, headers=self.__headers)
            answer = resp.json()
            if answer.get('result'):
                return json.loads(answer.get('result'))
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    async def send(self, form_schema: FormSchemaAnswer):
        async with httpx.AsyncClient() as client:
            payload = {
                "method": "send_answer",
                "jsonrpc": "2.0",
                "params": [{"answer": form_schema.json()}],
                "id": 0
            }
            resp = await client.post(self.url, json=payload, headers=self.__headers)
            return resp.json()

    async def read(self, answer_id: str):
        async with httpx.AsyncClient() as client:
            payload = {
                "method": "get_form_fields",
                "jsonrpc": "2.0",
                "params": [{"answer_id": answer_id}],
                "id": 0
            }
            resp = await client.post(self.url, json=payload, headers=self.__headers)
            answer = resp.json()
            if answer.get('result'):
                return json.loads(answer.get('result'))
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
