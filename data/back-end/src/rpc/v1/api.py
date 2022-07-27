from fastapi import Request, Response, APIRouter, Depends
from jsonrpcserver import Result, Success, method, async_dispatch, Error

from settings_env import DB_HOST, DB_PORT, DB_NAME
from src.database.abstract.idatabase import IDataBase
from src.database.factory import DBFactory
from src.rpc.v1.controller.controller import ApiController
from src.rpc.v1.controller.icontroller import IApiController
from src.rpc.v1.service.iservice import IApiService
from src.rpc.v1.service.service import ApiService

router = APIRouter(
    prefix="/api/v1",
    tags=["v1"],
    responses={404: {"description": "Not found"}}
)

db = DBFactory.create_mongo(host=DB_HOST, port=DB_PORT, db_name=DB_NAME)
controller = ApiController()
service = ApiService()


@method
async def get_form(context: tuple[IApiController, IApiService, IDataBase], message: dict) -> Result:
    """
    Method to get a form
    :param context: services from dispatch method
    :param message: Data form another service
    :return:
    """
    current_controller, current_service, current_db = context
    message, result = await current_controller.get_form(message, current_service, current_db)
    if message == "ok":
        return Success(result)
    return Error(-32600, result)


@method
async def send_answer(context: tuple[IApiController, IApiService, IDataBase], message: dict) -> Result:
    """
    Method for submitting responses to the form
    :param context: services from dispatch method
    :param message: Data form another service
    :return:
    """
    current_controller, current_service, current_db = context
    message, result = await current_controller.send_answer(message, current_service, current_db)
    if message == "ok":
        return Success(200)
    return Error(-32600, result)


@method
async def get_form_fields(context: tuple[IApiController, IApiService, IDataBase], message: dict) -> Result:
    """
    Method to get answers to the form
    :param context: services from dispatch method
    :param message: Data form another service
    :return:
    """
    current_controller, current_service, current_db = context
    message, result = await current_controller.get_answers(message, current_service, current_db)
    if message == "ok":
        return Success(result)
    return Error(-32600, result)


@router.post('/')
async def get_data(
        request: Request,
        current_controller: IApiController = Depends(controller),
        current_service: IApiService = Depends(service),
        current_db: IDataBase = Depends(db.connect)):
    """
    Route to work with JSON-rpc
    :param request: request from another service
    :param current_controller: Current Controller
    :param current_service: Current Service
    :param current_db: Current db
    :return:
    """
    request = await request.body()
    dispatch = await async_dispatch(request, context=(current_controller, current_service, current_db))
    return Response(dispatch)
