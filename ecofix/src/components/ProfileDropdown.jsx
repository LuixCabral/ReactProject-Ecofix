import React from 'react';
import { Link } from 'react-router-dom';
const ProfileDropdown = ({ handleLogout, user }) => {
  console.log(user)
  return (
    <div className="profile-dropdown">
      <ul>
        <li><Link to={'/meu-perfil/'}>Meu Perfil</Link></li>

        <li><button onClick={handleLogout}>Sair</button></li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;