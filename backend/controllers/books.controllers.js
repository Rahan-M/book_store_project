import mongoose from "mongoose";
import Book from "../models/bookModel.js";

const getAll = async (req, res) => {
  try {
    const Books = await Book.find({});
    res.status(200).json({ success: true, count: Books.length, data: Books });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, msg: "Please provide id" });
    }
    const book = await Book.findById(id);
    if(!book){
        return res.status(400).json({success:false,msg:"Book not found"})
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const createBook = async (req, res) => {
  try {
    if (!req.body.name || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .json({ success: false, msg: "Please provide all fields" });
    }
    const newBook = await Book.create(req.body);
    res.status(200).json({ success: true, msg: "Book created", data: newBook });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, msg: "Please provide id" });
    }
    if (!(req.body.name || req.body.author || req.body.publishYear)) {
      return res
        .status(400)
        .json({ success: false, msg: "Please provide any one field" });
    }
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, msg: "Please provide id" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, msg: "Enter Valid ID" });
    }
    const deletedBook = await Book.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: deletedBook });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export { getAll, getBook, createBook, updateBook, deleteBook };
