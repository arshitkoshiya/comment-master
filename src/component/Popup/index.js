import React from "react";
import "./index.css";
export default function Popup() {
  return (
    <div className="popup">
      <div className="allcontent">
        <h1>Add Comment</h1>
        <hr /><br />
        <input
          type="text"
          name="name"
          id="text"
          placeholder="Enter Your Name"
        /><br /><br />
        <div className="textarea">
          <textarea
            name=""
            id=""
            cols="100"
            rows="20"
            placeholder="Enter New Comment Here..."
          ></textarea><br /><br />
          <div className="btn">
            <button id="closebtn">Close</button>
            <button id="submitbtn" type="">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
