import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./lib/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import AuthRouter from "./Routes/AuthRouter.js";
const PORT = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/auth' , AuthRouter);


app.get("/nomnom" , (req , res) => {
    res.send("hello");
})

app.listen(PORT , () => {
    console.log(`Server listening on port no ${PORT}`);
    connectDB();
})