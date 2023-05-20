const User = require("./schemas/User.js");

const user1 = new User({
  id: 0,
  name: "John Doe",
  email: "johndoe@example.com",
  password: "SecurePassword123!",
  premium: true,
  card: [
    {
      id: 1,
      number: "4111111111111111",
      cvv: "123",
      expMonth: "12",
      expYear: "2025",
    },
  ],
  message: [
    {
      id: 1,
      message: "Joe's Birthday!",
      date: new Date("2023-08-15"), // Specific future date
    },
    {
      id: 2,
      message: "Date with Marry!",
      date: new Date("2023-06-20"),
    },
  ],
  cart: [
    {
      gift: [
        {
          id: 1,
          name: "Gift 1",
          description: "This is gift 1",
          price: 10,
          tag: [{ id: 1, name: "Tag 1" }],
        },
      ],
    },
  ],
  order: [
    {
      id: 1,
      gift: [
        {
          id: 2,
          name: "Gift 2",
          description: "This is gift 2",
          price: 20,
          tag: [{ id: 2, name: "Tag 2" }],
        },
      ],
      card: {
        id: 2,
        number: "5555444433332222",
        cvv: "456",
        expMonth: 10,
        expYear: 2024,
      },
      address: {
        id: 2,
        fullName: "John Doe",
        postalCode: "54321",
        street: "First Avenue",
        city: "San Francisco",
        country: "USA",
      },
      shippingDate: new Date("2023-07-01"), // Specific future date
    },
  ],
  address: [
    {
      id: 2,
      fullName: "John Doe",
      postalCode: "54321",
      street: "First Avenue",
      city: "San Francisco",
      country: "USA",
    },
  ],
});

const user2 = new User({
  id: 1,
  name: "Jane Smith",
  email: "janesmith@example.com",
  password: "StrongP@ssw0rd!",
  premium: false,
  card: [
    {
      id: 3,
      number: "6011555566664444",
      cvv: "789",
      expMonth: "6",
      expYear: "2023",
    },
  ],
  message: [
    {
      id: 3,
      message: "Happy Anniversary!",
      date: new Date("2023-09-10"), // Specific future date
    },
    {
      id: 4,
      message: "Congratulations on your promotion!",
      date: new Date("2023-05-22"), // Specific future date
    },
  ],
  cart: [
    {
      gift: [
        {
          id: 3,
          name: "Gift 3",
          description: "This is gift 3",
          price: 15,
          tag: [{ id: 3, name: "Tag 3" }],
        },
      ],
    },
  ],
  order: [
    {
      id: 2,
      gift: [
        {
          id: 4,
          name: "Gift 4",
          description: "This is gift 4",
          price: 25,
          tag: [{ id: 4, name: "Tag 4" }],
        },
      ],
      card: {
        id: 4,
        number: "371449635398431",
        cvv: "321",
        expMonth: 8,
        expYear: 2022,
      },
      address: {
        id: 3,
        fullName: "Jane Smith",
        postalCode: "67890",
        street: "Second Avenue",
        city: "Los Angeles",
        country: "USA",
      },
      shippingDate: new Date("2023-06-15"), // Specific future date
    },
  ],
  address: [
    {
      id: 3,
      fullName: "Jane Smith",
      postalCode: "67890",
      street: "Second Avenue",
      city: "Los Angeles",
      country: "USA",
    },
  ],
});

const users = [user1, user2];

module.exports = users;
