from fastapi import FastAPI, Depends

from src.schemes.answer_schema import FormSchemaAnswer, FormSchemaAnswerGet
from src.schemes.form_schema import FormSchemaGet
from src.worker.iworker import IWorker
from src.worker.worker import Worker

app = FastAPI()

worker = Worker("http://data-backend:8001/api/v1/")


@app.get('/api/form/', response_model=FormSchemaGet)
async def get_form_by_id(form_id: str, current_worker: IWorker = Depends(worker)):
    """
    Route to get a form by id
    :param form_id: bson Object Id
    :param current_worker:
    :return:
    """
    result = await current_worker.get(form_id)
    return result


@app.post('/api/form/answer/')
async def send_form_data(form_schema: FormSchemaAnswer, current_worker: IWorker = Depends(worker)):
    """
    Route for submitting responses to the form
    :param form_schema: Current form Schema
    :param current_worker: Current Worker
    :return:
    """
    await current_worker.send(form_schema)


@app.get('/api/form/answer/', response_model=FormSchemaAnswerGet)
async def read_form_data(answer_id: str, current_worker: IWorker = Depends(worker)):
    """
    Route to get answers to the form
    :param answer_id: bson Object Id
    :param current_worker: Current Worker
    :return:
    """
    result = await current_worker.read(answer_id)
    return result
