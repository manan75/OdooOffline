import requests
import mysql.connector
from datetime import datetime

# ========================
# 1. DB CONNECTION
# ========================
db_config = {
    "host": "127.0.0.1",
    "user": "root",          # change to your DB username
    "password": "manan2005",  # change to your DB password
    "database": "odoo"  # change to your DB name
}

# ========================
# 2. FUNCTIONS
# ========================
def get_city_id(city_name):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute("SELECT city_id, name FROM cities WHERE name = %s", (city_name,))
    result = cursor.fetchone()
    conn.close()
    return result if result else None

def get_coordinates(city_name):
    url = f"https://geocoding-api.open-meteo.com/v1/search?name={city_name}&count=1"
    response = requests.get(url)
    data = response.json()
    if "results" in data and len(data["results"]) > 0:
        lat = data["results"][0]["latitude"]
        lon = data["results"][0]["longitude"]
        return lat, lon
    else:
        return None, None

def get_weather(lat, lon, date):
    url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={lat}&longitude={lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum"
        f"&start_date={date}&end_date={date}&timezone=auto"
    )
    response = requests.get(url)
    data = response.json()
    if "daily" in data:
        daily = data["daily"]
        return {
            "max_temp": daily["temperature_2m_max"][0],
            "min_temp": daily["temperature_2m_min"][0],
            "precipitation": daily["precipitation_sum"][0]
        }
    else:
        return None

def get_activities(city_id):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT name, best_time_to_visit, cost, review, type FROM activities WHERE city_id = %s", (city_id,))
    activities = cursor.fetchall()
    conn.close()
    return activities

# ========================
# 3. MAIN PROGRAM
# ========================
if __name__ == "__main__":

    city_name = input("Enter city name: ")
    trip_date = input("Enter trip date (YYYY-MM-DD): ")

    # Validate date format
    try:
        datetime.strptime(trip_date, "%Y-%m-%d")
    except ValueError:
        print("Invalid date format! Please use YYYY-MM-DD.")
        exit()

    city_info = get_city_id(city_name)
    if not city_info:
        print(f"City '{city_name}' not found in DB.")
        exit()

    city_id, city_name = city_info
    lat, lon = get_coordinates(city_name)
    if not lat or not lon:
        print("Could not find coordinates for city.")
        exit()

    weather = get_weather(lat, lon, trip_date)
    activities = get_activities(city_id)

    print("\n============================")
    print(f"Weather in {city_name} on {trip_date}")
    print("============================")
    if weather:
        print(f"Max Temp: {weather['max_temp']}°C")
        print(f"Min Temp: {weather['min_temp']}°C")
        print(f"Precipitation: {weather['precipitation']} mm")
    else:
        print("No weather data available.")

    print("\n============================")
    print(f"Activities in {city_name}")
    print("============================")
    if activities:
        for act in activities:
            print(f"- {act['name']} ({act['type']}), Cost: ₹{act['cost']}, Best Time: {act['best_time_to_visit']}")
            print(f"  Review: {act['review']}")
    else:
        print("No activities found.")