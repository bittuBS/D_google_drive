import { useState } from "react";
import "./Display.css";

const Display = ({contract,account}) => {
const[data,setData]=useState("null")
    const getdata = async()=>{
let dataArray;
const otheraddress= document.querySelector(".address").value;
try{
if(otheraddress){
    dataArray= await contract.display(otheraddress);
    console.log(dataArray);
}
    else{
        dataArray=await contract.display(account);
        console.log(dataArray);
    }
}

catch(e){
    alert("you have not access");
    console.log("you have not access");
    
}
    const isEmpty= Object.keys(dataArray).length === 0;
    if(!isEmpty){
        const str= dataArray.toString();

        const str_array=str.split(",");
        console.log(str);
        console.log(str_array);
    
    const image= str_array.map((item,i)=>{
        return(
            <a href={item} key={i} >
                <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                alt="new"
                className="image_list"></img>
            </a>
        );
    });
    setData(image);
    }
    else{
        alert("no image is display");
    }

    };
    return (<>
        <div className="image-list">{data}</div>
        <input type="text" placeholder="Enter Address" className="address"></input>
        <button className="center button" onClick={getdata}>Get Data</button>
    </>
    );
};
export default Display;