import { useEffect } from "react";


const Modal = ({setModal, contract}) => {

const sharing=async()=>{
const address= document.querySelector(".address").value;
await contract.allow(address);
console.log("shared");
};
useEffect(()=>{
     const accessList=async()=>{
          const addressList= await contract.shareAccess();
          let select =document.querySelector("#selectNumber");
          const option = addressList;
          for(let i=0;i<option.length;i++){
               let opt =option[i];
               let e1= document.createElement("option");
               e1.textContent= opt;
               e1.value =opt;
               select.appendChild(e1);

          }

     };
     contract && accessList();
},[contract]);

     return(
     <>
<div className="modalBackgroud">
     <div className="modalContainer">
          <div className="title">share with</div>
          <div className="body">
               <input type="text" className="address" placeholder="Enter Address"></input>
          </div>
          <form id="myForm">
               <select id="selectNumber">
                    <option className="address">people with access</option>
               </select>
          </form>
          <div className="footer">
               <button onClick={()=>{
                    setModal(false);
               }}
               id ="cancelbtn">Cancel</button>
               <button onClick={()=>sharing()}>share</button>
          </div>
     </div>
</div>


     </>
     );
};
export default Modal;