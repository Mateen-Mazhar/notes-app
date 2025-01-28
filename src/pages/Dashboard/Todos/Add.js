import { Row, Col, Button, Input, Form } from "antd";
import React from "react";
import { useState } from "react";
import { firestore } from "../../../Config/firebase";
import { useNavigate } from "react-router-dom";
import "../../../Config/global";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuthContext } from "../../../Contexts/auth";

const Add = () => {
  const navigate = useNavigate();
  const {user} = useAuthContext();
 
  const [isProcessing, setIsProcessing] = useState(false);
  const [state, setState] = useState({
    title: "",
    location: "",
    description: "",
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

    let { title, location, description } = state;
    title = title.trim();
    if (title.length < 3) {
      return window.notify("Title must be at least 3 characters", "error");
    }

    location = location.trim();

    const todo = {
      uid: user.uid,
      id: window.RandomId(),
      title,
      location,
      description,
      status: "pending",
      createdAt: serverTimestamp(),
    };
    setIsProcessing(true);
    createDocument(todo);
   
  };

  const createDocument = async (todo) => {
    console.log("todo :>> ", todo);

    try {
      await setDoc(doc(firestore, "Todos", todo.id), todo);
      window.notify("Todo added successfully", "success");
      setIsProcessing(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      window.notify("Something went wrong while adding the Todo! ", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="auth p-3 p-md-4 p-lg-5">
      <div className="container">
        <div className="card p-3 p-md-4 p-lg-5">
          <h1 className="text-center text-dark">Add todo</h1>
          <Form layout="vertical">
            <Row>
              <Col span={24}>
                <Form.Item label="Title" required>
                  <Input
                    type="text"
                    name="title"
                    value={state.title}
                    placeholder="Enter todo title"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Location">
                  <Input
                    type="text"
                    name="location"
                    value={state.location}
                    placeholder="Enter todo location"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Description">
                  <Input.TextArea
                    size="large"
                    style={{ minHeight: "150px", resize: "none" }}
                    name="description"
                    value={state.description}
                    placeholder="Enter todo description"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>

            </Row>
             <Row gutter={10}>
             <Col span={12}>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={isProcessing}
                  onClick={handleSumbit}
                >
                  Add
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  
                  block
                  loading={isProcessing}
                  onClick={() => navigate("/dashboard/todos/all")}
                >
                  All todos
                </Button>
              </Col>
             </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Add;
