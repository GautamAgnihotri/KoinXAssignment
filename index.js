import express from "express";
import connectDB from "./util/dbConnection.js/";
import cryptoRoutes from "./Routes/cryptoRoutes.js";
import fetchCryptoData from "./CronJobForFetchingData/cryptoDataFetcher.js"
import dotenv from 'dotenv';
//Initialize Express app
const app = express();

dotenv.config();

console.log(process.env.PORT);
// Connect to MongoDB
connectDB();

//Start the cron Job
fetchCryptoData();

app.use('/api', cryptoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
