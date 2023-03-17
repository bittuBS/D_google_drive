import axios from "axios";
import { useState } from "react";
import"./FileUpload.css";


const FileUpload = ({account, contract, provider}) => {
    const[file,setFile]=useState(null);
    const [fileName,setfileName]=useState("not file set");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(file){
            try{
const formData = new FormData();
formData.append("file",file);
const resFile= await axios({
   method:"post",
   url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
   data: formData,
   headers: {
    pinata_api_key:`4f84faea89775825f0e4`,
    pinata_secret_api_key:`ef3d0b19e17a29b998c3a49ca3e3af5b20fb62448eb6967e7a87280edfcded7d`,
    "Content-Type":"multipart/form-data",

   } ,
});
const ImgHash =`ipfs://${resFile.data.IpfsHash}`;
const signer= contract.connect(provider.getSigner());

   signer.add(account,ImgHash);
alert("successfully image set");
setfileName("no image file selected");
setFile(null);
            }
            catch(e)
            {
                alert("unable to upload to pinata");
            }
        }

    };
    const retrieveFile=(e)=>{
const data=e.target.files[0];//files array of file object
console.log(data);
const reader =new window.FileReader();
reader.readAsArrayBuffer(data);
reader.onloadend=()=>{
    setFile(e.target.files[0]);
}
setfileName(e.target.files[0].name);
e.preventDefault();


    };
    return <div className="top">
        <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
            choose Image
        </label>
<input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile}></input>
<span className="textArea">Image: {fileName}</span>
<button type="submit" className="upload" disabled={!file}> Upload File</button>
        </form>
    </div>
}; 
export default FileUpload;