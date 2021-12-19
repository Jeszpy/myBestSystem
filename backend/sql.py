import psycopg2
from psycopg2 import *
# import json


# ------------------- CONNECTION ------------------- 
def conn():
    connection_open = psycopg2.connect(user="postgres",
                                       password="Propassomg123",
                                       host="127.0.0.1",
                                       port="5432",
                                       database="postgres")
    return connection_open

# ------------------- CONNECTION -------------------

# ------------------- USER -------------------
def get_users():
    try:
        connection = conn()
        cursor = connection.cursor()
        select_users = 'select * from person'
        cursor.execute(select_users)
        result = cursor.fetchall()
        # print(result)
        return result
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        connection.close()

def validate_new_user_card(card):
    try:
        if card != '':
            connection = conn()
            cursor = connection.cursor()
            select_users = f"select identifiers_card from person where identifiers_card = '{card}'"
            cursor.execute(select_users)
            result = cursor.fetchall()
            if result == []:
                return True
            else: return False
        else: return True
    except Exception as e:
        return e
    finally:
        cursor.close()
        connection.close()

def addUser(lastName, firstName, middleName, subdivision, card):
    try:
        if (validate_new_user_card(card)):
            connection = conn()
            cursor = connection.cursor()
            add_user = f"insert into person (last_name, first_name, middle_name, subdivision, identifiers_card) values ('{lastName}', '{firstName}', '{middleName}', '{subdivision}', '{card}')"
            cursor.execute(add_user)
            connection.commit()
            cursor.close()
            connection.close()
            return True
        else: return False
    except Exception as e:
        print(e)
        return e
        # pass
    finally:
        pass

def delete_user(id):
    try:
        id = int(id)
        connection = conn()
        cursor = connection.cursor()
        delete_user = f"delete from person where id='{id}'"
        cursor.execute(delete_user)
        connection.commit()
    except Exception as e:
        return e
    finally:
        cursor.close()
        connection.close()
# ------------------- USER -------------------

# ------------------- DEVICE -------------------
def get_devices():
    try:
        connection = conn()
        cursor = connection.cursor()
        get_devices = 'select * from devices'
        cursor.execute(get_devices)
        result = cursor.fetchall()
        # print(result)
        return result
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        connection.close()

def add_new_device(name, address, open_time):
    try:
        time = int(open_time)
        connection = conn()
        cursor = connection.cursor()
        add_device = f"insert into devices (name, address, open_time) values ('{name}', '{address}', {time}"
        cursor.execute(add_device)
        connection.commit()
        cursor.close()
        connection.close()
        return True
    except Exception as e:
        return e
    finally:
        cursor.close()
        connection.close()

def update_device(id, name, address, open_time):
    try:
        id = int(id)
        time = int(open_time)
        connection = conn()
        cursor = connection.cursor()
        update_device = f"update devices SET name = '{name}', address = '{address}', open_time = {time} WHERE ID = {id}"
        cursor.execute(update_device)
        connection.commit()
        cursor.close()
        connection.close()
        return True
    except Exception as e:
        return e
    finally:
        cursor.close()
        connection.close()

def delete_device(id):
    try:
        id = int(id)
        connection = conn()
        cursor = connection.cursor()
        delete_device = f"delete from devices where id='{id}'"
        cursor.execute(delete_user)
        connection.commit()
    except Exception as e:
        return e
    finally:
        cursor.close()
        connection.close()
# ------------------- DEVICE -------------------

def check_card_in_DB(card):
    try:
        connection = conn()
        cursor = connection.cursor()
        select_card = f"select * from person where identifiers_card = '{card}'"
        cursor.execute(select_card)
        result = cursor.fetchone()
        if result != None:
            return True
        else: return False
    except Exception as e:
        return e
    finally:
        cursor.close()
        connection.close()

        
# print(check_card_in_DB('18B8D2'))