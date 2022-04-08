import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import abi from "./utils/CryptoLinks.json";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [inputMessage, setMessage] = useState("");
  const [inputLink, setLink] = useState("");

  const contractAddress = "0x3cC7F1594F8cc71297826b182aB28C4eE8814188";
  const contractABI = abi.abi;

  // const getAllWaves = async () => {
  //   try {
  //     const { ethereum } = window;
  //     if (ethereum) {
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();
  //       const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

  //       /*
  //        * Call the getAllWaves method from your Smart Contract
  //        */
  //       const waves = await wavePortalContract.getAllWaves();

  //       /*
  //        * We only need address, timestamp, and message in our UI so let's
  //        * pick those out
  //        */
  //       let wavesCleaned = [];
  //       waves.forEach(wave => {
  //         wavesCleaned.push({
  //           address: wave.waver,
  //           timestamp: new Date(wave.timestamp * 1000),
  //           message: wave.message
  //         });
  //       });

  //       /*
  //        * Store our data in React State
  //        */
  //       setAllWaves(wavesCleaned);
  //     } else {
  //       console.log("Ethereum object doesn't exist!")
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
        getAllWaves()
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

//   const post = async () => {
//     try {
//       const { ethereum } = window;

//       if (ethereum) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        
//         let count = await wavePortalContract.getTotalWaves();
//         console.log("Retrieved total wave count...", count.toNumber());
//         setCount(count.toNumber());
        
//         /*
//         * Execute the actual wave from your smart contract
//         */
//         const waveTxn = await wavePortalContract.wave(inputMessage, { gasLimit: 300000 });
//         console.log("Mining...", waveTxn.hash);
//         setStatus("loading")

//         await waveTxn.wait();
//         console.log("Mined -- ", waveTxn.hash);
//         setStatus("finished")
//         window.location.reload();

//         count = await wavePortalContract.getTotalWaves();
//         console.log("Retrieved total wave count...", count.toNumber());
//         setCount(count.toNumber());
//       } else {
//         console.log("Ethereum object doesn't exist!");
//       }
//     } catch (error) {
//       console.log(error);
//     }
// }

  /*
  * This runs our function when the page loads.
  */
  useEffect(() => {
  checkIfWalletIsConnected();
  // let wavePortalContract;

  // const onNewWave = (from, timestamp, message) => {
  //   console.log("NewWave", from, timestamp, message);
  //   setAllWaves(prevState => [
  //     ...prevState,
  //     {
  //       address: from,
  //       timestamp: new Date(timestamp * 1000),
  //       message: message,
  //     },
  //   ]);
  // };

  // if (window.ethereum) {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();

  //   wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
  //   wavePortalContract.on("NewWave", onNewWave);
  // }

  // return () => {
  //   if (wavePortalContract) {
  //     wavePortalContract.off("NewWave", onNewWave);
  //   }
  // };
  }, [])

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

        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        {count !== 0 && (
          <div className="waveCount">
            Current wave count: {count}
          </div>
        )}
        {status == "loading" && (
          <div className="loadingMsg">Your wave is being mined...</div>    
        )}
        {status == "finished" && (
          <div className="loadingMsg">Thank you for waving!</div>    
        )}

        {allWaves.map((wave, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}
      </div>
    </div>
  );
}

export default App