"use client";

import React from 'react';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import { MdSave } from 'react-icons/md';

export default function EditListing() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2D2D2D] font-sans antialiased p-4 sm:p-8 max-w-4xl mx-auto">
      
      {/* Top Navigation / Header */}
      <div className="flex items-center gap-3 mb-8">
        <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors bg-white border border-gray-200 rounded-md px-2.5 py-1 shadow-sm">
          <FiArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
        <h1 className="text-2xl font-medium tracking-tight text-[#1A1A1A]">
          Edit Listing
        </h1>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        
        {/* Section 1: Basic Information */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="text-sm font-medium text-gray-400 tracking-wide mb-1">
            Basic Information
          </h2>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Property Title <span className="text-red-400">*</span>
            </label>
            <input 
              type="text" 
              defaultValue="Luxury Apartment in Victoria Island" 
              className="w-full bg-[#FFFDF9] border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-orange-300 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Location <span className="text-red-400">*</span>
              </label>
              <input 
                type="text" 
                defaultValue="Victoria Island, Lagos" 
                className="w-full bg-[#FFFDF9] border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-orange-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Property Type <span className="text-red-400">*</span>
              </label>
              <select 
                defaultValue="Apartment"
                className="w-full bg-[#FFFDF9] border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-orange-300 shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23555%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.65em_auto] bg-[right_1rem_center] bg-no-repeat cursor-pointer"
              >
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea 
              rows={4}
              defaultValue="Beautiful luxury apartment with stunning views, modern amenities, and prime location in the heart of Victoria Island. Perfect for discerning buyers seeking premium residential living."
              className="w-full bg-[#FFFDF9] border border-gray-200 rounded-lg p-3.5 text-sm text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-orange-300 shadow-sm resize-y leading-relaxed"
            />
          </div>
        </div>

        {/* Section 2: Property Details */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-5">
          <h2 className="text-sm font-medium text-gray-400 tracking-wide mb-1">
            Property Details
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Bedrooms</label>
              <input 
                type="number" 
                defaultValue={3} 
                className="w-full bg-[#FFFDF9] border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-orange-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Bathrooms</label>
              <input 
                type="number" 
                defaultValue={2} 
                className="w-full bg-[#FFFDF9] border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-orange-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Square Feet</label>
              <input 
                type="number" 
                defaultValue={2500} 
                className="w-full bg-[#FFFDF9] border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-orange-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Year Built</label>
              <input 
                type="number" 
                defaultValue={2020} 
                className="w-full bg-[#FFFDF9] border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-orange-300 shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Furnishing</label>
              <select 
                defaultValue="Fully Furnished"
                className="w-full bg-[#FFFDF9] border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-orange-300 shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23555%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.65em_auto] bg-[right_1rem_center] bg-no-repeat cursor-pointer"
              >
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Price (₦) <span className="text-red-400">*</span>
              </label>
              <input 
                type="text" 
                defaultValue="250000000" 
                className="w-full bg-[#FFFDF9] border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-orange-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Amenities */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-400 tracking-wide mb-0.5">
              Amenities
            </h2>
            <label className="block text-xs font-light text-gray-400 mb-2">
              List amenities separated by commas
            </label>
            <textarea 
              rows={3}
              defaultValue="Swimming Pool, Gym, Security, Parking, Garden, Balcony"
              className="w-full bg-[#FFFDF9] border border-gray-200 rounded-lg p-3.5 text-sm text-[#2D2D2D] focus:outline-none focus:ring-1 focus:ring-orange-300 shadow-sm resize-y"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button 
            type="button"
            className="w-full sm:w-1/2 flex items-center justify-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium text-xs rounded-lg py-3 transition-colors shadow-sm"
          >
            <FiX className="w-4 h-4" />
            Cancel
          </button>
          <button 
            type="submit"
            className="w-full sm:w-1/2 flex items-center justify-center gap-1.5 bg-[#EAB308] hover:bg-[#D9A306] text-white font-medium text-xs rounded-lg py-3 transition-colors shadow-sm"
          >
            <MdSave className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        {/* Footer Subtext */}
        <p className="text-[10px] text-gray-400 text-center font-light tracking-wide mt-4">
          Changes will be automatically published and visible to buyers after review
        </p>

      </form>
    </div>
  );
}