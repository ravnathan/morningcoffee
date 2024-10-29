const { PrismaClient } = require('@prisma/client'); 
const fs = require('fs');

const prisma = new PrismaClient();

async function loadJSONData() {
 
  const data = fs.readFileSync('admin.json', 'utf-8');
  return JSON.parse(data); 
}

async function insertData() {
  const jsonData = await loadJSONData();

  await prisma.user.createMany({
    data: jsonData,
  });

  console.log('Data inserted successfully!');
}
insertData()
  .catch((e) => {
    console.error('Error inserting data:', e); 
  })
  .finally(async () => {
    await prisma.$disconnect(); 
  });