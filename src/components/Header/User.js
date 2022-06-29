import React from "react";

function User(props) {
  const { user } = props;

  return (
    <div>
      <img
        width="40"
        className="rounded-circle"
        src={`https://secure.gravatar.com/avatar/${
          user.avatar.gravatar.hash
        }.jpg?s=64"`}
        alt=""
      />
    </div>
  );
}
export default User;
