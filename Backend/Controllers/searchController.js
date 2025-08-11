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
