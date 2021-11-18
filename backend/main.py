from fastapi import FastAPI
from sql import get_users

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/api/users/getUsers")
def api_get_users():
    return get_users()


@app.post("/api/users/addUser")
def api_add_user():
    return {"add": "user"}


@app.post("/api/users/editUser")
def api_edit_user():
    return {"edit": "user"}