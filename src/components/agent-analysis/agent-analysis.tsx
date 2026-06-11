import React from 'react';
import { 
  FiArrowUpRight, 
  FiEye, 
  FiMessageSquare, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiArrowLeft 
} from 'react-icons/fi';
import { MdOutlineLightbulb } from 'react-icons/md';

// Mock data to keep the component clean and dynamic
const topStats = [
  {
    title: 'Total Views',
    value: '690',
    change: '+12% from last period',
    isPositive: true,
    icon: <FiEye className="w-6 h-6 text-orange-200" />,
  },
  {
    title: 'Total Inquiries',
    value: '40',
    change: '+8% from last period',
    isPositive: true,
    icon: <FiMessageSquare className="w-6 h-6 text-orange-200" />,
  },
  {
    title: 'Conversion Rate',
    value: '5.6%',
    change: '+0.3% from last period',
    isPositive: true,
    icon: <FiTrendingUp className="w-6 h-6 text-orange-200" />,
  },
  {
    title: 'Response Rate',
    value: '94%',
    change: 'Excellent',
    isPositive: true,
    badge: 'A+',
  },
];

const listings = [
  {
    id: 1,
    title: 'Luxury Waterfront Villa with Private Pool',
    location: 'Lagos, Ikoyi',
    type: 'for-sale',
    views: '234',
    viewsChange: '+12%',
    inquiries: '12',
    inquiriesChange: '+8%',
    conversionRate: '5.1%',
    avgTime: '4m 32s',
  },
  {
    id: 2,
    title: 'Modern 3BR Apartment in Business District',
    location: 'Accra, Osu',
    type: 'for-rent',
    views: '456',
    viewsChange: '+25%',
    inquiries: '28',
    inquiriesChange: '+15%',
    conversionRate: '6.1%',
    avgTime: '3m 15s',
  },
];

const optimizationTips = [
  'Add more high-quality photos to increase view-through rate',
  'Update listings regularly to stay visible in search results',
  'Respond to inquiries within 2 hours for higher conversion rates',
  'Use detailed descriptions with keywords for better search ranking',
];

export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2D2D2D] font-sans antialiased p-6 md:p-12 max-w-7xl mx-auto">
      
      {/* Back Navigation */}
      <button className="flex items-center gap-2 text-xs font-semibold text-orange-500 tracking-wide uppercase hover:opacity-80 transition-opacity mb-8">
        <FiArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-[#1A1A1A] mb-1">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-gray-500 font-light">
            Track performance and engagement for your listings
          </p>
        </div>
        <div>
          <select className="appearance-none bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 pr-8 text-gray-700 font-light focus:outline-none focus:ring-1 focus:ring-orange-200 cursor-pointer shadow-sm">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {topStats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm min-h-[140px]"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-gray-400 font-light block mb-2">
                  {stat.title}
                </span>
                <span className="text-3xl font-medium text-[#1A1A1A]">
                  {stat.value}
                </span>
              </div>
              {stat.icon && <div>{stat.icon}</div>}
              {stat.badge && (
                <span className="bg-[#E8F8F2] text-[#10B981] font-bold text-xs px-2 py-1 rounded-md">
                  {stat.badge}
                </span>
              )}
            </div>
            
            <div className="mt-4 flex items-center gap-1">
              <span className={`text-xs font-medium ${
                stat.change === 'Excellent' ? 'text-[#10B981]' : 'text-[#10B981]'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Listing Performance Section */}
      <div className="mb-12">
        <h2 className="text-xl font-medium text-[#1A1A1A] mb-6">
          Listing Performance
        </h2>
        
        <div className="space-y-4">
          {listings.map((listing) => (
            <div 
              key={listing.id} 
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6"
            >
              {/* Row Header */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-base font-medium text-[#1A1A1A]">
                    {listing.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light mt-0.5">
                    {listing.location}
                  </p>
                </div>
                <span className={`text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full ${
                  listing.type === 'for-sale' 
                    ? 'bg-[#FFF3E6] text-[#F97316]' 
                    : 'bg-[#FFF3E6] text-[#F97316]'
                }`}>
                  {listing.type.replace('-', ' ')}
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
                <div>
                  <span className="text-xs text-gray-400 font-light block mb-1">Views</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-medium text-[#1A1A1A]">{listing.views}</span>
                    <span className="text-[11px] font-medium text-[#10B981]">{listing.viewsChange}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-gray-400 font-light block mb-1">Inquiries</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-medium text-[#1A1A1A]">{listing.inquiries}</span>
                    <span className="text-[11px] font-medium text-[#10B981]">{listing.inquiriesChange}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-gray-400 font-light block mb-1">Conversion Rate</span>
                  <span className="text-xl font-medium text-[#1A1A1A]">{listing.conversionRate}</span>
                </div>

                <div>
                  <span className="text-xs text-gray-400 font-light block mb-1">Avg. Time on Listing</span>
                  <span className="text-xl font-medium text-[#1A1A1A]">{listing.avgTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Tips Container */}
      <div className="bg-[#FFF9F0] border border-[#FFEEDB] rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-2 text-orange-500 mb-6">
          <MdOutlineLightbulb className="w-5 h-5" />
          <h2 className="text-sm font-semibold tracking-wide uppercase">
            Optimization Tips
          </h2>
        </div>
        
        <ol className="space-y-4">
          {optimizationTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-[#4A4A4A] font-light">
              <span className="font-medium text-orange-500 min-w-[14px]">
                {index + 1}.
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ol>
      </div>

    </div>
  );
}