import React,{useState,useEffect} from 'react';
import './style.css';
import axios from 'axios';
import swal from 'sweetalert';
import 'font-awesome/css/font-awesome.min.css';

function SignIn(props) {
  const [emailval,setEmail]=useState("")
  const [fname, setFirstname] = useState("");
  const [lname, setLastname] = useState("");
  const [pwd, setPassword] = useState("");
  const [id, setId] = useState("");
  const [page, setPage] = useState("")
  const [passwordShown, setPasswordShown] = useState(false);

   
  useEffect(() => {
    setPage(props.location.state.page);
    if (props.location.state.page == "signup") {
      setEmail(props.location.state.email);
      
    } else {

      const id = props.location.state.id;
      setId(id);
      console.log(id)
      axios.get("https://testapi.webexcellis.in/api/users")
            .then((res) => {
                console.log("result",res);
            if (res.status !== 200) {
                swal("Oops!","Something went wrong!!");
                return
            }
              const users = res.data;
              for (let i = 0; i < users.length; i++){
                if (id == users[i].id) {
                  setFirstname(users[i].firstName);
                  setLastname(users[i].lastName);
                  setPassword(users[i].password);
                  setEmail(users[i].email)
                }
              }
            
          })
          .catch((err) => {
          console.log(err)
        })
   }
    

  },[])
  const togglePassword = () => {
    
    setPasswordShown(!passwordShown);
  };

  const handleClick = () => {
    swal("1)Password should contain numbers/alphabets\n2)No special characters \n3)Length should be minimum six");
    return
}
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!fname || !lname || !pwd || !emailval) {
      swal("please fill all values");
      return
    } else if (pwd.length < 6) {
      swal("Password should contain 6 characters");
      return  
    }
    const user = {
      "firstName": fname,
      "lastName": lname,
      "password": pwd,
      "email": emailval
    }
    
    if (page == "signup") {
      console.log("post req")
      axios.post("https://testapi.webexcellis.in/api/users/signUp", user)
        .then((res) => {
          if (res.status == 200) {
            swal("Account created!");
            props.history.push("/main");
          } else if (res.status == 400) {
            console.log(res)
            swal("verify password!!")
          } else {
            swal("Oops!","something went wrong")
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else {
    
      axios.put(`https://testapi.webexcellis.in/api/users/${id}`, user)
        .then((res) => {
          if (res.status == 200) {
            swal("Account Updated!");
            props.history.push("/main");
          } else {
            swal("Oops!","Something went wrong!!");
            
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

  
  }
  return (
      <div className="container">
      <div className="container-items">
        
            <h3> LET'S CREATE YOUR ACCOUNT</h3>
            <p>Email </p>
        <input type="text" name="email" value={emailval} />
        <div className="name-boxes">
        <div className="flex-lables">
          <p>First name </p>
          <input type="text" name="firstname" value={fname} onChange={(e)=>setFirstname(e.target.value) }/></div>
        <div className="flex-input">
       
          <p>Last name </p>
          <input type="text" name="lastname" value={lname} onChange={(e) => setLastname(e.target.value)} />
        </div>
        </div>
        <p>Password <i class="fa fa-question-circle" aria-hidden="true" onMouseOver={handleClick}></i></p>
         <div className="pass-wrapper"> <input type={passwordShown ? "text" : "password"} name="password" value={pwd} onChange={(e)=>setPassword(e.target.value)} />
         <i class="fa fa-eye" aria-hidden="true" onClick={togglePassword}></i></div>  
        <button onClick={handleSubmit}>NEXT</button>
          
      </div>
      </div>
    )
}

export default SignIn
