import React, { useState } from "react";
import "./index.css";
import axios from "axios";
export default function Popup(props) {
  const [data, setdata] = useState({
    name: props.commentdata.name,
    textarea: props.commentdata.comment,
  });

  function submit(e) {
    /* console.log(data); */
    props.setEditshow(false);
    e.preventDefault();
    axios
      .put(
        `https://61fd0f43f62e220017ce42d5.mockapi.io/comment/${props.commentdata.id}`,
        {
          name: data.name,
          comment: data.textarea,
          Like: props.commentdata.Like,
        }
      )
      .then((responce) => {
        props.apidata();
      });
  }
  function submitreply(e) {
    props.setEditshow(false);
    e.preventDefault();
    axios
      .put(`https://61fd0f43f62e220017ce42d5.mockapi.io/replycomment/${props.commentdata.id}`, {
        commentId: props.commentdata.commentId,
        name: data.name,
        comment: data.textarea,
        Like: props.commentdata.Like,
      })
      .then((responce) => {
        props.apidata();
        props.replyapidata();
      });
  }
  const commentdata = (e) => {
    const { name, value } = e.target;
    setdata((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="popup" /* onClick={() => props?.setEditshow(false)} */>
      <div className="allcontent">
        <h1>{props.title}</h1>
        <hr />
        <br />
        <input
          onChange={commentdata}
          value={data.name}
          type="text"
          name="name"
          id="text"
          required
          placeholder="Enter Your Name"
          autoComplete="off"
        />
        <br />
        <br />
        <div className="textarea">
          <textarea
            onChange={commentdata}
            value={data.textarea}
            name="textarea"
            id=""
            cols="100"
            rows="20"
            placeholder="Enter New Comment Here..."
            required
          ></textarea>
          <br />
          <br />
          <div className="btn">
            <button id="closebtn" onClick={() => props?.setEditshow(false)}>
              Close
            </button>
            {props.commentdata?.commentId ? (
              <button
                id="submitbtn"
                type="button"
                onClick={(e) => submitreply(e)}
              >
                Submit Reply
              </button>
            ) : (
              <button id="submitbtn" type="button" onClick={(e) => submit(e)}>
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
