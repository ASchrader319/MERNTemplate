import express from "express";
import expressSession from "express-session";

import authRoutes from "./routes/auth.js";
import configs from "./configs/index.js";
const app = express();
const SESSION_SECRET = configs.SESSION_SECRET;
const IS_PRODUCTION = configs.IS_PRODUCTION;





app.use(express.json({limit: "1KB"}));
app.use(expressSession({
    name: "hush.sid",
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        secure: IS_PRODUCTION, 
        maxAGE: 1000*60*60*24, //1 day 

    },
}));

app.use('/api/v1/auth',authRoutes);
app.use(express.static("./components/signin"));


app.get("/", (req,res) =>{
    res.sendFile("./components/signin.tsx");
});

export default app; 
