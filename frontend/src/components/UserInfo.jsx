import React, { useEffect, useState } from "react";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user information from the backend
    fetch("http://localhost:4000/users")
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  return (
    <div>
      <h1>User Information</h1>
      {userInfo ? (
        <div>
          {userInfo.map((user) => (
            <div key={user.id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>password: {user.password}</p>
              <p>Address:</p>
              <ul>
                <li>Postal Code: {user.address.postalCode}</li>
                <li>Street: {user.address.street}</li>
                <li>City: {user.address.city}</li>
                <li>Country: {user.address.country}</li>
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
