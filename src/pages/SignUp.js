import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });

  const handleSubmit = async function (e) {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_SERVER}/api/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });
    const json = await response.json();
    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      setCredentials({});
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      navigate("/home");
    }
  };
  const onChange = function (values) {
    setCredentials({ ...credentials, [values.target.name]: values.target.value });
  };

  return (
    <div>
      <section className="vh-100" style={{ "background-color": "black", paddingTop: "20px" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ "border-radius": "25px", "background-color": "#eee" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="name"
                              value={credentials.name}
                              onChange={onChange}
                            />
                            <label className="form-label" for="form3Example1c">
                              Your Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                              value={credentials.email}
                              onChange={onChange}
                              style={{ border: "solid black 1px" }}
                            />
                            <label className="form-label" for="form3Example2c">
                              Your Email
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example3c"
                              className="form-control"
                              name="location"
                              value={credentials.location}
                              onChange={onChange}
                              style={{ border: "solid black 1px" }}
                            />
                            <label className="form-label" for="form3Example3c">
                              Your Address
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              name="password"
                              value={credentials.password}
                              onChange={onChange}
                              style={{ border: "solid black 1px" }}
                            />
                            <label className="form-label" for="form3Example4c">
                              Password
                            </label>
                          </div>
                        </div>

                        {/* <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" className="form-control"  name="repassword" value={credentials.repassword} onChange={onChange} style={{'border':"solid black 1px"}}/>
                      <label className="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div> */}

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg" style={{ "margin-right": "15%" }}>
                            Register
                          </button>
                          <Link to="/login" className="btn btn-primary btn-lg">
                            Login
                          </Link>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4"></div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
