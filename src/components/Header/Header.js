import React from "react";
import Login from "./Login/Login";
import User from "./User";


function Header(props) {
  const { user, updateUser, updateSessionId } = props;
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
        </ul>
        {user ? (
          <User user={user} />
        ) : (
          <Login updateUser={updateUser} updateSessionId={updateSessionId} />
        )}
      </div>
    </nav>
  );
}

export default Header;
