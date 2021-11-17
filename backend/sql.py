import psycopg2
from config import host, user, password, db_name


  
def get_users_list():
  try:
    connection = psycopg2.connect(
    host = host,
    user = user,
    password = password,
    database = db_name
  )
    with connection.cursor() as cursor:
      cursor.execute(
        """select * from employees"""
      )
      print(f'{cursor.fetchall()}')

  except Exception as e:
    print(e)
  finally:
    if connection:
      connection.close()
      print('connection close')

def add_new_user():
  try:
    connection = psycopg2.connect(
    host = host,
    user = user,
    password = password,
    database = db_name
    )
    with connection.cursor() as cursor:
      cursor.execute("INSERT INTO employees VALUES (%s, %s, %s, %s, %s, %s, %s)", (1, 100500, 'Глеб', 'Лукашонок', 'Дмитриевич', 1, 1))
      cursor.fetchall()
  except Exception as e:
    print(e)
  finally:
    if connection:
      connection.close()
      print('connection close')

# get_users_list()
add_new_user()