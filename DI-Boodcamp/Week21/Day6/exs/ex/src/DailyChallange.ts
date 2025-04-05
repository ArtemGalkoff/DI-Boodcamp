type User = {
    type: 'user';
    name: string;
    age: number;
  };
  
  type Product = {
    type: 'product';
    id: number;
    price: number;
  };
  
  type Order = {
    type: 'order';
    orderId: string;
    amount: number;
  };

  function handleData(data: (User | Product | Order)[]): string[] {
    const results: string[] = [];
  
    data.forEach(item => {
      if (isUser(item)) {
        results.push(`Hello, ${item.name}. You are ${item.age} years old.`);
      } else if (isProduct(item)) {
        results.push(`Product ID: ${item.id}, Price: $${item.price}`);
      } else if (isOrder(item)) {
        results.push(`Order ID: ${item.orderId}, Amount: $${item.amount}`);
      } else {
        results.push('Unexpected data type');
      }
    });
  
    return results;
  }
  
  function isUser(item: User | Product | Order): item is User {
    return item.type === 'user';
  }
  
  function isProduct(item: User | Product | Order): item is Product {
    return item.type === 'product';
  }
  
  function isOrder(item: User | Product | Order): item is Order {
    return item.type === 'order';
  }
  
  const data: (User | Product | Order)[] = [
    { type: 'user', name: 'John', age: 30 },
    { type: 'product', id: 101, price: 29.99 },
    { type: 'order', orderId: 'A123', amount: 150 },
    { type: 'user', name: 'Alice', age: 25 },
  ];
  
  const result = handleData(data);
  console.log(result);