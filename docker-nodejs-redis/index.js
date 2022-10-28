import express from 'express';
const app = express();
import { createClient } from 'redis';

const client = createClient({
  socket: {
    host: 'redis-server',
    port: 6379,
  },
});

client.connect().then(() => {
  console.log('Connected to Redis');
});

app.get('/', async (_req, res) => {
  try {
    const visits = await client.get('visits');
    res.send('Number of visits is ' + visits);
    if (!visits || isNaN(visits)) {
      await client.set('visits', 1);
    } else {
      await client.set('visits', parseInt(visits) + 1);
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
