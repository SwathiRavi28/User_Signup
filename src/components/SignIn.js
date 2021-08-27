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
   
    // IF ITS COMING FROM FIRSTPAGE WILL SHOW THE TYPED EMAIL.REST OF THE ATTRIBUTES WILL BE EMPTY.
    if (props.location.state.page == "signup") {
      setEmail(props.location.state.email);
      
    } else {
    //IF ITS AN UPDATE REQUEST,EXITING VALUES WILL BE POPULATED.
      const id = props.location.state.id;
      setId(id);
      axios.get(`${process.env.REACT_APP_BASEURL}/api/users`)
            .then((res) => {
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
            swal("Oops!","Something went wrong!!");
            
        })
   }
    

  },[])
   
  // PASSWORD TOGGLE ICON FOR VISIBILITY

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // TO SHOW THE PWD CONSTRAINTS

  const handleClick = () => {
    swal("1)Password should contain numbers/alphabets\n2)No special characters \n3)Length should be minimum six");
    return
  }
  
  // SUBMIT VALUES TO CREATE ACCOUNT

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
      
      axios.post(`${process.env.REACT_APP_BASEURL}/api/users/signUp`, user)
        .then((res) => {
          if (res.status == 200) {
            swal("Account created!");
            props.history.push("/main");
          } else if (res.status == 400) {
            swal("verify password!!")
          } else {
            swal("Oops!","something went wrong")
          }
        })
        .catch((err) => {
          swal("Oops!","Something went wrong!!");
            
        })
    }
    else {

    // TO UPDATE THE EXISTING USER
      axios.put(`${process.env.REACT_APP_BASEURL}/api/users/${id}`, user)
        .then((res) => {
          if (res.status == 200) {
            swal("Account Updated!");
            props.history.push("/main");
          } else {
            swal("Oops!","Something went wrong!!");
            
          }
        })
        .catch((err) => {
          swal("Oops!","Something went wrong!!");
        })
    }

  
  }
  return (
      <div className="container">
      <div className="container-items">
        <h3> LET'S CREATE YOUR ACCOUNT</h3>
        <p>Email </p>
        <input className="email-tag" type="text" name="email" value={emailval} />
        <div className="name-boxes">
        <div className="flex-item">
        <p>First name </p>
        <input type="text" name="firstname" value={fname} onChange={(e)=>setFirstname(e.target.value) }/></div>
        <div className="flex-item">
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
