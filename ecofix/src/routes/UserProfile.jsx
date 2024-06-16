// src/routes/UserProfile.jsx
import React from 'react';
import Profile from '../components/Profile';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();

  return <Profile userId={userId} isCurrentUser={false} />;
};

export default UserProfile;
