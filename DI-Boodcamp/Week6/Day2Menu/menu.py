import psycopg2

class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def save(self):
        try:
            conn = psycopg2.connect(
                dbname="Menu_Item",   # Замените на ваше имя базы данных
                user="postgres",          # Замените на ваше имя пользователя
                password="bob", # Замените на ваш пароль
                host="localhost",         # Хост базы данных
                port="5432"               # Порт базы данных
            )
            cursor = conn.cursor()

            query = """
            INSERT INTO Menu_Items (item_name, item_price)
            VALUES (%s, %s);
            """
            cursor.execute(query, (self.name, self.price))
            conn.commit()

            print(f"Item '{self.name}' added successfully!")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()
            conn.close()


    def delete(self):
        try:
            conn = psycopg2.connect(
                dbname="Menu_Item",
                user="postgres",
                password="bob",
                host="localhost",
                port="5432"
            )
            cursor = conn.cursor()

            query = "DELETE FROM Menu_Items WHERE item_name = %s;"
            cursor.execute(query, (self.name,))
            conn.commit()

            print(f"Item '{self.name}' deleted successfully!")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()
            conn.close()

    def update(self, new_name, new_price):
        try:

            conn = psycopg2.connect(
                dbname="restaurant_db",
                user="postgres",
                password="bob",
                host="localhost",
                port="5432"
            )
            cursor = conn.cursor()

            query = """
            UPDATE Menu_Items
            SET item_name = %s, item_price = %s
            WHERE item_name = %s;
            """
            cursor.execute(query, (new_name, new_price, self.name))
            conn.commit()

            print(f"Item '{self.name}' updated to '{new_name}' with price {new_price}!")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()
            conn.close()