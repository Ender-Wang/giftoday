import React, { useState, useEffect } from "react";
const localhost = "http://127.0.0.1:4000";

export default function Test() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(localhost + "/users")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="text-6xl text-red-200">
      Giftoday
      <div>
        {data.map((item) => (
          <div key={item.name}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
