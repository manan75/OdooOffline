# Example in FastAPI
from fastapi import FastAPI
import mysql.connector
import requests
from datetime import datetime

app = FastAPI()

DB_CONFIG = {
    "host": "127.0.0.1",
    "user": "root",          # change to your DB username
    "password": "manan2005",  # change to your DB password
    "database": "odoo" 
}

WEATHER_API_KEY = "YOUR_OPENWEATHERMAP_KEY"

@app.get("/chatbot/check-weather")
def check_weather(city: str, travel_date: str):
    # Connect to DB
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM cities WHERE name = %s", (city,))
    city_data = cursor.fetchone()

    if not city_data:
        return {"message": "City not found in our database."}

    # Call weather API
    url = f"http://api.weatherapi.com/v1/forecast.json?key={WEATHER_API_KEY}&q={city}&dt={travel_date}"
    weather = requests.get(url).json()

    condition = weather["forecast"]["forecastday"][0]["day"]["condition"]["text"]
    temp = weather["forecast"]["forecastday"][0]["day"]["avgtemp_c"]

    if "storm" in condition.lower() or "rain" in condition.lower():
        # Suggest alternative
        cursor.execute("SELECT name FROM cities WHERE name != %s", (city,))
        alternatives = [row["name"] for row in cursor.fetchall()]
        return {
            "message": f"Weather in {city} on {travel_date} will be {condition} ({temp}°C). Consider visiting: {alternatives[:3]}"
        }

    return {
        "message": f"Weather in {city} on {travel_date} will be {condition} ({temp}°C). It's a good time to visit!"
    }