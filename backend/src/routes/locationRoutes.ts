import express from "express";

const router = express.Router()

router.get("/", (req, res) => {
    res.json({ message: "hello" });
});

router.get("/hello", (req, res) => {
    res.json({ message: "hello" });
});

export default router;