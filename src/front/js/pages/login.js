import React, { useContext, useState }from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {

	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");


	let navigate = useNavigate();


  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("El correo electrónico es invalido.");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    /*if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }*/

    return formIsValid;
  };

	const handleClick = (e) => {
		e.preventDefault();
    handleValidation();
		actions.login(email, password);
	};

  if (store.token && store.token != "" && store.token != undefined)navigate("/");
  return (
    <div className="Auth-form-container" id="login-div">
      <form className="Auth-form" onSubmit={handleClick}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Acceso</h3>
          {store.token && store.token != "" && store.token != undefined ? (
            store.token
          ) : (
            <>
              <div className="form-group mt-3">
                <label>Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  className="form-control mt-1"
                  placeholder="Introduce el correo electrónico"
                  autoComplete="off"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                 <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group mt-3">
                <label>Clave:</label>
                <div className="input-group">
                  <input
                  type='text'
                  id="password"
                  className="form-control"
                  placeholder="Introduce la contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary">Ingresar</button>
              </div>
            </>
          )}
        </div>
      </form>
      <hr className="my-4" />
        <Link to="/">
            <span className="btn btn-primary btn-lg" href="#" role="button">
                Back home
            </span>
        </Link>
    </div>
  );
};