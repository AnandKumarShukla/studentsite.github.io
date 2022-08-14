import express from 'express';
const app=express();
const port = process.env.PORT || '4000';
import web from './routes/web.js'
import connectDB from './db/connectdb.js';
const DATABASE_URL=process.env.DATABASE_URL || "mongodb://localhost:27017";



// Database Connection
connectDB(DATABASE_URL);


app.use(express.urlencoded({extended:true}));
// Routes Loads
app.use('/', web);

// Set Templet Engines
app.set("view engine", 'ejs');

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})