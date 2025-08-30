import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Body parser middleware
app.use(express.json({limit: '16kb'})); // to parse JSON bodies

app.use(express.urlencoded({extended:true, limit: '16kb'})); // to parse URL-encoded bodies
app.use(express.static('public')); // to serve static files
app.use(cookieParser()); // to parse cookies

// Test route

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
