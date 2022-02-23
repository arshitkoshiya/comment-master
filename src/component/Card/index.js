import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Reply from "../reply";
import Popup from "../Popup";

export default function Card() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [replyid, setreplyId] = useState();
  const [title, setTitle] = useState();
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
  const Like = (id, status) => {
    console.log(id, status);
    axios
      .put(`https://61fd0f43f62e220017ce42d5.mockapi.io/comment/${id}`, {
        Like: status,
      })
      .then((responce) => {
        apidata();
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
 const addreply = (id) => {
   setShow(true)
   setreplyId(id)
   setTitle("Reply Comments")
 }
 const showcomment=()=>{
  setShow(true)
  setreplyId()
  setTitle("Add Comments")
 }
const dataedit = () => {
}
  return (
    <>
      <button id="btn" onClick={() => showcomment()}>
        Create Comments
      </button>
      {show ? <Popup title={title} replyid={replyid} apidata={apidata} setShow={setShow} /> : null}
      {data.map((comment, key) => {
        return (
          <div key={key}>
            <div className="card" key={key}>
              <div className="name">
                <h4>{comment.name}</h4>
              </div>
              <hr />
              <div className="comment">{comment.comment}</div>
              <hr />
              <div className="button">
                {comment.Like ? (
                  <span
                    className="like"
                    onClick={() => Like(comment?.id, !comment?.Like)}
                  >
                    Dislike{" "}
                  </span>
                ) : (
                  <span
                    className="like"
                    onClick={() => Like(comment?.id, !comment?.Like)}
                  >
                    Like{" "}
                  </span>
                )}
                <span
                  className="edit"  onClick={() => dataedit(comment.id)}
                >
                  Edit{" "}
                </span>
                <span className="reply" onClick={() => addreply(comment.id)}>
                  Reply{" "}
                </span>
                <span className="Delete" onClick={() => dataDelete(comment.id)}>
                  Delete
                </span>
              </div>
            </div>
            <Reply id={comment.id} />
          </div>
        );
      })}
    </>
  );
}
