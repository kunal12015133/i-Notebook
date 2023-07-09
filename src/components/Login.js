import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const host = "http://localhost:5000";
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        // console.log(e.target.email.value);
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email":e.target.email.value,
                "password":e.target.password.value
            })
          });

          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token' , json.authtoken);
            navigate("/");
            props.showAlert("Login successful","success");

          }
          else{
            props.showAlert("Invalid credentials","danger");

          }
    }
    return (
        <div>
            <h1 className='text-center'> Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>
        </div>
    )
}

export default Login
