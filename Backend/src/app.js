import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("<h1>Welcome to CareerBridge API</h1><p>Connecting students with verified university seniors for real-time guidance.</p>");
});
app.get('/career', (req, res) =>{
    res.status(200).json({
        status: "success",
        message: "API is working fine"
    })
})

export {app};
