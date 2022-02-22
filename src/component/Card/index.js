import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Reply from '../reply'

export default function Card() {
  const [data, setData] = useState([]);
  useEffect(() => {
    apidata();
   
  }, []);
  const apidata = () => {
    axios
      .get("https://61fd0f43f62e220017ce42d5.mockapi.io/comment")
      .then((response) => {
        setData(response.data);
      });
  };
  const dataDelete = (id) => {
    if (
      window.confirm(
        `please condorm your id for deleting purpose  "Id" : "${id}"`
      )
    ) {
      axios
        .delete(`https://61fd0f43f62e220017ce42d5.mockapi.io/comment/${id}`)
        .then(() => {
          apidata();
        });
    }
  };
  
  return (
    <>
      {data.map((comment) => {
        return (
          <>
            <div className="card">
              <div className="name">
                <h4>{comment.name}</h4>
              </div>
              <hr />
              <div className="comment">{comment.comment}</div>
              <hr />
              <div className="button">
                {comment.Like ? (
                  <span className="like">Dislike </span>
                ) : (
                  <span className="like">Like </span>
                )}
                <span className="edit">Edit </span>
                <span className="reply">Reply </span>
                <span className="Delete" onClick={() => dataDelete(comment.id)}>
                  Delete
                </span>
              </div>
            </div>
            <Reply id={comment.id} />
          </>
        );
      })}
    </>
  );
}