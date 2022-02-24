import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Popup from "../Popup";
import Edit from "../Edit";

export default function Card() {
  const [show, setShow] = useState(false);
  const [editshow, setEditshow] = useState(false);
  const [commentdata, setCommentdata] = useState();
  const [data, setData] = useState([]);
  const [replydata, setreplyData] = useState([]);
  const [replyid, setreplyId] = useState();
  const [title, setTitle] = useState();
  useEffect(() => {
    apidata();
    replyapidata();
  }, []);
  const apidata = () => {
    axios
      .get("https://61fd0f43f62e220017ce42d5.mockapi.io/comment")
      .then((response) => {
        setData(response.data);
      });
  };
  const replyapidata = () => {
    axios
      .get(
        `https://61fd0f43f62e220017ce42d5.mockapi.io/replycomment`
      )
      .then((response) => {
        setreplyData(response?.data);
      });
  };
  const Like = (id, status,table) => {
    
    axios
      .put(`https://61fd0f43f62e220017ce42d5.mockapi.io/${table}/${id}`, {
        Like: status,
      })
      .then((responce) => {
        apidata();
        replyapidata();
      });
  };
  const dataDelete = (id,table) => {
    if (
      window.confirm(
        `please condorm your id for deleting purpose  "Id" : "${id}"`
      )
    ) {
      axios
        .delete(`https://61fd0f43f62e220017ce42d5.mockapi.io/${table}/${id}`)
        .then(() => {
          apidata();
          replyapidata();
        });
    }
  };
  const addreply = (id) => {
    setShow(true);
    setreplyId(id);
    setTitle("Reply Comments");
  };
  const showcomment = () => {
    setShow(true);
    setreplyId();
    setTitle("Add Comments");
  };
  const dataedit = (comment) => {
    setEditshow(true);
    setCommentdata(comment);
    setTitle("Edit Comment"); 
  };
  function Reply(props) {

    
    /* const Like = (id, status) => {
      console.log(id, status);
      axios
        .put(`https://61fd0f43f62e220017ce42d5.mockapi.io/replycomment/${id}`, {
          Like: status,
        })
        .then((responce) => {
          replyapidata();
        });
    };
    const replyDelete = (id) => {
      if (
        window.confirm(
          `please condorm your id for deleting purpose  "Id" : "${id}"`
        )
      ) {
        axios
          .delete(
            `https://61fd0f43f62e220017ce42d5.mockapi.io/replycomment/${id}`
          )
          .then(() => {
            replyapidata();
          });
      }
    }; */
  
    return (
      <>
        {replydata.filter((filterreply) => filterreply.commentId === props.id).map((comment, key) => {
          return (
            <div key={key}>
              <div className="replycard">
                <div className="name">
                  <h4>{comment?.name}</h4>
                </div>
                <hr />
                <div className="comment">{comment?.comment}</div>
                <hr />
                <div className="buttons">
                  {comment.Like ? (
                    <span
                      className="like"
                      onClick={() => Like(comment?.id, !comment?.Like,"replycomment")}
                    >
                      Dislike{" "}
                    </span>
                  ) : (
                    <span
                      className="like"
                      onClick={() => Like(comment?.id, !comment?.Like,"replycomment")}
                    >
                      Like{" "}
                    </span>
                  )}
                  <span className="edit" onClick={() => dataedit(comment)}>Edit </span>
  
                  <span
                    className="Delete"
                    onClick={() => dataDelete(comment.id,"replycomment")}
                  >
                    Delete
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  
  return (
    <>
      {show ? (
        <Popup
          title={title}
          replyid={replyid}
          apidata={apidata}
          setShow={setShow}
        />
      ) : null}
      {editshow ? (
        <Edit
          title={title}
          replyapidata={replyapidata}
          apidata={apidata}
          setEditshow={setEditshow}
          commentdata={commentdata}
        />
      ) : null}
      <button id="btn" onClick={() => showcomment()}>
        Create Comments
      </button>
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
                    onClick={() => Like(comment?.id, !comment?.Like,"comment")}
                  >
                    Dislike{" "}
                  </span>
                ) : (
                  <span
                    className="like"
                    onClick={() => Like(comment?.id, !comment?.Like,"comment")}
                  >
                    Like{" "}
                  </span>
                )}
                <span className="edit" onClick={() => dataedit(comment)}>
                  Edit{" "}
                </span>
                <span className="reply" onClick={() => addreply(comment.id)}>
                  Reply{" "}
                </span>
                <span className="Delete" onClick={() => dataDelete(comment.id,"comment")}>
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
