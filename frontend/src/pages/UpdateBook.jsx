import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSnackbar} from "notistack";

const UpdateBook = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const {id}=useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleSaveBook = () => {
    const data = {
      name,
      author,
      publishYear,
    };
    setLoading(true);
    axios
    .put(`http://localhost:5000/api/books/${id}`, data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar("Book Details Update Succesfully", { variant: "success" });
      navigate("/");
    })
    .catch((err) => {
      setLoading(false);
      enqueueSnackbar("An Error Occured", { variant: "error" });
      console.log(err);
    });
  };
  
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Update Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Published Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>Save Book</button>
      </div>
    </div>
  );
};

export default UpdateBook;
