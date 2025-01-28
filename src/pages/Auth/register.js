import { Row, Col, Button, Input, Form } from "antd";
import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../Config/firebase";
import { Link } from "react-router-dom";

import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [Isprocessing, setIsProcessing] = useState(false);
  const [state, setState] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    let { fullName, email, password, confirmPassword } = state;
    fullName = fullName.trim();
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();
    if (fullName.length < 3) {
      return window.notify("Full Name must be at least 3 characters", "error");
    }
    if (!window.isEmail(email)) {
      return window.notify("Invalid Email", "error");
    }
    if (password.length < 6) {
      return window.notify("Password must be at least 6 characters", "error");
    }
    if (confirmPassword !== password) {
      return window.notify("Confirm Passwrod doesn't match Password", "error");
    }
    const User = { fullName, email };
    setIsProcessing(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        createDocument({ ...User, uid: user.uid });
      })
      .catch((error) => {
        window.notify(
          "Something went wrong while creating the User! ",
          "error"
        );
        console.log(Isprocessing);
        console.error(error);
        setIsProcessing(false);
        // ..
      });
  };

  const createDocument = async (formData) => {
    try {
      await setDoc(doc(firestore, "users", formData.uid), formData);
      window.notify("User created successfully", "success");
      setIsProcessing(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      window.notify("Something went wrong while creating the User! ", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="auth p-3 p-md-4 p-lg-5">
      <div className="container">
        <div className="card p-3 p-md-4 p-lg-5">
          <h1 className="text-center text-dark">Register</h1>
          <Form layout="vertical">
            <Row>
              <Col span={24}>
                <Form.Item label="Full Name" required>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Enter your Full Name"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
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
              <Col span={24}>
                <Form.Item label="Confirm password" required>
                  <Input.Password
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>

              <div className="w-100 text-center mb-3">
                {" "}
                Already have an account?
                <Link to="/auth/login" style={{ color: "blue" }}>
                  Sign in
                </Link>
              </div>

              <Col className="w-100">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  onClick={handleSumbit}
                >
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
