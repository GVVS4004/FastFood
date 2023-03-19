import React, { useState,useEffect,useReducer } from 'react'
// import Cart from '../components/Cart'
import { useNavigate } from 'react-router-dom';
import '../css/Contact.css'
export default function Contact() {
  // localStorage.getItem()
  const [contacts,setContacts]=useState([])
  const navigate=useNavigate();
  const onChange =function(values){
    setContacts({...contacts,[values.target.name]:values.target.value})
}
const submit =async (e)=>{
  e.preventDefault();
  const response = await fetch("http://localhost:5000/api/contacts",{
      method:'POST',
      headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify({Firstname:contacts.Firstname,Lastname:contacts.Lastname,email:contacts.email,description:contacts.description}),
  });
  const json= await response.json();
  // console.log(json);
  if (!json.success){
      alert("Enter valid credentials");
  }
  // console.log("hi")
  setContacts([]);

  navigate('/');

  }
  // const [, forceUpdate] = useReducer(x => x + 1, 0);
  // useEffect(()=>{forceUpdate()},[contacts]);

  return (


    <div className='container mt-5' style={{paddingTop:"30px", border:'1px solid #ffdd40'}}> 
    <div className="bg-contact bg-section" id="contact">
    <div className="container-fluid">
        <h1 className="container-h1" style={{alignItems:"center",paddingLeft:"43%"}}>Contact us</h1>
        <div className="row slideanim">
            <div className="col-md-6 col-sm-6 contact-left">
                <div className="left-box">
                    <div className="contact">
                        <span className="span-contact">Call:</span>
                        <br></br>
                        +91 9812919111
                        <br></br>
                        <span className="span-contact">Email:</span> 
                        <br></br>
                        fastfood@gmail.com
                        <br></br>
                        <span className="span-contact">Visit:</span>  
                        <br></br>
                        22, Northstreet Road
                        <br></br>
                        Hyderabad, Telangana
                        <br></br>
                        India
                    </div>
                </div>
            </div>

            <div className="col-md-6 col-sm-6 contact-right" >
                        
                        <form novalidate action="http://localhost:5000/api/contacts" method="POST" onSubmit={submit}>
                             <div className="form-group has-feedback">
                                <label className="sr-only">First name:</label>
                                <input type="text" name="Firstname" className="form-control" placeholder="First name" value={contacts.Firstname} required onChange={onChange}/>
                                
                            </div>
                             <div className="form-group has-feedback">
                                <label className="sr-only">Last name:</label>
                                <input type="text" name="Lastname" className="form-control" placeholder="Last name" value={contacts.Lastname} required onChange={onChange}/>
                                
                            </div>
                            <div className="form-group has-feedback">
                                <label className="sr-only">Email:</label>
                                <input type="email" name="email" className="form-control"  placeholder="Email" value={contacts.email} required onChange={onChange}/>
                                
                            </div>
                            <div className="form-group">
                                <label className="sr-only" name="comment" for="comment">Comment:</label>
                                <textarea className="form-control" rows="6" id="comment" name='description' value={contacts.description}placeholder="Description" onChange={onChange}></textarea>
                            </div>
                            <div className="contact-buttons pull-left">
                                <input type="submit" name="submit"  value="Send"  />
                            </div>
                        </form>
                        
            </div>
        </div>
        
    </div>    
</div>

</div>
  )
}
