from fastapi import FastAPI

from src.routers.form import form
from src.rpc.v1 import api

app = FastAPI()

app.include_router(form.router)
app.include_router(api.router)
