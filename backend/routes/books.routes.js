import express from "express";
import {
  getAll,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/books.controllers.js";
const router = express.Router();
router.route("/").get(getAll).post(createBook);
router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);
export default router;
