import db from "../Config/db.js";

// Insert or update budget for a trip
export const upsertTripBudget = async (req, res) => {
  const { tripId, budget, estimated_cost } = req.body;

  if (!tripId || budget == null || estimated_cost == null) {
    return res.status(400).json({ error: "tripId, budget and estimated_cost are required" });
  }

  try {
    // Check if budget already exists for the trip
    const [existing] = await db.query(
      `SELECT budget_id FROM trip_budgets WHERE trip_id = ?`,
      [tripId]
    );

    if (existing.length > 0) {
      // Update existing budget
      await db.query(
        `UPDATE trip_budgets SET budget = ?, estimated_cost = ? WHERE trip_id = ?`,
        [budget, estimated_cost, tripId]
      );
      res.json({ message: "Budget updated successfully" });
    } else {
      // Insert new budget record
      await db.query(
        `INSERT INTO trip_budgets (trip_id, budget, estimated_cost) VALUES (?, ?, ?)`,
        [tripId, budget, estimated_cost]
      );
      res.status(201).json({ message: "Budget inserted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upsert budget" });
  }
};

// Fetch budget by tripId
export const getTripBudget = async (req, res) => {
  const { tripId } = req.params;

  if (!tripId) {
    return res.status(400).json({ error: "tripId is required" });
  }

  try {
    const [rows] = await db.query(
      `SELECT budget_id, trip_id, budget, estimated_cost FROM trip_budgets WHERE trip_id = ?`,
      [tripId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Budget not found for this trip" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch budget" });
  }
};
