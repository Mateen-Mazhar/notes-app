import { Row, Col, Button, Input, Form, message } from "antd";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/firebase";
import Screenloader from "../../components/screenloader";

const Login = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange =
    // e =>  setState({...state, [e.target.name]: e.target.value})
    (event) => {
      setState((previousState) => {
        return { ...previousState, [event.target.name]: event.target.value };
      });
    };

  const handleSumbit = (e) => {
    e.preventDefault();
    let { email, password } = state;
    if (!window.isEmail(email)) {
      return message.error("Email is not valid");
    }
    if (password.length < 6) {
      return message.error("Password must be at least 6 characters");
    }

    email = email.trim();
    password = password.trim();

    setIsProcessing(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.notify("User logged in successfully", "success");
      })
      .catch((error) => {
        window.notify("User not found! ", "error");
        console.error(error);
      })
      .finally(() => {
        setIsProcessing(false);
      });

    // ..
  };

  return (
    <>
      {isProcessing ? <Screenloader /> : null}
      <div className="auth p-3 p-md-4 p-lg-5">
        <div className="container">
          <div className="card p-3 p-md-4 p-lg-5">
            <h1 className="text-center text-dark">Login</h1>
            <Form layout="vertical">
              <Row>
                <Col span={24}>
                  <Form.Item label="Email" required>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Password" required>
                    <Input.Password
                      name="password"
                      placeholder="Enter your Password"
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
                <div className="text-center w-100 mb-3">
                  Don't have an account?
                  <Link to="/auth/register" style={{ color: "blue" }}>
                    Sign up
                  </Link>
                </div>
                <Col className="w-100">
                  <Button
                    type="primary"
                    block
                    htmlType="submit"
                    onClick={handleSumbit}
                  >
                    Login
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
