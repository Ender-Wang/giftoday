import React from "react";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      orders: [],
    };
  }

  componentDidMount() {
    this.fetchUserData();
    this.fetchUserOrders();
  }

  fetchUserData() {
    setTimeout(() => {
      const userData = {
        name: "John Doe",
        email: "johndoe@example.com",
        address: "123 Main St, City, Country",
      };
      this.setState({
        name: userData.name,
        email: userData.email,
        address: userData.address,
      });
    }, 100);
  }

  fetchUserOrders() {
    // Simulate asynchronous requests to obtain user order data
    setTimeout(() => {
      const userOrders = [
        { id: 1, product: "Product A", price: 10 },
        { id: 2, product: "Product B", price: 20 },
        { id: 3, product: "Product C", price: 15 },
      ];
      this.setState({ orders: userOrders });
    }, 100); // Suppose the request takes 0.1 seconds to return data
  }

  render() {
    const { name, email, address, orders } = this.state;

    return (
      <div>
        <h1>User Information</h1>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>

        <h2>Orders</h2>
        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.product}</td>
                  <td>${order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    );
  }
}

export default UserInfo;
