import { Button } from "./Button.jsx";
import { Input } from "./input.jsx";
import { useState } from "react";
import axios from "axios";

export default function SigninForm({
}) {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios({
            method: "post",
            url: "/api/tasks/signup",
            data: {
              username: "user999",
              password: "jspoi0e0328r4",
              
            },
          });
     
        }catch(err){

        }};

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Sign in</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>

          <Input
            onChangeHandler={handleChange}
            type={"text"}
            stateValue={formData.username}
            name={"username"}
            placeholder={"e.g. jane_doe@gmail.com"}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <Input
            onChangeHandler={handleChange}
            type={"password"}
            name={"password"}
            stateValue={formData.password}
            placeholder={"Enter your password"}
          />
        </div>

        <div>
          <Button
            type={"submit"}
            text={"sign in"}
            style={
              "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }
          />
        </div>
      </form>
    </div>
  );
}
