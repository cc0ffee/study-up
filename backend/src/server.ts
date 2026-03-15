import express from "express"
import cors from "cors";
import locationRoutes from './routes/locationRoutes.js';
import { config } from "dotenv";
import {connectDB, disconnectDB} from "./config/db.js";

config();
connectDB();

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(express.urlencoded( {extended: true }));

app.use(cors());

app.use("/spots", locationRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    })
});

process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception:", err);
    await disconnectDB();
    process.exit(1);
});

process.on("SIGTERM", async () => {
    console.log("SIGTERM received, exiting gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    })
});