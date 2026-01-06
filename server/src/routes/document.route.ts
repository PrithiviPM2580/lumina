import { Router } from "express";
import { type Request, type Response, type NextFunction } from "express";
import protect from "@/middlewares/auth.middleware.js";
import upload from "@/middlewares/multer.middleware.js";

const router: Router = Router();

router.use(protect);

router.post("/upload", upload.single("file"), uploadDocumentController);

router.get("/", getDocumentsController);

router.get("/:id", getDocumentByIdController);

router.delete("/:id", deleteDocumentController);

router.put("/:id", upload.single("file"), updateDocumentController);

export default router;
