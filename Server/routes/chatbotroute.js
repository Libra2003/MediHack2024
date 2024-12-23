import express from "express";
import { verifyUser } from "../utils/verifyToken";

const router = express.Router();

router.post("/",  verifyUser, );