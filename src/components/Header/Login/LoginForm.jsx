import React from "react";
import { useState } from "react";
import { API_URL, API_KEY_3, fetchApi } from "../../../api/api";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [errors, setErros] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value)
    switch (name) {
      case 'username': 
        setUsername(value)
        break
      case 'password':
        setPassword(value)
        break
      default:
        break
    }
    setErros({
      ...errors,
      base: null,
      [name]: null
    });
  };

  const validateFields = () => {
    const errors = {};

    if (username === "") {
      errors.username = "Not empty";
    }

    return errors;
  };

  const handleBlur = () => {
    const newErrors = validateFields();
    if (Object.keys(errors).length > 0) {
      setErros({...errors, ...newErrors});
    }
  };

  const onSubmit = () => {
    setSubmitting(true);
    fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              username: username,
              password: password,
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        props.updateSessionId(data.session_id);
        return fetchApi(
          `${API_URL}/account?api_key=${API_KEY_3}&session_id=${
            data.session_id
          }`
        );
      })
      .then(user => {
        props.updateUser(user);
        setSubmitting(false)
      })
      .catch(error => {
        setSubmitting(false);
        setErros({base: error.status_message});
      });
  };

  const onLogin = e => {
    e.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErros({...errors, ...newErrors});
    } else {
      onSubmit();
    }
  };

  return (
    <div className="form-login-container">
      <form className="form-login">
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Авторизация
        </h1>
        <div className="form-group">
          <label htmlFor="username">Пользователь</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Пользователь"
            name="username"
            value={username}
            onChange={onChange}
            onBlur={handleBlur}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Пароль"
            name="password"
            value={password}
            onChange={onChange}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-primary btn-block"
          onClick={onLogin}
          disabled={submitting}
        >
          Вход
        </button>
        {errors.base && (
          <div className="invalid-feedback text-center">{errors.base}</div>
        )}
      </form>
    </div>
  );
} 

export default LoginForm;