import { useRef, useState } from "react"

import { IoCloseSharp } from "react-icons/io5";



export default function App() {

  let nameInput = useRef();
  let priceInput = useRef();
  let qtyInput = useRef();
 const[editPhoneIndex,setEditPhoneIndex] = useState();
 const[phones,setPhones] = useState([
  {name : "iphone x",price : 400,qty : 2},
  {name : "iphone 11",price : 500,qty : 5},
  {name : "iphone 12",price : 600,qty : 4},
  {name : "iphone 13",price : 700,qty : 3},
 ]);

 const[phoneModal,setPhoneModal] = useState(false);

 const removePhone = (index) => {
  let isConfirm = confirm("are you sure you want to remove this item?");
  if(isConfirm){
   let copy = [...phones];
    copy.splice(index,1);
    setPhones(copy);
  }

 }

 const addNewPhone = () => {
   let newValue = {
    name : nameInput.current.value,
    price : priceInput.current.value,
    qty : qtyInput.current.value,
   };

   let copy = [...phones];
   copy.push(newValue);
   setPhones(copy);
   confirm("add New phone items?");
   setPhoneModal(false);
 }  

 const openModal = (index) => {
   setEditPhoneIndex(index);
   document.getElementById('my_modal_1').showModal();
   let oldData = phones[index]
   console.log(oldData);
   nameInput.current.value = oldData.name;
   priceInput.current.value = oldData.price;
   qtyInput.current.value = oldData.qty;
 }

 const saveDataPhone = () => { 
    let newPhoneData = {
    name : nameInput.current.value,
    price : priceInput.current.value,
    qty : qtyInput.current.value,
   };

   console.log('I Edit phone Index : ' + editPhoneIndex);
   let copy = [...phones];
   copy[editPhoneIndex] = newPhoneData;
   setPhones(copy);
   confirm("Are You Edit New Phone?");
   document.getElementById('my_modal_1').close();
 }




  return (
    <div className="w-full h-dvh flex justify-center bg-amber-50">
      
      <div className="container  flex flex-col mt-[50px]">
        <h1 className="text-4xl text-red-600 font-bold text-center mb-20">Phones Store</h1>
        <div className="mt-10 ml-10 flex justify-between">
          <button className="btn btn-primary font-bold text-[20px]" onClick={() => setPhoneModal(true)}>Add New Phone</button>
          <button className="btn btn-primary text-[20px]" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box flex flex-col gap-3 bg-gray-800">
              <div className="flex justify-between">
                 <h1 className="text-xl text-white">Edit Phone</h1>
                 <IoCloseSharp className="text-2xl bg-red-600 text-white rounded cursor-pointer" onClick={() => document.getElementById('my_modal_1').close()}/>
               </div>
               <input ref={nameInput} className="input w-full text-[18px] bg-gray-700 text-white outline-0 border-0" type="text" placeholder="Enter phone Name"/>
                <input ref={priceInput} className="input w-full text-[18px] bg-gray-700 text-white outline-0 border-0" type="number" placeholder="Enter phone Price"/>
                <input ref={qtyInput} className="input w-full text-[18px] bg-gray-700 text-white outline-0 border-0" type="number" placeholder="Enter phone Qty"/>
                <button className="btn btn-primary w-full text-xl" onClick={saveDataPhone}>Save</button>
            </div>
         </dialog>
        </div>
        
          <table className="table mt-20 ml-20">
          <thead>
            <tr className="text-2xl text-red-600">
              <th>#id</th>
              <th>name item</th>
              <th>price item</th>
              <th>qty item</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
            {
              phones.map((el,index) => {
                return (
                  <tr key={index} className=" text-xl font-bold">
                    <td>{index + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.price}</td>
                    <td>{el.qty}</td>
                    <td>{el.qty * el.price}</td>
                    <td>
                      <div className="flex justify-center gap-3">
                        <button className="btn btn-warning font-bold" onClick={() => openModal(index)}>Edit</button>
                        <button className="btn btn-error font-bold" onClick={() => removePhone(index)}>Remove</button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
      </table>
      </div>

      { 
        phoneModal? (
        <div onClick={() => setPhoneModal(false)} className="w-full h-dvh bg-gray-900/80 fixed top-0 left-0 flex justify-center items-center">
         <div onClick={(event) => event.stopPropagation()} className="w-[500px] bg-gray-800 p-5 flex flex-col gap-3">
           <h1 className="text-white text-xl">Add New Phone Information</h1>
           <input ref={nameInput} className="input w-full text-[18px] bg-gray-700 text-white outline-0 border-0" type="text" placeholder="Enter phone Name"/>
           <input ref={priceInput} className="input w-full text-[18px] bg-gray-700 text-white outline-0 border-0" type="number" placeholder="Enter phone Price"/>
           <input ref={qtyInput} className="input w-full text-[18px] bg-gray-700 text-white outline-0 border-0" type="number" placeholder="Enter phone Qty"/>
           <button onClick={addNewPhone} className="btn btn-primary w-full text-xl">Submit</button>
         </div>
      </div>
        ): null};
    </div>
  )

}
