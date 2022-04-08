import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import abi from "./utils/CryptoLinks.json";

const App = () => {
  const [inputMessage, setMessage] = useState("");
  const [inputLink, setLink] = useState("");

  const contractAddress = "0x3cC7F1594F8cc71297826b182aB28C4eE8814188";
  const contractABI = abi.abi;

  const post = async () => {}

  /*
  * This runs our function when the page loads.
  */

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        👋 My Crypto Links
        </div>

        <div className="intro">
           Post an article you read about crypto/blockchain every day and earn Ether! 
        </div>

        <input 
          type="text" 
          className="linkInput"
          placeholder="Input your crypto article link here..."
          value={inputLink}
          onChange={(e) => setLink(e.target.value)}
        />

        <textarea
          className="msgInput" 
          placeholder="Type your message here..."
          value={inputMessage}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="submitButton" onClick={post}>
          Post your link and message! 
        </button>

      </div>
    </div>
  );
}

export default App