import os
from os.path import join, dirname

from dotenv import load_dotenv

dotenv_path: str = join(dirname(__file__), ".env")
load_dotenv(dotenv_path)

DB_HOST: str = os.environ.get("host")
DB_NAME: str = os.environ.get("name")
DB_PORT: int = int(os.environ.get("port"))
