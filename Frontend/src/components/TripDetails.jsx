import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Camera,
  Upload,
  X,
  Edit2,
  Plane,
  Hotel,
  Utensils,
  Mountain,
  Heart,
  Plus
} from 'lucide-react';

const TripDetailsPage = () => {
  const [selectedTrip, setSelectedTrip] = useState({
    id: 1,
    title: "Jaipur Adventure",
    destination: "Jaipur, Rajasthan",
    startDate: "2024-11-05",
    endDate: "2024-11-10",
    duration: "6 days",
    coverImage: "https://images.unsplash.com/photo-1577937397943-4e4f620f4133?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920&h=1080&fit=crop",
    status: "upcoming",
    travelers: 2,
    budget: "₹50,000"
  });

  const [activeTab, setActiveTab] = useState('itinerary');
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // New state for the edit modal
  const [uploadedPhotos, setUploadedPhotos] = useState([
    { id: 1, url: "https://images.unsplash.com/photo-1548013146-72479768b590?w=300&h=200&fit=crop", caption: "Hawa Mahal at sunrise" },
    { id: 2, url: "https://images.unsplash.com/photo-1550393278-2c262744747a?w=300&h=200&fit=crop", caption: "Amer Fort view" },
    { id: 3, url: "https://images.unsplash.com/photo-1596706059639-c189b83b3d1f?w=300&h=200&fit=crop", caption: "Local market in Jaipur" },
    { id: 4, url: "https://images.unsplash.com/photo-1531776518173-9529712a2099?w=300&h=200&fit=crop", caption: "Vibrant local street food" }
  ]);
  
  const fileInputRef = useRef(null);

  // Flatten the itinerary to a single array of activities for Jaipur
  const allActivities = [
    {
      date: "2024-11-05",
      time: "10:00",
      type: "flight",
      title: "Flight to Jaipur",
      description: "Indigo 6E 2115 - Delhi to Jaipur",
      location: "Indira Gandhi International Airport, Delhi",
      duration: "1h 15m",
      status: "confirmed"
    },
    {
      date: "2024-11-05",
      time: "12:30",
      type: "hotel",
      title: "Hotel Check-in",
      description: "The Oberoi Rajvilas",
      location: "Goner Rd, Jaipur",
      duration: "1h",
      status: "confirmed"
    },
    {
      date: "2024-11-05",
      time: "16:00",
      type: "activity",
      title: "Explore the Local Markets",
      description: "Shopping for textiles and handicrafts at Johari Bazaar",
      location: "Johari Bazaar, Jaipur",
      duration: "3h",
      status: "pending"
    },
    {
      date: "2024-11-06",
      time: "09:00",
      type: "activity",
      title: "Hawa Mahal Visit",
      description: "Explore the Palace of Winds and its intricate architecture",
      location: "Hawa Mahal, Jaipur",
      duration: "2h",
      status: "confirmed"
    },
    {
      date: "2024-11-06",
      time: "12:00",
      type: "activity",
      title: "Amer Fort & Elephant Ride",
      description: "Experience the grandeur of Amer Fort and enjoy an elephant ride",
      location: "Amer Fort, Jaipur",
      duration: "4h",
      status: "confirmed"
    },
    {
      date: "2024-11-06",
      time: "18:00",
      type: "restaurant",
      title: "Dinner at Niros Restaurant",
      description: "Try traditional Rajasthani cuisine",
      location: "Niros Restaurant, Jaipur",
      duration: "2h",
      status: "pending"
    },
    {
      date: "2024-11-07",
      time: "10:00",
      type: "activity",
      title: "Jantar Mantar & City Palace",
      description: "Discover the astronomical instruments and the royal residence",
      location: "City Palace, Jaipur",
      duration: "3h",
      status: "confirmed"
    },
    {
      date: "2024-11-07",
      time: "15:00",
      type: "activity",
      title: "Jaigarh Fort & Nahargarh Fort",
      description: "Visit the forts for panoramic views of the city",
      location: "Jaigarh Fort, Jaipur",
      duration: "3h",
      status: "pending"
    }
  ];

  const getActivityIcon = (type) => {
    const iconClass = "w-5 h-5";
    switch(type) {
      case 'flight': return <Plane className={iconClass} />;
      case 'hotel': return <Hotel className={iconClass} />;
      case 'restaurant': return <Utensils className={iconClass} />;
      case 'activity': return <Mountain className={iconClass} />;
      default: return <MapPin className={iconClass} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          url: e.target.result,
          caption: `Uploaded photo - ${file.name}`,
          file: file
        };
        setUploadedPhotos(prev => [...prev, newPhoto]);
      };
      reader.readAsDataURL(file);
    });
    setShowPhotoUpload(false);
  };

  const removePhoto = (photoId) => {
    setUploadedPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };
  
  const handleEditSave = (e) => {
    e.preventDefault();
    const form = e.target;
    setSelectedTrip({
      ...selectedTrip,
      title: form.title.value,
      destination: form.destination.value,
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      budget: form.budget.value,
    });
    setShowEditModal(false);
  };
  
  // Custom component for the activity list item
  const ActivityListItem = ({ activity }) => (
    <div className="flex items-start space-x-4 p-4 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-all shadow-sm">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          {getActivityIcon(activity.type)}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium text-gray-900">{activity.title}</h4>
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(activity.status)}`}>
            {activity.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {activity.time}
          </span>
          <span className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {activity.location}
          </span>
          <span>{activity.duration}</span>
        </div>
      </div>
      
      <button className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-200 rounded-lg transition-colors">
        <Edit2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen w-full relative">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-blue-200 to-white">
        <div className="absolute inset-0 bg-gradient-to-t from-sky-400/20 via-sky-200/15 to-white/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-transparent to-sky-100/40"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl p-4 mb-8 shadow-lg">
          <div className="flex items-center justify-between h-16 text-black">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-white/30 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold">{selectedTrip.title}</h1>
                <p className="text-sm">{selectedTrip.destination}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Trip</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-t-xl overflow-hidden">
          <nav className="flex space-x-8 px-8 border-b border-gray-200">
            {[
              { id: 'itinerary', label: 'Itinerary', count: allActivities.length },
              { id: 'photos', label: 'Photos', count: uploadedPhotos.length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
        
        {/* Content Tabs */}
        <div className="bg-white rounded-b-xl shadow-lg p-8">
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              {allActivities.map((activity, index) => (
                <ActivityListItem key={index} activity={activity} />
              ))}

              {/* The "Add New Activity" button has been removed */}

              {/* Final budget displayed at the end */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-blue-50 rounded-xl p-6 text-center shadow-inner">
                  <p className="text-sm text-gray-600">Total Trip Budget</p>
                  <h3 className="text-3xl font-bold text-blue-600 mt-1">{selectedTrip.budget}</h3>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Trip Photos</h2>
                <button
                  onClick={() => setShowPhotoUpload(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Upload Photos</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {uploadedPhotos.map((photo) => (
                  <div key={photo.id} className="group relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-gray-600 truncate">{photo.caption}</p>
                    </div>

                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => removePhoto(photo.id)}
                        className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {uploadedPhotos.length === 0 && (
                <div className="text-center py-12">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No photos yet</h3>
                  <p className="text-gray-500 mb-4">Upload your first photo to start building your trip album</p>
                  <button
                    onClick={() => setShowPhotoUpload(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Upload First Photo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Photo Upload Modal */}
      {showPhotoUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upload Photos</h3>
              <button
                onClick={() => setShowPhotoUpload(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload photos</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />

              <div className="flex space-x-2">
                <button
                  onClick={() => setShowPhotoUpload(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Choose Files
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Trip Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Trip Details</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Trip Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={selectedTrip.title}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  defaultValue={selectedTrip.destination}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    defaultValue={selectedTrip.startDate}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    defaultValue={selectedTrip.endDate}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  defaultValue={selectedTrip.budget}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetailsPage;
