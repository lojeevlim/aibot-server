import { Router } from "express";
import { handleChat, handleChatv1 } from "../controllers/chatController.js";

const router = Router();

router.post("/", handleChat);

router.post("/v1", handleChatv1);

export default router;