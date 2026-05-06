import { AppLayout } from "../components/AppLayout";
import {
  ChevronRight,
  Bell,
  MapPin,
  Globe,
  LogOut,
  User,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router";

export function UserProfileScreen() {
  const navigate = useNavigate();

  const settingsItems = [
    { icon: Bell, label: "Notifications", path: "#" },
    { icon: MapPin, label: "Saved Stops", path: "#" },
    {
      icon: Globe,
      label: "Language",
      path: "#",
      value: "English",
    },
  ];

  return (
    <AppLayout>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F6E56] to-[#0F6E56]/80 px-6 py-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-[#EF9F27] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            AM
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">
              Muhammad Faisal
            </h1>
            <p className="text-white/80 text-sm mt-1">
              0312-XXXXXXX
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Your Journey Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F4F4F2] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-[#0F6E56]" />
                <span className="text-xs text-gray-600">
                  Total Trips
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                42
              </p>
            </div>

            <div className="bg-[#F4F4F2] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-[#EF9F27]" />
                <span className="text-xs text-gray-600">
                  Total Spent
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                38.4K
              </p>
              <p className="text-xs text-gray-500">PKR</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Upcoming Bookings
        </h2>
        <div
          onClick={() => navigate("/tickets")}
          className="bg-gradient-to-r from-[#0F6E56]/10 to-[#EF9F27]/10 rounded-xl p-4 border-2 border-[#0F6E56] cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-900 mb-1">
                Route 4 to Lahore
              </p>
              <p className="text-sm text-gray-600">
                Today, 9:00 AM • Seat B-7
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#0F6E56]" />
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Settings
        </h2>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {settingsItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() =>
                item.path !== "#" && navigate(item.path)
              }
              className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                index !== settingsItems.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {item.value && (
                  <span className="text-sm text-gray-500">
                    {item.value}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Account Section */}
      <div className="px-4 mb-20">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Account
        </h2>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">
                Edit Profile
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors border-t border-gray-100"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="font-medium text-red-500">
                Logout
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* App Version */}
      <div className="text-center pb-20 px-4">
        <p className="text-xs text-gray-400">
          smartSafar v1.0.0
        </p>
        <p className="text-xs text-gray-400 mt-1">
          NUML University Faisalabad • FYP 2024
        </p>
      </div>
    </AppLayout>
  );
}