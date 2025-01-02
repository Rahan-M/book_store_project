import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar} from "notistack";


const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  
  const handleDeleteBook = () => {
    setLoading(true);
    axios
    .delete(`http://localhost:5000/api/books/${id}`)
    .then(() => {
      setLoading(false);
      enqueueSnackbar("Book Deleted Succesfully", { variant: "success" });
      navigate("/");
    })
    .catch((err) => {
      setLoading(false);
      enqueueSnackbar("An Error Occured", { variant: "error" });
      console.log(err);
      alert("Some Error Occured, Please check console");
    });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 max-auto">
        <h3 className="text-2xl">Are You Sure You Want To Delete This Book</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
