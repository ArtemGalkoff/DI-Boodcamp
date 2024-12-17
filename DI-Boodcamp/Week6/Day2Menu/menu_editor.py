from menu import MenuItem
from menu_manager import MenuManager

def show_user_menu():
    print("Welcome to the Menu Editor")
    print("Please choose a variante:")
    print("V - View an Item")
    print("A - Add an Item")
    print("D - Delete an Item")
    print("U - Update an Item")
    print("S - Show the Menu")
    print("E - Exit")

    user_choice = input("Enter your choice: ").upper()

    if user_choice == 'V':
        view_item()
    elif user_choice == 'A':
        add_item_to_menu()
    elif user_choice == 'D':
        remove_item_from_menu()
    elif user_choice == 'U':
        update_item_from_menu()
    elif user_choice == 'S':
        show_restaurant_menu()
    elif user_choice == 'E':
        print("Exiting the program...")
        show_restaurant_menu()
        exit()
    else:
        print("Invalid choice. Please try again.")
        show_user_menu()


def add_item_to_menu():
    item_name = input("Enter the name of the item: ")
    item_price = input("Enter the price of the item: ")

    try:
        item_price = int(item_price)
        new_item = MenuItem(item_name, item_price)
        new_item.save()
        print(f"Item '{item_name}' added successfully!")
    except ValueError:
        print("Invalid price. Please enter a valid number.")


def remove_item_from_menu():
    item_name = input("Enter the name of the item you want to remove: ")

    item = MenuItem(item_name, 0)
    try:
        item.delete()
        print(f"Item '{item_name}' deleted successfully!")
    except Exception as e:
        print(f"Error: {e}. Item '{item_name}' could not be deleted.")


def update_item_from_menu():
    item_name = input("Enter the name of the item you want to update: ")
    new_name = input("Enter the new name for the item: ")
    new_price = input("Enter the new price for the item: ")

    try:
        new_price = int(new_price)
        item = MenuItem(item_name, 0)
        item.update(new_name, new_price)
        print(f"Item '{item_name}' updated successfully to '{new_name}' with price {new_price}!")
    except ValueError:
        print("Invalid price. Please enter a valid number.")
    except Exception as e:
        print(f"Error: {e}. Item '{item_name}' could not be updated.")


def show_restaurant_menu():
    items = MenuManager.all_items()
    if items:
        print("Restaurant Menu:")
        for item in items:
            print(f"{item['item_name']} - {item['item_price']} USD")
    else:
        print("The menu is empty.")

def main():
    while True:
        show_user_menu()

if __name__ == "__main__":
    main()