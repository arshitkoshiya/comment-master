import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios"

export default function Reply(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    replyapidata();
   
  }, []);
  const replyapidata = () => {
    axios
      .get(`https://61fd0f43f62e220017ce42d5.mockapi.io/replycomment?comment-id=${props.id}`)
      .then((response) => {
        setData(response.data);
      });
  };
  const replyDelete = (id) => {
    if (
      window.confirm(
        `please condorm your id for deleting purpose  "Id" : "${id}"`
      )
    ) {
      axios
        .delete(`https://61fd0f43f62e220017ce42d5.mockapi.io/replycomment/${id}`)
        .then(() => {
          replyapidata();
        });
    }
  };
  
  return (
    <>
      {data.map((comment) => {
        return (
          <>
            <div className="replycard">
              <div className="name">
                <h4>{comment.name}</h4>
              </div>
              <hr />
              <div className="comment">{comment.comment}</div>
              <hr />
              <div className="buttons">
                {comment.Like ? (
                  <span className="like">Dislike </span>
                ) : (
                  <span className="like">Like </span>
                )}
                <span className="edit">Edit </span>
    
                <span className="Delete" onClick={() => replyDelete(comment.id)}>
                  Delete
                </span>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}