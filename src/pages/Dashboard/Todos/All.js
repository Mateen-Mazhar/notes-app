import { Row, Col, Button, Space } from "antd";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { firestore } from "../../../Config/firebase";
import { useNavigate } from "react-router-dom";
import "../../../Config/global";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useAuthContext } from "../../../Contexts/auth";

const All = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [todos, setTodos] = useState([]);

  const handleUpdate = async (todo) => {
    const updatedData = { status: "completed", UpdatedAt: serverTimestamp() };
    try {
      await setDoc(doc(firestore, "Todos", todo.id), updatedData, {
        merge: true,
      });
      window.notify("Todo Updated successfully", "success");
    } catch (e) {
      console.error("Error adding document: ", e);
      window.notify("Something went wrong while Updating the Todo! ", "error");
    }
  };
  const handleDelete = async (todo) => {
    try {
      await deleteDoc(doc(firestore, "Todos", todo.id));
      window.notify("Todo deleted successfully", "success");
    } catch (error) {
      console.error(error);
      window.notify("Something went wrong while deleting the Todo! ", "error");
    }
  };



  const getTodos = useCallback(async () => {
    if (user.uid) {
      const q = query(
        collection(firestore, "Todos"),
        where("uid", "==", user.uid)
      );
      const array = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const document = doc.data();
        console.log("document :>> ", document);
        array.push(document);
      });
      setTodos(array);
    }
  }, [user.uid]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div className="container ">
      <main className="p-5 flex-column ">
        <Row className="all">
          <Col className="text-white text-center mb-4">
            <h1> All Todos</h1>
          </Col>

          <Col className="w-100">
            <table className="table table-hover table-info">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{todo.id}</td>
                      <td>{todo.imageURL}</td>
                      <td>{todo.title}</td>
                      <td>{todo.location}</td>
                      <td>{todo.description}</td>
                      <td className="text-capitalize">{todo.status}</td>
                      <td>
                        {
                          <Space>
                            <Button
                              type="primary"
                              size="small"
                              onClick={() => {
                                handleUpdate(todo);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              type="primary"
                              danger
                              size="small"
                              onClick={() => {
                                handleDelete(todo);
                              }}
                            >
                              Delete
                            </Button>
                          </Space>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
          <Col className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                navigate("/dashboard/todos/add");
              }}
            >
              Add Todo
            </Button>
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default All;
