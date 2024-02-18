import React from 'react';

function Sidebar({ userProfile }) {
  // Environmental accent colors
  const accentColor = "text-green-600"; // A deep green for text
  const borderColor = "border-green-200"; // A soft green for borders

  if (!userProfile) {
    return (
      <div className={`flex flex-col w-64 bg-white h-full justify-center items-center shadow-lg`}>
        <p className={`${accentColor}`}>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col w-64 bg-white h-full shadow-lg`}>
      {/* User Profile Section */}
      <div className={`flex items-center p-4 border-b ${borderColor}`}>
        {/* Profile Photo */}
        {userProfile.photoURL && (
          <img src={userProfile.photoURL} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
        )}
        {/* User Name and Email */}
        <div>
          <div className={`font-semibold ${accentColor}`}>{userProfile.displayName}</div>
          <div className="text-gray-600">{userProfile.email}</div>
        </div>
      </div>

      {/* Placeholder for additional sidebar content */}
      {/* Consider using environmental accent colors for icons or highlight elements */}
    </div>
  );
}

export default Sidebar;
