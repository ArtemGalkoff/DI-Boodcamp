import psycopg2

class MenuManager:
    @classmethod
    def get_by_name(cls, item_name):
        try:

            conn = psycopg2.connect(
                dbname="Menu_Item",
                user="postgres",
                password="bob",
                host="localhost",
                port="5432"
            )
            cursor = conn.cursor()

            query = "SELECT * FROM Menu_Items WHERE item_name = %s;"
            cursor.execute(query, (item_name,))
            result = cursor.fetchone()

            if result:
                return {
                    'item_id': result[0],
                    'item_name': result[1],
                    'item_price': result[2]
                }
            else:
                return None

        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()
            conn.close()

    @classmethod
    def all_items(cls):
        try:
            conn = psycopg2.connect(
                dbname="Menu_Item",
                user="postgres",
                password="bob",
                host="localhost",
                port="5432"
            )
            cursor = conn.cursor()

            query = "SELECT * FROM Menu_Items;"
            cursor.execute(query)
            results = cursor.fetchall()

            items = []
            for row in results:
                items.append({
                    'item_id': row[0],
                    'item_name': row[1],
                    'item_price': row[2]
                })

            return items

        except Exception as e:
            print(f"Error: {e}")
        finally:
            cursor.close()
            conn.close()

if __name__ == "__main__":
    item = MenuItem('Burger', 35)
    item.save()

    item.delete()

    item.update('Veggie Burger', 37)

    item2 = MenuManager.get_by_name('Beef Stew')
    if item2:
        print("Item found:", item2)
    else:
        print("Item not found")

    items = MenuManager.all_items()
    print("All menu items:", items)