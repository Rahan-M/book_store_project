import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5000/api/books/${id}`)
    .then((res) => {
      setBook(res.data.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
  },[]);
  const createdDate=new Date(book.createdAt);
  const crDatestr=`${createdDate.getDate()}/${createdDate.getMonth()}/${createdDate.getFullYear()}`;
  const updatedDate=new Date(book.createdAt);
  const upDatestr=`${createdDate.getDate()}/${createdDate.getMonth()}/${createdDate.getFullYear()}`;
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading? (
        <Spinner/>
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="m-4">
            <span className="text-xl mr-4 text-grey-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="m-4">
            <span className="text-xl mr-4 text-grey-500">Title</span>
            <span>{book.name}</span>
          </div>
          <div className="m-4">
            <span className="text-xl mr-4 text-grey-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="m-4">
            <span className="text-xl mr-4 text-grey-500">Published Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="m-4">
            <span className="text-xl mr-4 text-grey-500">Created At</span>
            <span>{crDatestr}</span>
          </div>
          <div className="m-4">
            <span className="text-xl mr-4 text-grey-500">Last Update</span>
            <span>{upDatestr}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
