import mongoose from 'mongoose'
import app from "./app.js";
import configs from "./configs/index.js";








console.log(configs.DATABASE_CONNECTION_STRING);
mongoose.connect(configs.DATABASE_CONNECTION_STRING).then(()=>{
    console.log('database connected')

    app.listen(configs.PORT,() => {
        console.log(`sever started listening on port ${configs.PORT}...`)
    });
});
