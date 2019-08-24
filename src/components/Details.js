import React from "react";
import { Link } from "gatsby";
import { getCurrentUser } from "../utils/auth";

const Home = () => {
  const user = getCurrentUser();
  console.log("user:", user);
  return (
    <div className="container">
      <h2 className="title is-size-4 has-text-weight-bold">Profile Details</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone_number}</p>
      <p>Username: {user.username}</p>
      <Link to="/user/home">Home</Link>
    </div>
  );
};

export default Home;
