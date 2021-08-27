import React,{useState} from 'react';
import './style.css';
import swal from 'sweetalert';


function FirstPage(props) {
  const [email, setEmail] = useState("");
  const handleClick = (event) => {
    event.preventDefault()
    if (!/\S+@\S+\.\S+/.test(email)){
      swal("Enter valid email")
return
    }
    props.history.push({
      pathname: '/signin',
      state: { email: email,page:"signup" }
  });
  }

  return (
      <div className="container">
      <div className="container-items">
       
          <h3>ENTER YOUR EMAIL</h3>
          <p> Email</p>
          <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} />
          <button onClick={handleClick}>NEXT</button>
        </div> 
     </div>
     
    )
}

export default FirstPage