from fastapi import FastAPI, Request, Response
import json
from operator import itemgetter, sub
from sql import get_users, addUser, delete_user, check_card_in_DB
from read_card import dec_to_base, dec_to_base_SN
from settings_tab import cpu_and_ram_usage

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
async def api_add_user(request: Request, response: Response):
    userObj = await request.json()
    # print(userObj)
    lastName = str(itemgetter('lastName')(userObj)) or ''
    firstName = str(itemgetter('firstName')(userObj))
    middleName = str(itemgetter('middleName')(userObj)) or ''
    subdivision = str(itemgetter('subdivision')(userObj)) or ''
    sn = itemgetter('sn')(userObj)
    if (sn):
        s = str(itemgetter('series')(userObj)) or ''
        n = str(itemgetter('number')(userObj)) or ''
        card = dec_to_base_SN(s, n)
    else: 
        card = str(itemgetter('card')(userObj)) or ''
    if (addUser(lastName, firstName, middleName, subdivision, card)):
        res = 'ok'
    else: res = 'error'
    return Response(content=res, media_type="text/plain")


@app.post("/api/users/editUser")
def api_edit_user():
    return {"edit": "user"}


@app.post("/api/users/deleteUser")
async def api_edit_user(request: Request, response: Response):
    id = await request.json()
    try:
        delete_user(id)
        Response(content='success', media_type="text/plain")
    except Exception as e:
        return Response(content=e, media_type="text/plain")
    finally:
        pass


@app.post("/validate-card")
async def validate_card(request: Request, response: Response):
    cmd = 'close'
    card = await request.json()
    card = str(itemgetter('card')(card))
    time = 3
    if (check_card_in_DB(card)): # '5AB140'
        cmd = 'open'
        print('есть')
    #res = json.dumps({'cmd': cmd, "time": time}) # , sort_keys=True, indent=4
    # return Response(content=res, media_type="application/json")
    res = f'{cmd},{time}'
    return Response(content=res, media_type="text/plain")
    

@app.get('/api/settings/hardwareStatus')
def hardware_status(request: Request, response: Response):
    return cpu_and_ram_usage()



@app.get("/get-validate-cards")
def api_get_users():
    return ['1', '2', '94273B', '5AB140', '3']