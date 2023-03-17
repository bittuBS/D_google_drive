 import Upload from "./artifacts/contracts/Upload.sol/upload.json";
import './App.css';
import { ethers } from "ethers";
import {useState, useEffect} from "react";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";

function App() {
  
    const[account,setAccount]=useState("");
    const[contract,setContract]=useState(null);
    const[provider,setProvider]=useState(null);
    const[modalOpen,setModal]=useState(false);
useEffect(()=>{
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const loadProvider=async()=>{
    if(provider){
      window.ethereum.on("chainChanged",()=>{
        window.location.reload();

      });
      window.ethereum.on("accountsChanged",()=>{
        window.location.reload();
      });
      await provider.send("eth_requestAccounts", []);
      const signer= provider.getSigner();
      const address= await signer.getAddress();
      setAccount(address);
      let contractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contract= new ethers.Contract(contractAddress,Upload.abi,signer);
      console.log(contract);
setContract(contract);
setProvider(provider);
    }
    else{ 
      console.error("metamask is not working");
    }
  };
  provider&& loadProvider();
},[]);


return (
<>
{!modalOpen&&(<button className="share" onClick={()=>setModal(true)}>share</button>)}
 {modalOpen &&(<Modal setModal={setModal} contract={contract}></Modal>)}
<div className="App">
<h1 style={{color:"black"}}>Gdrive 3.0</h1> 
<p style={{color:"black"}}>Account: {account ? account: "not connected"}</p>
<FileUpload account={account} provider={provider} contract={contract}></FileUpload>
<Display  contract={contract} account={account}></Display>
</div>
</>
);
}
export default App;
        