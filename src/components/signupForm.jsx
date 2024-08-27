import { Button } from "./Button.jsx";
import { Input , PasswordInput } from "./input.jsx";
import { useState } from "react";
import { signupApi } from "../model/index.js";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [alert, setAlert] = useState(null);

  const validateUsername = (username) => {
    if (username.length < 3 || username.length > 30) {
      return "Username must be between 3 and 30 characters long.";
    }
    if (!/^[a-zA-Z0-9._]+$/.test(username)) {
      return "Username can only contain letters, numbers, periods, and underscores.";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 3 || password.length > 30) {
      return "Password must be between 3 and 30 characters long.";
    }
    if (!/^[a-zA-Z0-9._@$%!]+$/.test(password)) {
      return "Password can only contain letters, numbers, and the special characters . _ @ $ % !";
    }
    return "";
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  
    let error = "";
    if (name === 'username') {
      error = validateUsername(value);
    } else if (name === 'password') {
      error = validatePassword(value);
      const confirmError = validateConfirmPassword(value, formData.confirmPassword);
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: confirmError
      }));
    } else if (name === 'confirmPassword') {
      error = validateConfirmPassword(formData.password, value);
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);

    setErrors({
      username: usernameError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });

    if (!usernameError && !passwordError && !confirmPasswordError) {
      try {
        const response = await signupApi({
          username: formData.username,
          password: formData.password
        });
        if (response) {
         
          
          setAlert(<Alert severity="error">Username is already selected. Choose another username</Alert>);
        } else {
          setAlert(<Alert severity="success">Sign up was successful</Alert>);
          navigate("/SigninPage");
        }
      } catch (err) {
        console.error("Error during signup:", err);
        setAlert(<Alert severity="error">An error occurred during signup</Alert>);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="w-full p-8 md:p-0 max-w-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Sign up</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {alert && <div>{alert}</div>}
        <div>
          <Input
          required={true}
            onChangeHandler={handleChange}
            type="text"
            value={formData.username}
            name="username"
            id="username"
            placeholder="e.g. jane_doe123"
            label={"username"}
            error={!!errors.username}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>
        <div>
          <PasswordInput
          required={true}
            onChangeHandler={handleChange}
            type="password"
            name="password"
            id="password"
            value={formData.password}
            placeholder="Enter your password"
            label={"password"}
            error={!!errors.password}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div>
          <PasswordInput
          required={true}
            onChangeHandler={handleChange}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm your password"
            label={"confirm password"}
            error={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        
        <p className="text-center">
          Do you have an account? <a className="text-blue-700 cursor-pointer" onClick={()=>{ navigate("/SigninPage")}}>Sign in!</a>
        </p>

        <div>
          <Button
            type="submit"
            text="Sign up"
            disabled={!!errors.username || !!errors.password || !!errors.confirmPassword}
            style={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${(!!errors.username || !!errors.password || !!errors.confirmPassword) ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
      </form>
    </div>
  );
}