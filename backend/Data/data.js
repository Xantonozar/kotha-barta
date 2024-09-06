const dummyData = {
  id: 1,
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ],
  products: [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Smartphone', price: 599.99 },
    { id: 3, name: 'Headphones', price: 149.99 }
  ],
  orders: [
    { id: 1, userId: 1, productId: 2, quantity: 1 },
    { id: 2, userId: 2, productId: 1, quantity: 1 },
    { id: 3, userId: 3, productId: 3, quantity: 2 }
  ]
}

module.exports = dummyData
