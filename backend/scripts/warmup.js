const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

//** This script just fills the mongodb with the testdata from /testdata */
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('mydb');
        const collection = database.collection('devices');

        const filePath = path.resolve(__dirname, '../../testdata/data.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        await collection.insertMany(data);
        console.log('Data inserted successfully');
    } finally {
        await client.close();
    }
}

run().catch(console.dir);