import React, { useState, useEffect } from "react";
import "./index.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
      .get(`https://61fd0f43f62e220017ce42d5.mockapi.io/replycomment`)
      .then((response) => {
        setreplyData(response?.data);
      });
  };
  const Like = (id, status, table) => {
    axios
      .put(`https://61fd0f43f62e220017ce42d5.mockapi.io/${table}/${id}`, {
        Like: status,
      })
      .then((responce) => {
        apidata();
        replyapidata();
      });
  };
  const dataDelete = (id, table) => {
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
    return (
      <>
        {replydata
          .filter((filterreply) => filterreply.commentId === props.id)
          .map((comment, key) => {
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
                        onClick={() =>
                          Like(comment?.id, !comment?.Like, "replycomment")
                        }
                      >
                        <FavoriteIcon />
                      </span>
                    ) : (
                      <span
                        className="like"
                        onClick={() =>
                          Like(comment?.id, !comment?.Like, "replycomment")
                        }
                      >
                        <FavoriteBorderIcon />
                      </span>
                    )}
                    <span className="edit" onClick={() => dataedit(comment)}>
                      <ModeEditIcon />
                    </span>

                    <span
                      className="Delete"
                      onClick={() => dataDelete(comment.id, "replycomment")}
                    >
                      <DeleteIcon />
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
          replyapidata={replyapidata}
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
      <div className="addbtn">
        <button id="btn" onClick={() => showcomment()}>
          Create Comments
        </button>
      </div>
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
                    onClick={() => Like(comment?.id, !comment?.Like, "comment")}
                  >
                    <FavoriteIcon />
                  </span>
                ) : (
                  <span
                    className="like"
                    onClick={() => Like(comment?.id, !comment?.Like, "comment")}
                  >
                    <FavoriteBorderIcon />
                  </span>
                )}

                <span className="reply" onClick={() => addreply(comment.id)}>
                  <ReplyIcon />
                </span>
                <span className="edit" onClick={() => dataedit(comment)}>
                  <ModeEditIcon />
                </span>
                <span
                  className="Delete"
                  onClick={() => dataDelete(comment.id, "comment")}
                >
                  <DeleteIcon />
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
