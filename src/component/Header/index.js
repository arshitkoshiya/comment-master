import React from "react";
import "./index.css";
import Popup from "../Popup";

export default function Header() {
  /* function Createcomment(e){
  <Popup />
} */

  return (
    <>
      <div className="Header">
        <div className="title">
          <label htmlFor="">All Comments</label>
          <button id="btn" /* onClick={(e) => Createcomment(e)} */>
            Create Comments
          </button>
        </div>
      </div>
    </>
  );
}
