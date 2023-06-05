import React, { useEffect, useState } from "react";
import { getUserID } from "../states/GlobalState";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userID = getUserID();

  useEffect(() => {
    // Fetch user information from the backend
    fetch(`http://localhost:4000/user/${userID}/info`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched user info:", data);
        setUserInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching user info:", error);
        setError(error);
        setLoading(false);
      });
  }, [userID]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  if (!userInfo || !Array.isArray(userInfo)) {
    console.log("Invalid user info:", userInfo);
    return <p>No user information available.</p>;
  }

  return (
    <div>
      <h1>User Information</h1>
      {userInfo ? (
        <div>
          {userInfo.map((user) => (
            <div key={user.id}>
              <p>id: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>password: {user.password}</p>
              <p>Premium: {user.premium.toString()}</p>
              <p>Address:</p>
              <ul>
                {/* Here .address[0] is used, calling the first address object in the address array */}
                <li>Postal Code: {user.address[0].postalCode}</li>
                <li>Street: {user.address[0].street}</li>
                <li>City: {user.address[0].city}</li>
                <li>Country: {user.address[0].country}</li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
}
