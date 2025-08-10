import {
  Bell,
  User,
  Shield,
  Palette,
  Key,
  HelpCircle,
  LogOut
} from 'lucide-react';

// Settings Page Component
export default function SettingsPage(){
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="flex items-center p-4 bg-gray-50 rounded-xl shadow-sm">
          <User className="w-6 h-6 text-indigo-600 mr-4" />
          <div>
            <h4 className="font-semibold text-gray-800">Profile Settings</h4>
            <p className="text-sm text-gray-500">Manage your personal information</p>
          </div>
        </div>
        {/* Notification Settings */}
        <div className="flex items-center p-4 bg-gray-50 rounded-xl shadow-sm">
          <Bell className="w-6 h-6 text-pink-600 mr-4" />
          <div>
            <h4 className="font-semibold text-gray-800">Notifications</h4>
            <p className="text-sm text-gray-500">Configure alert preferences</p>
          </div>
        </div>
        {/* Security Settings */}
        <div className="flex items-center p-4 bg-gray-50 rounded-xl shadow-sm">
          <Shield className="w-6 h-6 text-green-600 mr-4" />
          <div>
            <h4 className="font-semibold text-gray-800">Security & Privacy</h4>
            <p className="text-sm text-gray-500">Update passwords and privacy settings</p>
          </div>
        </div>
        {/* Appearance Settings */}
        <div className="flex items-center p-4 bg-gray-50 rounded-xl shadow-sm">
          <Palette className="w-6 h-6 text-orange-600 mr-4" />
          <div>
            <h4 className="font-semibold text-gray-800">Appearance</h4>
            <p className="text-sm text-gray-500">Customize theme and layout</p>
          </div>
        </div>
        {/* API Keys */}
        <div className="flex items-center p-4 bg-gray-50 rounded-xl shadow-sm">
          <Key className="w-6 h-6 text-purple-600 mr-4" />
          <div>
            <h4 className="font-semibold text-gray-800">API Keys</h4>
            <p className="text-sm text-gray-500">Manage integrations and access</p>
          </div>
        </div>
        {/* Help & Support */}
        <div className="flex items-center p-4 bg-gray-50 rounded-xl shadow-sm">
          <HelpCircle className="w-6 h-6 text-blue-600 mr-4" />
          <div>
            <h4 className="font-semibold text-gray-800">Help & Support</h4>
            <p className="text-sm text-gray-500">Get assistance and view FAQs</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button className="mt-8 px-6 py-3 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl shadow-sm hover:shadow-md transition-colors flex items-center">
        <LogOut className="w-5 h-5 mr-2" />
        Log Out
      </button>
    </div>
  );
};