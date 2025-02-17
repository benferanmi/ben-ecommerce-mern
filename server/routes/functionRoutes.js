import express from "express";
import { updateUserBestSeller } from "../controllers/functionController.js";


const functionRouter = express.Router()

functionRouter.post("/newsletter", updateUserBestSeller)


export default functionRouter