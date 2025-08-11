import db from "../Config/db.js";

// controllers/tripController.js

// Create a new trip
export const createTrip = async (req, res) => {
  const { user_id, trip_name, description, start_date, end_date, cover_photo } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO trips (user_id, trip_name, description, start_date, end_date, cover_photo) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, trip_name, description, start_date, end_date, cover_photo || null]
    );
    res.json({ trip_id: result.insertId, message: "Trip created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create trip" });
  }
};



// Get all trips for a user
export const getUserTrips = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT t.*, COUNT(td.trip_dest_id) AS destination_count
       FROM trips t
       LEFT JOIN trip_destinations td ON t.trip_id = td.trip_id
       WHERE t.user_id = ?
       GROUP BY t.trip_id
       ORDER BY t.start_date ASC`,
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};
