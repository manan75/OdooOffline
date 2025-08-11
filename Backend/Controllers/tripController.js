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
    const [rows] = await db.query(
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


// Create a new trip destination
export const createTripDestination = async (req, res) => {
  const { trip_id, city_id, dest_date } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO trip_destinations (trip_id, city_id, dest_date) 
       VALUES (?, ?, ?)`,
      [trip_id, city_id, dest_date]
    );

    res.json({
      trip_dest_id: result.insertId,
      message: "Trip destination added successfully"
    });
  } catch (err) {
    console.error("❌ Error adding trip destination:", err);
    res.status(500).json({ error: "Failed to add trip destination" });
  }
};

// Create a new trip activity
export const createTripActivity = async (req, res) => {
  const { trip_dest_id, activity_id } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO trip_activities (trip_dest_id, activity_id) 
       VALUES (?, ?)`,
      [trip_dest_id, activity_id]
    );

    res.json({
      trip_activity_id: result.insertId,
      message: "Trip activity added successfully"
    });
  } catch (err) {
    console.error("❌ Error adding trip activity:", err);
    res.status(500).json({ error: "Failed to add trip activity" });
  }
};