import React, { useState } from "react";
import "./index.css";
import axios from "axios";
export default function Popup(props) {
  const [data, setdata] = useState({
    name: "",
    textarea: "",
  });

  function submit(e) {
    /* console.log(data); */
    props.setShow(false);
    e.preventDefault();
    axios
      .post(`https://61fd0f43f62e220017ce42d5.mockapi.io/comment`, {
        name: data.name,
        comment: data.textarea,
        Like: false,
      })
      .then((responce) => {
        props.apidata();
      });
  }
  function submitreply(e) {
    /* console.log(data); */
    props.setShow(false);
    e.preventDefault();
    axios
      .post(`https://61fd0f43f62e220017ce42d5.mockapi.io/replycomment`, {
      commentId : props.replyid,  
      name: data.name,
        comment: data.textarea,
        Like: false,
      })
      .then((responce) => {
        props.apidata();
      });
  }
  const commentdata = (e) => {
    const { name, value } = e.target;
    setdata((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="popup" /* onClick={() => props?.setShow(false)} */>
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
            <button id="closebtn" onClick={() => props?.setShow(false)}>
              Close
            </button>
            {console.log(props.replyid)}
            {props.replyid ? (
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
