import React from 'react'
import { useNavigate } from 'react-router';

function RouteCard({ image, from, to, price }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/search?from=${from}&to=${to}&date=`);
  };
  
  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="h-48 overflow-hidden">
        <img src={image} alt={`${from} to ${to}`} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-gray-900">{from}</span>
          <span className="text-gray-400">→</span>
          <span className="text-lg font-semibold text-gray-900">{to}</span>
        </div>
        <p className="text-blue-600 font-semibold">{price}</p>
      </div>
    </div>
  );
}
export default RouteCard