import db from "../Config/db.js";

// Get all cities with their activities
export const getCitiesWithActivities = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
         c.city_id,
         c.name AS city_name,
         c.state,
         c.ratings,
         c.about,
         a.activity_id,
         a.name AS activity_name,
         a.best_time_to_visit,
         a.cost,
         a.review,
         a.type
       FROM cities c
       LEFT JOIN activities a ON c.city_id = a.city_id
       ORDER BY c.name ASC, a.name ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
};


//fetching some top cities

export const getTopCities = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT city_id, name, state, ratings, about
       FROM cities
       ORDER BY ratings DESC
       LIMIT 8`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch top cities" });
  }
};


// Search cities by name

export const searchCities = async (req, res) => {
  try {
    const { q } = req.query; // search term from frontend
    const [rows] = await db.query(
      `SELECT city_id, name, state, ratings, about
       FROM cities
       WHERE name LIKE ?
       ORDER BY ratings DESC`,
      [`%${q}%`]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search cities" });
  }
};

// Get all activities for a given city
export const getActivitiesByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const [rows] = await db.query(
      `SELECT activity_id, name, best_time_to_visit, cost, review, type
       FROM activities
       WHERE city_id = ?`,
      [cityId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
};
