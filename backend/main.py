from fastapi import FastAPI, Request, Response
import json
from operator import itemgetter
from sql import get_users
# example = dec_to_base(int('0009709371'), 16)
from read_card import dec_to_base as esp_read_card

app = FastAPI()

# uvicorn main:app --reload --host 192.168.0.176
# uvicorn main:app --reload --host 192.168.1.2

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


@app.post("/validate-card")
async def validate_card(request: Request, response: Response):
    cmd = 'close'
    card = await request.json()
    card = str(itemgetter('card')(card))
    time = 3
    print(card)
    if (card == '94273B'): # '5AB140'
        cmd = 'open'
    #res = json.dumps({'cmd': cmd, "time": time}) # , sort_keys=True, indent=4
    # return Response(content=res, media_type="application/json")
    res = f'{cmd},{time}'
    return Response(content=res, media_type="text/plain")
    



@app.get("/get-validate-cards")
def api_get_users():
    return ['1', '2', '94273B', '5AB140', '3']