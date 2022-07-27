from fastapi import APIRouter, Depends

from settings_env import DB_HOST, DB_PORT, DB_NAME
from src.database.factory import DBFactory
from src.routers.form.controller.contoller import Controller
from src.routers.form.controller.icontoller import IController
from src.routers.form.service.iservice import IService
from src.routers.form.service.service import Service
from src.schemes.answer_schema import FormSchemaAnswerGet
from src.schemes.form_schema import FormSchemaCreate, FormSchemaGet

router = APIRouter(
    prefix="/api/form",
    tags=["Form"],
    responses={404: {"description": "Not found"}}
)

controller = Controller()
service = Service()
db = DBFactory.create_mongo(host=DB_HOST, port=DB_PORT, db_name=DB_NAME)


@router.post("/")
async def create_form(
        form: FormSchemaCreate,
        current_controller: IController = Depends(controller),
        current_service: IService = Depends(service),
        current_db=Depends(db.connect)):
    """
    Route to create a form
    :param form: Current form schema
    :param current_controller: Current Controller
    :param current_service: Current Service
    :param current_db: Current db
    :return:
    """
    result = await current_controller.create_form(form, current_service, current_db)
    return result


@router.get("/answers", response_model=list[FormSchemaAnswerGet])
async def get_form_answers(
        form_id: str,
        current_controller: IController = Depends(controller),
        current_service: IService = Depends(service),
        current_db=Depends(db.connect)) -> list[FormSchemaGet]:
    """
    Route to receive form responses
    :param form_id: Current form id
    :param current_controller: Current Controller
    :param current_service: Current Service
    :param current_db: Current Db
    :return:
    """
    result = await current_controller.get_form(form_id, current_service, current_db)
    return result
