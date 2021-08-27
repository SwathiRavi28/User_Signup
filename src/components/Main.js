import axios from 'axios';
import React, {useState,useEffect }from 'react';
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';
import swal from 'sweetalert';


function Main(props) {
  const [users, setUsers] = useState([])

  // GETTING USERS LIST
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASEURL}/api/users`)
            .then((res) => {
            if (res.status !== 200) {
                swal("Oops!","Something went wrong!!");
                return
            }
            setUsers(res.data);
            
          })
          .catch((err) => {
            swal("Oops!","Something went wrong!!");
        })
    }, [users])
  
  // DELETE THE ACCOUNT OF USER
    
    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BASEURL}/api/users/${id}`)
        .then((res) => {
          if (res.status == 200) {
            swal("Account Deleted!!");
           
          } else {
            swal("Oops!","Something went wrong!!")
        }
        })
        .catch((err) => {
          swal("Oops!","Something went wrong!!");
            
        })
        
  }

  //SENDING ACCOUNT ID TO EDIT THE ACCOUNT DETAILS OF USER

    const handleEdit = (id) => {
        props.history.push({
            pathname: '/signin',
            state: { id: id ,page:"edit"}
        });
         
  }
  
    return (
        <div className="container-table" >
          <h1>View Users</h1>
            <table >
    <thead>
      <tr>
        <th>FIRSTNAME</th>
        <th>LASTNAME</th>
        <th>ACTIONS</th>
      </tr>
    </thead>
    <tbody>
      {users.length > 0 ? (
        users.map((user) => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td >
            <i className="fa fa-pencil-square-o" style={{color:"#035397"}} onClick={()=>handleEdit(user.id)}></i>
            <i className="fa fa-trash" style={{color:"#035397"}} onClick={()=>handleDelete(user.id)}></i>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
  </div>
    )
}

export default Main
