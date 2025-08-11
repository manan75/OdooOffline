import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContent } from "../Context/AppContext";
import { MapPin, Calendar, User, PlusCircle, XCircle } from "lucide-react";
import Navbar from "./Navbar.jsx";


function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [userTrips, setUserTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [creatingPost, setCreatingPost] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const { backendURL, userData } = useContext(AppContent);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await axios.get(`${backendURL}/api/community/getposts`);
      setPosts(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load posts.");
    }
    setLoadingPosts(false);
  };

  const fetchUserTrips = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/trips/getTrips/${userData.userId}`);
      setUserTrips(res.data);
      setError(null);
    } catch {
      setError("Failed to load your trips.");
    }
  };

  const handleCreatePostClick = () => {
    setShowCreatePost(true);
    fetchUserTrips();
  };

  const handlePostSubmit = async () => {
    if (!selectedTripId) {
      setError("Please select a trip.");
      return;
    }
    setCreatingPost(true);
    setError(null);
    try {
      await axios.post(`${backendURL}/api/community/createPost`, {
        userId: userData.userId,
        tripId: selectedTripId,
      });
      setSuccessMsg("Post created successfully!");
      setShowCreatePost(false);
      setSelectedTripId(null);
      fetchPosts();
    } catch {
      setError("Failed to create post.");
    }
    setCreatingPost(false);
  };

  return (
    <><Navbar/>
   <div className="min-h-screen bg-purple-300 p-6 pt-20 mx-auto">

      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-md">Community</h1>
        <button
          onClick={handleCreatePostClick}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition"
        >
          <PlusCircle size={20} /> Create Post
        </button>
      </header>

      {/* Success / Error messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md shadow-inner">{error}</div>
      )}
      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md shadow-inner">{successMsg}</div>
      )}

      {/* Posts Section */}
      {loadingPosts ? (
        <p className="text-gray-700 text-center">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-600 italic">No posts yet. Be the first to create one!</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.post_id}
              className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
              aria-label={`Post about ${post.trip_name} by ${post.user_name}`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg uppercase shadow">
                  {post.user_name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-lg text-gray-900">{post.trip_name}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <User size={14} /> {post.user_name}
                    <span className="mx-1">•</span>
                    <MapPin size={14} /> {post.description ? post.description.split(",")[0] : "Trip"}
                  </p>
                </div>
              </div>

              <p className="text-gray-800 mb-3 line-clamp-3">{post.description || "No description provided."}</p>

              <div className="flex items-center gap-6 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{new Date(post.start_date).toLocaleDateString()}</span>
                  <span>-</span>
                  <span>{new Date(post.end_date).toLocaleDateString()}</span>
                </div>

                <div className="font-semibold text-gray-700">{post.likes ?? 0} Likes</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl relative">
            <button
              onClick={() => {
                setShowCreatePost(false);
                setSelectedTripId(null);
                setError(null);
                setSuccessMsg(null);
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
              aria-label="Close create post form"
            >
              <XCircle size={28} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Select a Trip to Post About</h2>

            {userTrips.length === 0 ? (
              <p className="text-gray-600 italic">You have no trips to post about.</p>
            ) : (
              <select
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedTripId || ""}
                onChange={(e) => setSelectedTripId(e.target.value)}
              >
                <option value="" disabled>
                  -- Select a Trip --
                </option>
                {userTrips.map((trip) => (
                  <option key={trip.trip_id} value={trip.trip_id}>
                    {trip.trip_name} ({new Date(trip.start_date).toLocaleDateString()} -{" "}
                    {new Date(trip.end_date).toLocaleDateString()})
                  </option>
                ))}
              </select>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={handlePostSubmit}
                disabled={creatingPost}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold disabled:opacity-50"
              >
                {creatingPost ? "Creating..." : "Create Post"}
              </button>
              <button
                onClick={() => {
                  setShowCreatePost(false);
                  setSelectedTripId(null);
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default CommunityPage;
