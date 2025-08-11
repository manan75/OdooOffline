import db from "../Config/db";


//creating a post
export const createPost = async (req, res) => {
  const { userId, tripId } = req.body;

  if (!userId || !tripId) {
    return res.status(400).json({ error: "userId and tripId are required" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO posts (user_id, trip_id) VALUES (?, ?)`,
      [userId, tripId]
    );

    res.status(201).json({ postId: result.insertId, message: "Post created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
};

//to fetch posts

export const getCommunityPosts = async (req, res) => {
  try {
    // Fetch posts along with basic user and trip info
    const [posts] = await db.query(`
      SELECT p.post_id, p.created_at, p.likes, p.is_public,
             u.user_id, u.name AS user_name,
             t.trip_id, t.trip_name, t.description, t.start_date, t.end_date, t.cover_photo
      FROM posts p
      JOIN users u ON p.user_id = u.user_id
      JOIN trips t ON p.trip_id = t.trip_id
      WHERE p.is_public = TRUE
      ORDER BY p.created_at DESC
      LIMIT 20
    `);

    // If no posts, return empty
    if (posts.length === 0) return res.json([]);

    // Extract tripIds for fetching destinations and activities
    const tripIds = posts.map(post => post.trip_id);

    // Fetch destinations grouped by trip_id
    const [destinations] = await db.query(`
      SELECT td.trip_dest_id, td.trip_id, td.dest_date, c.city_id, c.name AS city_name, c.state
      FROM trip_destinations td
      JOIN cities c ON td.city_id = c.city_id
      WHERE td.trip_id IN (?)
      ORDER BY td.dest_date
    `, [tripIds]);

    // Extract trip_dest_ids for fetching activities
    const tripDestIds = destinations.map(d => d.trip_dest_id);

    // Fetch activities grouped by trip_dest_id
    const [activities] = await db.query(`
      SELECT ta.trip_activity_id, ta.trip_dest_id, ta.scheduled_time, ta.notes,
             a.activity_id, a.name AS activity_name, a.type
      FROM trip_activities ta
      JOIN activities a ON ta.activity_id = a.activity_id
      WHERE ta.trip_dest_id IN (?)
      ORDER BY ta.scheduled_time
    `, [tripDestIds]);

    // Organize activities inside destinations
    const destinationsWithActivities = destinations.map(dest => ({
      ...dest,
      activities: activities.filter(act => act.trip_dest_id === dest.trip_dest_id)
    }));

    // Organize destinations inside trips for each post
    const postsWithDetails = posts.map(post => ({
      ...post,
      destinations: destinationsWithActivities.filter(dest => dest.trip_id === post.trip_id)
    }));

    res.json(postsWithDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch community posts" });
  }
};
