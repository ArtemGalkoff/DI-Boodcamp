import requests
import psycopg2
from random import sample


conn = psycopg2.connect(
    dbname="Countries",
    user="postgres",
    password="bob",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()

url = "https://restcountries.com/v3.1/all"
response = requests.get(url)

if response.status_code == 200:
    countries_data = response.json()

    random_countries = sample(countries_data, 10)

    for country in random_countries:
        name = country.get('name', {}).get('common', 'Unknown')
        capital = country.get('capital', ['Unknown'])[0]
        flag = country.get('flags', {}).get('png', 'No flag')
        subregion = country.get('subregion', 'Unknown')
        population = country.get('population', 0)

        cursor.execute("""
            INSERT INTO countries (name, capital, flag, subregion, population)
            VALUES (%s, %s, %s, %s, %s)
        """, (name, capital, flag, subregion, population))


    conn.commit()

    print("Successfully inserted 10 random countries into the database.")
else:
    print("Failed to fetch data from the API. Status code:", response.status_code)

#
cursor.close()
conn.close()