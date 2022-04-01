import React, { useEffect, useState } from "react";
import axios from "axios";

export const AdminPortal = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/admin/getusers").then((res) => {
      setUsers(res.data);
    });
  }, [users]);

  const removeUser = (user_id) => {
    let body = JSON.stringify({ user_id });
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    axios.post("/admin/removeuser", body, config).then((res) => {
      setUsers(res.data);
    });
  };

  let userCard = users
    .filter((x) => !x.isAdmin)
    .map((user, key) => {
      return (
        <div key={key} className="user-card">
          <div>user name: <span>{user.name}</span></div>
          <div>user email: <span>{user.email}</span></div>
          <div>play count: <span>{user.play_record.length}</span></div>
          <div>member since: <span>{new Date(user.register_date).toDateString()}</span></div>
          <button onClick={() => removeUser(user._id)}>Remove User</button>
        </div>
      );
    });
  return <div className="admin-portal">{userCard}</div>;
};
