import {config} from 'dotenv'
import mongoose from 'mongoose'



config()
mongoose
    .connect(
        process.env.NODE_ENV === "development"
        ? process.env.MONGO_DB_URI_DEV
      : process.env.MONGO_DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    )
    .then(() => {
        console.log("Connection successful with db")
    }
    )
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
      });
    
   
