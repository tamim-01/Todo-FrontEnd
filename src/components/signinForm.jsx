import { Button } from "./Button.jsx";
import { Input , PasswordInput } from "./input.jsx";
import { useState } from "react";
import { signinApi } from "../model/index.js";
import Alert from '@mui/material/Alert';

export default function SigninForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
 
  const [alert, setAlert] = useState(<></>);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const newData = {
        ...prevData,
        [name.toString()]: value
      };
      console.log("Updated form data:", newData);
      return newData;
    });
  
   
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( formData.username && formData.password) {
      try {
      const response = await signinApi(formData);
      if(response){
        setAlert(<Alert severity="error">{response}</Alert>)

      }else{
        setAlert(<Alert severity="success">sign in was success full</Alert>)
      }
      
      } catch (err) {
        console.error("Error during signin:", err);
      }
    } else {
      console.log("Form validation failed");
    }
  };
  return (
    <div className="w-full p-8 md:p-0 max-w-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Sign in</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
        {alert}
        </div>
        <div>
          <Input
            onChangeHandler={handleChange}
            type="text"
            value={formData.username}
            name="username"
            id="username"
            
          />
        </div>
        <div>
          <PasswordInput
            onChangeHandler={handleChange}
            type="password"
            name="password"
            id="password"
            value={formData.password}
            placeholder="Enter your password"
            
          />
         
        </div>

        <p className="text-center">
          Don't have an account? <a href="#">Sign up!</a>
        </p>

        <div>
          <Button
            type="submit"
            text="Sign in"
            disabled={false}
            style={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            }`}
          />
        </div>
      </form>
    </div>
  );
}
