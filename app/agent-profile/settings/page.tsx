'use client';

import React, { useState } from 'react';
import { Bell, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  // Notification States
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  // Password States
  const [currentPassword, setCurrentPassword] = useState('••••••••');
  const [newPassword, setNewPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');

  return (
    <div className="min-h-screen bg-[#FFFDF9] p-4 sm:p-8 font-sans text-[#333333]">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-[#2D2D2D] tracking-tight mb-6">Settings</h1>

        {/* 1. Profile Information Section */}
        <section className="bg-white border border-[#F5EFE6] rounded-xl p-6 shadow-sm relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-base font-semibold text-[#2D2D2D]">Profile Information</h2>
              <p className="text-xs text-gray-400 mt-0.5">Update your personal information.</p>
            </div>
            <button className="bg-[#FBBF24] hover:bg-amber-500 text-white font-medium text-xs px-4 py-2 rounded-lg transition-colors shadow-sm">
              Edit Profile
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-0.5">Business Name</span>
              <span className="text-[#333333]">John doe</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-0.5">Office Address</span>
              <span className="text-[#333333]">No.#</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-0.5">Office Email</span>
              <span className="text-[#333333]">No.#</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-0.5">Phone Number</span>
              <span className="text-[#333333]">+234 701 000 0000</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-0.5">Areas of operation</span>
              <span className="text-[#333333]">Lagos, FCT...</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 mb-0.5">Bio</span>
              <span className="text-[#333333]">Fast and reliable service</span>
            </div>
          </div>
        </section>

        {/* 2. Notification Preferences Section */}
        <section className="bg-white border border-[#F5EFE6] rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-gray-600" />
            <h2 className="text-base font-semibold text-[#2D2D2D]">Notification Preferences</h2>
          </div>
          <p className="text-xs text-gray-400 -mt-3 mb-4">Manage how you receive notifications</p>

          <div className="space-y-3">
            {/* Email Toggle */}
            <div className="flex justify-between items-center bg-[#FFFDF9] border border-[#FAF6F0] p-3 rounded-xl">
              <div>
                <h3 className="text-xs font-semibold text-[#2D2D2D]">Email Notifications</h3>
                <p className="text-[11px] text-gray-400">Receive updates via email.</p>
              </div>
              <button 
                onClick={() => setEmailNotif(!emailNotif)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out border ${emailNotif ? 'bg-white border-[#FBBF24]' : 'bg-gray-200 border-gray-300'}`}
              >
                <div className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${emailNotif ? 'translate-x-5 bg-[#FBBF24]' : 'translate-x-0 bg-white'}`} />
              </button>
            </div>

            {/* SMS Toggle */}
            <div className="flex justify-between items-center bg-[#FFFDF9] border border-[#FAF6F0] p-3 rounded-xl">
              <div>
                <h3 className="text-xs font-semibold text-[#2D2D2D]">SMS Notifications</h3>
                <p className="text-[11px] text-gray-400">Receive updates via SMS.</p>
              </div>
              <button 
                onClick={() => setSmsNotif(!smsNotif)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out border ${smsNotif ? 'bg-white border-[#FBBF24]' : 'bg-gray-200 border-gray-300'}`}
              >
                <div className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${smsNotif ? 'translate-x-5 bg-[#FBBF24]' : 'translate-x-0 bg-white'}`} />
              </button>
            </div>

            {/* Push Toggle */}
            <div className="flex justify-between items-center bg-[#FFFDF9] border border-[#FAF6F0] p-3 rounded-xl">
              <div>
                <h3 className="text-xs font-semibold text-[#2D2D2D]">Push Notifications</h3>
                <p className="text-[11px] text-gray-400">Receive updates via push notifications</p>
              </div>
              <button 
                onClick={() => setPushNotif(!pushNotif)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out border ${pushNotif ? 'bg-white border-[#FBBF24]' : 'bg-gray-200 border-gray-300'}`}
              >
                <div className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${pushNotif ? 'translate-x-5 bg-[#FBBF24]' : 'translate-x-0 bg-white'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* 3. Password Security Section */}
        <section className="bg-white border border-[#F5EFE6] rounded-xl p-6 shadow-sm space-y-4">
          <p className="text-xs text-gray-400">Manage your account security</p>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#2D2D2D] mb-1">Current Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full text-xs p-2.5 border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-amber-400 pr-10 text-gray-700"
                />
                <EyeOff className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#2D2D2D] mb-1">New Password</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full text-xs p-2.5 border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-amber-400 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#2D2D2D] mb-1">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-xs p-2.5 border border-[#EAEAEA] rounded-lg focus:outline-none focus:border-amber-400 text-gray-700"
              />
            </div>
          </div>

          <button className="bg-[#FBBF24] hover:bg-amber-500 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors shadow-sm mt-2">
            Update Password
          </button>
        </section>

        {/* 4. Danger Zone Section */}
        <section className="bg-[#FFFDF9] border border-[#FCA5A5] border-opacity-40 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-[#2D2D2D]">Danger Zone</h2>
          <p className="text-xs text-gray-400 mt-0.5 mb-4">Irreversible actions</p>

          <div className="flex justify-between items-center bg-[#FEF2F2] border border-[#FEE2E2] p-4 rounded-xl">
            <div>
              <h3 className="text-xs font-semibold text-[#991B1B]">Delete Account</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Permanently delete your account and all associated data</p>
            </div>
            <button className="bg-white border border-[#FCA5A5] hover:bg-red-50 text-[#EF4444] font-medium text-xs px-4 py-2 rounded-lg transition-colors">
              Delete
            </button>
          </div>
        </section>

        {/* 5. Verification Status Section */}
        <section className="bg-white border border-[#FBBF24] border-opacity-40 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-[#2D2D2D]">Verification Status</h2>
          <p className="text-xs text-gray-400 mt-0.5 mb-4">Your account verification information</p>

          <div className="flex justify-between items-center bg-[#FEFBF0] border border-[#FDE68A] border-opacity-40 p-4 rounded-xl">
            <div>
              <h3 className="text-xs font-semibold text-[#B45309]">Account status</h3>
              <p className="text-[11px] text-[#D97706] mt-0.5">Your account is pending verification. Please provide the necessary details.</p>
            </div>
            <button className="bg-[#FFFDF9] border border-[#FCD34D] hover:bg-[#FEFBF0] text-[#B45309] font-medium text-xs px-5 py-2 rounded-lg transition-colors">
              Proceed
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}