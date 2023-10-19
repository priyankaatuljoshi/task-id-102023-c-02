import React, { useReducer, useState } from 'react';
export default function UserForm() {
    const init = {
      username: "",
      password: "",
      email: "",
    };
  
    const reducer = (state, action) => {
      switch (action.type) {
        case "update":
          return { ...state, [action.fld]: action.val };
        case "reset":
          return init;
        default:
          return state;
      }
    };
  
    const [info, dispatch] = useReducer(reducer, init);
  
    const [errors, setErrors] = useState({
      username: "",
      password: "",
      email: "",
    });
  
    const validateForm = () => {
      let valid = true;
      const newErrors = {
        username: "",
        password: "",
        email: "",
      };
  
      if (info.username.trim() === "") {
        newErrors.username = "Username is required";
        valid = false;
      }
  
      if (info.password.trim() === "") {
        newErrors.password = "Password is required";
        valid = false;
      }
  
      if (!info.email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
        newErrors.email = "Invalid email format";
        valid = false;
      }
  
      setErrors(newErrors);
      return valid;
    };
  
    const sendData = (e) => {
      e.preventDefault();
      if (validateForm()) {
        // Validation passed, send the data
        const reqOptions = {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(info),
        };
        fetch("http://localhost:4000/adduser", reqOptions)
          .then((resp) => {
            if (resp.status === 200) {
              // Success, you can navigate or show a success message
            } else {
              window.location.reload();
            }
          })
          .catch((e) => {
            console.log(e);
            window.location.reload();
          });
      }
    };
  
    return (
      <div>
        <form>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={info.username}
              onChange={(e) => dispatch({ type: "update", fld: "username", val: e.target.value })}
            />
            <span style={{ color: "red" }}>{errors.username}</span>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={info.password}
              onChange={(e) => dispatch({ type: "update", fld: "password", val: e.target.value })}
            />
            <span style={{ color: "red" }}>{errors.password}</span>
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={info.email}
              onChange={(e) => dispatch({ type: "update", fld: "email", val: e.target.value })}
            />
            <span style={{ color: "red" }}>{errors.email}</span>
          </div>
          <button type="submit" onClick={(e) => sendData(e)}>
            Submit
          </button>
        </form>
      </div>
    );
  }
  