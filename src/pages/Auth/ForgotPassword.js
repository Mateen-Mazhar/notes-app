import { Row, Col, Button, Input, Form, message } from "antd";
import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext, useAuthContext } from "../../Contexts/auth";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Config/firebase";

const ForgotPassword = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const [state, setState] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleChange =
    // e =>  setState({...state, [e.target.name]: e.target.value})
    (event) => {
      setState((previousState) => {
        return { ...previousState, [event.target.name]: event.target.value };
      });
    };

  const handleSumbit = (e) => {
    e.preventDefault();
    let { email } = state;
    if (!window.isEmail(email)) {
      return message.error("Email is not valid");
    }

    email = email.trim();

    const User = { email };

    setIsProcessing(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Signed in
        window.notify("Email sent successfully", "success");
        setTimeout(() => {
          Navigate("/auth/login");
        }, 10000);
      })
      .catch((error) => {
        window.notify("Soemthing went wring! Please try again ", "error");
        console.error(error);
        setIsProcessing(false);
        // ..
      });
  };

  return (
    <div className="auth p-3 p-md-4 p-lg-5">
      <div className="container">
        <div className="card p-3 p-md-4 p-lg-5">
          <h1 className="text-center text-dark mb-2">Forgot Password</h1>
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

              <Col className="w-100">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  onClick={handleSumbit}
                  
                >
                  Send Email
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
