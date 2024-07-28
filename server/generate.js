const { faker } = require('@faker-js/faker');
const fs = require('fs');

const database = { products: [] };

for (let i = 1; i <= 300; i++) {
  database.products.push({
    id: +i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    price: faker.datatype.number({ min: 0, max: 30000 }),
    thumnail: `https://random.imagecdn.app/100/100?id=${i}`,
    imageUrl: `https://random.imagecdn.app/300/300?id=${i}`,
    quantity: faker.datatype.number()
  });
}

fs.writeFile('./server/database.json', JSON.stringify(database), (err) => {
  if (err) throw err;
  console.log('Data written to db.json');
});

