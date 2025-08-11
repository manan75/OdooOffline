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
    console.error(" Error adding trip activity:", err);
    res.status(500).json({ error: "Failed to add trip activity" });
  }
};

// Get all destinations for a trip
export const getTripDestinations = async (req, res) => {
  const { tripId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT td.trip_dest_id, td.dest_date, c.city_id, c.name AS city_name, c.state
       FROM trip_destinations td
       JOIN cities c ON td.city_id = c.city_id
       WHERE td.trip_id = ?
       ORDER BY td.dest_date`,
      [tripId]
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching trip destinations:", err);
    res.status(500).json({ error: "Failed to fetch trip destinations" });
  }
};

// Update a trip destination
export const updateTripDestination = async (req, res) => {
  const { tripDestId } = req.params;
  const { city_id, dest_date } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE trip_destinations SET city_id = ?, dest_date = ? WHERE trip_dest_id = ?`,
      [city_id, dest_date, tripDestId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Trip destination not found" });
    }

    res.json({ message: "Trip destination updated successfully" });
  } catch (err) {
    console.error("❌ Error updating trip destination:", err);
    res.status(500).json({ error: "Failed to update trip destination" });
  }
};

// Delete a trip destination
export const deleteTripDestination = async (req, res) => {
  const { tripDestId } = req.params;

  try {
    const [result] = await db.query(
      `DELETE FROM trip_destinations WHERE trip_dest_id = ?`,
      [tripDestId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Trip destination not found" });
    }

    res.json({ message: "Trip destination deleted successfully" });
  } catch (err) {
    console.error(" Error deleting trip destination:", err);
    res.status(500).json({ error: "Failed to delete trip destination" });
  }
};

// Get all activities for a trip destination
export const getTripActivities = async (req, res) => {
  const { tripDestId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT ta.trip_activity_id, ta.scheduled_time, ta.notes,
              a.activity_id, a.name AS activity_name, a.description
       FROM trip_activities ta
       JOIN activities a ON ta.activity_id = a.activity_id
       WHERE ta.trip_dest_id = ?
       ORDER BY ta.scheduled_time`,
      [tripDestId]
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching trip activities:", err);
    res.status(500).json({ error: "Failed to fetch trip activities" });
  }
};

// Update a trip activity
export const updateTripActivity = async (req, res) => {
  const { tripActivityId } = req.params;
  const { scheduled_time, notes } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE trip_activities SET scheduled_time = ?, notes = ? WHERE trip_activity_id = ?`,
      [scheduled_time || null, notes || null, tripActivityId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Trip activity not found" });
    }

    res.json({ message: "Trip activity updated successfully" });
  } catch (err) {
    console.error("❌ Error updating trip activity:", err);
    res.status(500).json({ error: "Failed to update trip activity" });
  }
};

// Delete a trip activity
export const deleteTripActivity = async (req, res) => {
  const { tripActivityId } = req.params;

  try {
    const [result] = await db.query(
      `DELETE FROM trip_activities WHERE trip_activity_id = ?`,
      [tripActivityId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Trip activity not found" });
    }

    res.json({ message: "Trip activity deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting trip activity:", err);
    res.status(500).json({ error: "Failed to delete trip activity" });
  }
};


// GET /api/trips/:tripId/destinations-activities
export const getDestinationsWithActivities = async (req, res) => {
  const { tripId } = req.params;

  try {
    const [destinations] = await db.query(
      `SELECT td.trip_dest_id, td.dest_date, c.city_id, c.name AS city_name, c.state
       FROM trip_destinations td
       JOIN cities c ON td.city_id = c.city_id
       WHERE td.trip_id = ?
       ORDER BY td.dest_date`,
      [tripId]
    );

    if (destinations.length === 0) return res.json([]);

    const destIds = destinations.map(d => d.trip_dest_id);

    // Fix: Removed a.description from SELECT because it doesn't exist
    const [activities] = await db.query(
      `SELECT ta.trip_activity_id, ta.trip_dest_id, ta.scheduled_time, ta.notes,
              a.activity_id, a.name AS activity_name, a.type
       FROM trip_activities ta
       JOIN activities a ON ta.activity_id = a.activity_id
       WHERE ta.trip_dest_id IN (?)
       ORDER BY ta.scheduled_time`,
      [destIds]
    );

    const destWithActivities = destinations.map(dest => ({
      ...dest,
      activities: activities.filter(act => act.trip_dest_id === dest.trip_dest_id),
    }));

    res.json(destWithActivities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch destinations and activities" });
  }
};
