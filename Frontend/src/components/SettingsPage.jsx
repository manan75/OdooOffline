import { User, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 bg-white rounded-4xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Travel Settings</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg">
          <User className="w-5 h-5 text-gray-600" />
          <div>
            <h3 className="font-semibold">Profile Settings</h3>
            <p className="text-sm text-gray-600">Update your personal information and preferences</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600" />
          <div>
            <h3 className="font-semibold">Travel Notifications</h3>
            <p className="text-sm text-gray-600">Manage trip alerts and booking confirmations</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg">
          <Shield className="w-5 h-5 text-gray-600" />
          <div>
            <h3 className="font-semibold">Privacy & Security</h3>
            <p className="text-sm text-gray-600">Control your data and account security</p>
          </div>
        </div>
      </div>
    </div>
  );
}
