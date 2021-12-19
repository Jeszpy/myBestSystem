from fastapi import FastAPI, Request, Response
import json
from operator import itemgetter, sub
from sql import get_users, addUser, delete_user, get_devices,add_new_device, update_device, delete_device, check_card_in_DB
from read_card import dec_to_base, dec_to_base_SN
from settings_tab import cpu_and_ram_usage

app = FastAPI()

# uvicorn main:app --reload --host 192.168.0.176
# uvicorn main:app --reload --host 192.168.1.2


# ------------------- USER -------------------
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
async def api_delete_user(request: Request, response: Response):
    id = await request.json()
    try:
        delete_user(id)
        Response(content='success', media_type="text/plain")
    except Exception as e:
        return Response(content=e, media_type="text/plain")
    finally:
        pass

# ------------------- USER -------------------



# ------------------- DEVICE -------------------

@app.get("/api/devices/getDevices")
def api_get_devices():
    return get_devices()

@app.post("/api/devices/addDevice")
async def api_add_device(request: Request, response: Response):
    deviceObj = await request.json()
    # print(userObj)
    name = str(itemgetter('name')(deviceObj))
    address = str(itemgetter('address')(deviceObj))
    open_time = int(itemgetter('openTime')(deviceObj))
    if (add_new_device(name, address, open_time)):
        res = 'ok'
    else: res = 'error'
    return Response(content=res, media_type="text/plain")

@app.post("/api/devices/updateDevice")
async def api_add_device(request: Request, response: Response):
    deviceObj = await request.json()
    id = int(itemgetter('id')(deviceObj))
    name = str(itemgetter('name')(deviceObj))
    address = str(itemgetter('address')(deviceObj))
    open_time = int(itemgetter('openTime')(deviceObj))
    if (update_device(id, name, address, open_time)):
        res = 'ok'
    else: res = 'error'
    return Response(content=res, media_type="text/plain")


@app.post("/api/devices/deleteDevice")
async def api_delete_device(request: Request, response: Response): 
    id = await request.json()
    try:
        delete_device(id)
        Response(content='ok', media_type="text/plain")
    except Exception as e:
        return Response(content=e, media_type="text/plain")
    finally:
        pass

# ------------------- DEVICE -------------------
    


# ------------------- SETTINGS -------------------

@app.get('/api/settings/hardwareStatus')
def hardware_status(request: Request, response: Response):
    return cpu_and_ram_usage()

# ------------------- SETTINGS -------------------



# ------------------- CARDS -------------------

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

@app.get("/get-validate-cards")
def api_get_users():
    return ['1', '2', '94273B', '5AB140', '3']

# ------------------- CARDS -------------------