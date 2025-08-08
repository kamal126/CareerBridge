import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("<h1>Welcome to CareerBridge API</h1><p>Connecting students with verified university seniors for real-time guidance.</p>");
});
app.get('/profile', (req, res)=>{
    res.send("<h1>Profile Page</h1><p>View and manage your profile here.</p><p><a href='/'>Go back to Home</a></p>");
});

export default app;
