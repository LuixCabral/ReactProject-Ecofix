import Profile from '../components/Profile';
import { getAuth } from "firebase/auth";

const MyProfile = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  return <Profile userId={currentUser.uid} isCurrentUser={true} />;
};

export default MyProfile;
