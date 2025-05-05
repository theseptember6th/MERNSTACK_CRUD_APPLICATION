import React from "react";
import "./update.css"
import { Link,useNavigate,useParams} from "react-router-dom";
import { useState } from "react";
import axios  from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

const UpdateUser = () => {
    const users={
        name:"",
        email:"",
        address:"",
    };
    const [user,setUser]=useState(users);
    const navigate =useNavigate();
    const {id}=useParams();


    const inputHandler=(e)=>{
        const {name,value}= e.target;
        console.log(name,value)
        
        setUser({...user,[name]:value});
    }
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${id}`)
        .then((response)=>{
            setUser(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[id]);

    const submitForm=async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/user/${id}`,user)
        .then((response)=>{
            toast.success(response.data.message,{position:"top-right"})
            navigate("/");
        })
        .catch((error)=>{
            console.log(error)
        })
    }
  return (
    <div className="addUser">
        <Link to="/" type="button" class="btn btn-secondary"><i class="fa-solid fa-backward"></i> Back</Link>
      <h3> Update User</h3>
      <form action="" className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter your name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter your email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address:</label>
          <input
            type="address"
            name="address"
            id="address"
            value={user.address}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter your name"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
