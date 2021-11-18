import psycopg2
from  psycopg2 import *
import json


def conn():
    connection_open = psycopg2.connect(user="postgres",
                                       password="Propassomg123",
                                       host="127.0.0.1",
                                       port="5432",
                                       database="postgres")
    return connection_open


def get_users():
    try:
        connection = conn()
        cursor = connection.cursor()
        sql_create_database = 'select * from person'
        cursor.execute(sql_create_database)
        result = cursor.fetchall()
        # for row in result:
        #     print(type(row))
        #     row = dict(row)
        #     print(type(row))
        #     print(row)
        return result
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        connection.close()


get_users()