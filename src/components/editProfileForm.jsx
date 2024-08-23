import { Button } from "./Button.jsx";
import { Input, PasswordInput } from "./input.jsx";
import { useEffect, useState } from "react";
import { updateUserDataApi } from "../model/index.js";
import Alert from "@mui/material/Alert";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
export function EditProfileForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    selectedAvatar: "",
  });

  const handleAvatarClick = (avatarPath) => {
    setFormData((prevData) => ({ ...prevData, selectedAvatar: avatarPath }));
    console.log(formData);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode the JWT to get the payload
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        handleAvatarClick(decodedToken.avatar);
        setFormData((prevData) => ({
          ...prevData,
          username: decodedToken.username,
        }));

        console.log(formData);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.log("No token found");
    }
  }, []); // Empty dependency array to ensure it runs once

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
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
    if (password.length > 0 && (password.length < 3 || password.length > 30)) {
      return "Password must be between 3 and 30 characters long.";
    }
    if (password.length > 0 && !/^[a-zA-Z0-9._@$%!]+$/.test(password)) {
      return "Password can only contain letters, numbers, and the special characters . _ @ $ % !";
    }
    return "";
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password !== confirmPassword
    ) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    let error = "";
    if (name === "username") {
      error = validateUsername(value);
    } else if (name === "password") {
      error = validatePassword(value);
      const confirmError = validateConfirmPassword(
        value,
        formData.confirmPassword
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: confirmError,
      }));
    } else if (name === "confirmPassword") {
      error = validateConfirmPassword(formData.password, value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    setErrors({
      username: usernameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (
      !usernameError &&
      (!passwordError || formData.password.length === 0) &&
      (!confirmPasswordError || formData.password.length === 0)
    ) {
      try {
        const token = localStorage.getItem("token");
        const requestData = {};

        if (formData.username) {
          requestData.username = formData.username;
        }

        if (formData.password) {
          requestData.password = formData.password;
        }

        if (formData.selectedAvatar) {
          requestData.avatar_src = formData.selectedAvatar;
        }

        const response = await updateUserDataApi(requestData, token);

        if (response) {
          setAlert(<Alert severity="error">{response}</Alert>);
        } else {
          setAlert(
            <Alert severity="success">
              your changes submitted successfully
            </Alert>
          );
          navigate("/SigninPage");
        }
      } catch (err) {
        console.error("Error during update:", err);
        setAlert(
          <Alert severity="error">An error occurred during update</Alert>
        );
      }
    } else {
      console.log("Form validation failed");
    }
  };
  return (
    <>
      <div className="bg-white flex flex-col lg:flex-row justify-evenly rounded-lg shadow-md p-8 space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="flex flex-col items-center">
          {/* Large Avatar */}
          <div className="bg-gray-300 rounded-full h-32 w-32 sm:h-40 sm:w-40 mb-4">
            <img
              src={formData.selectedAvatar}
              alt="Selected Avatar"
              className="h-full w-full rounded-full"
            />
          </div>
          {/* Smaller Avatars */}
          <div className="grid grid-cols-3 gap-4">
            <div onClick={() => handleAvatarClick("/avatars/1.jpg")}>
              <img
                className="rounded-full h-10 w-10 sm:h-12 sm:w-12 cursor-pointer"
                src={"/avatars/1.jpg"}
                alt="Avatar 1"
              />
            </div>
            <div onClick={() => handleAvatarClick("/avatars/2.jpg")}>
              <img
                className="rounded-full h-10 w-10 sm:h-12 sm:w-12 cursor-pointer"
                src={"/avatars/2.jpg"}
                alt="Avatar 2"
              />
            </div>
            <div onClick={() => handleAvatarClick("/avatars/3.jpg")}>
              <img
                className="rounded-full h-10 w-10 sm:h-12 sm:w-12 cursor-pointer"
                src={"/avatars/3.jpg"}
                alt="Avatar 3"
              />
            </div>
            <div onClick={() => handleAvatarClick("/avatars/4.jpg")}>
              <img
                className="rounded-full h-10 w-10 sm:h-12 sm:w-12 cursor-pointer"
                src={"/avatars/4.jpg"}
                alt="Avatar 4"
              />
            </div>
            <div onClick={() => handleAvatarClick("/avatars/5.jpg")}>
              <img
                className="rounded-full h-10 w-10 sm:h-12 sm:w-12 cursor-pointer"
                src={"/avatars/5.jpg"}
                alt="Avatar 5"
              />
            </div>
            <div onClick={() => handleAvatarClick("/avatars/6.jpg")}>
              <img
                className="rounded-full h-10 w-10 sm:h-12 sm:w-12 cursor-pointer"
                src={"/avatars/6.jpg"}
                alt="Avatar 6"
              />
            </div>
          </div>
        </div>

        <div className="w-full p-8 md:p-0 max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {alert && <div>{alert}</div>}
            <div>
              <Input
                required={false}
                onChangeHandler={handleChange}
                type="text"
                value={formData.username}
                name="New username"
                id="username"
                placeholder="e.g. jane_doe123"
                error={!!errors.username}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <PasswordInput
                required={false}
                onChangeHandler={handleChange}
                type="password"
                name="New password"
                id="password"
                value={formData.password}
                placeholder="Enter your New password"
                error={!!errors.password}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <PasswordInput
                required={formData.password.length > 0}
                onChangeHandler={handleChange}
                type="password"
                name="Confirm Password"
                id="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm your password"
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex flex-row">
              <Button
                type="submit"
                text="Confirm"
                disabled={
                  !!errors.username ||
                  (!!errors.password && formData.password.length > 0) ||
                  (!!errors.confirmPassword && formData.password.length > 0)
                }
                style={`w-1/2 mr-2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                ${
                                  !!errors.username ||
                                  (!!errors.password &&
                                    formData.password.length > 0) ||
                                  (!!errors.confirmPassword &&
                                    formData.password.length > 0)
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
              />
              <Button
                type={"reset"}
                style=" w-1/2 ml-2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClickHandler={() => {
                  navigate("/taskmanager");
                }}
                text={"Cancel"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
