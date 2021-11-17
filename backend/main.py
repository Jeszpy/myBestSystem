from fastapi import FastAPI
from sql import select_users

app = FastAPI()

@app.get('/usersList')
def list_of_users():
  try:
    return(select_users())
  except Exception as e:
    print(e)
  finally:
    pass




# uvicorn main:app --reload --port 5000