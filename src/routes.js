import { Router } from "express";
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";
import ImobiController from "./controllers/ImobiController";
import MessageController from "./controllers/MessageController";
import auth from "./middlewares/auth";

import multer from "multer";
import uploadConfig from "./middlewares/upload";

const upload = multer(uploadConfig);

const router = Router();

router.post("/createuser", UserController.createUser);
router.get("/listusers", auth, UserController.findAllUser);
router.post("/session", SessionController.createSession);
router.post("/createimobi", upload.single("thumb"), ImobiController.createImobi);
router.get("/listimobi", ImobiController.findAllImobi);
router.get("/listimobi/:slug", ImobiController.findImobi);
router.post("/createmessage", MessageController.createMessage);
router.get("/listmessage/:id", MessageController.findMessage);

export { router };
