import React from 'react'
import { useNavigate } from 'react-router-dom';
import { withRouter, matchPath } from 'react-router-dom';
export default function LandingPage() {
  const navigate=useNavigate();
  if (window.location.pathname==='/' ) {
   
  return (
    <div style={{display: "flex",
    justifyContent: "center",
    alignItems: "center",}}>
        <div style={{  
  backgroundImage: "url(" + "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdXB3azYxOTExNzg4LXdpa2ltZWRpYS1pbWFnZS1rb3dqbDMzdy5qcGc.jpg" + ")",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width:'100%',height:'100vh'
}}>
  
<h1 style={{textAlign:"center", paddingTop:"11%", color:"#ffdd40"}}>Welcome to FastFood We are proud of our long history of making delicious meals, warm and friendly atmosphere and professional staff.</h1>
<h2 style={{textAlign:"center", paddingTop:"2%", color:"#ffdd40"}}>Are you Hungry! Check out our menu</h2>
<div style={{display: "flex",
    justifyContent: "center",
    alignItems: "center",}}>
<button onClick={()=>{navigate('/menu')}} 
className='btn btn-primary btn-lg'
style={{color:"#ffdd40",background:"#1f5156",borderColor:" #ffdd40"}} 
>MENU</button>
</div>
</div>
      
    </div>
  )}
  return null;
}
