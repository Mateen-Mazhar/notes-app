// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { doc, setDoc } from "firebase/firestore";
// import { firestore } from "../../Config/firebase";
// import { useNotesContext } from "../../Contexts/notes";
// import { useAuthContext } from "../../Contexts/auth";
// const CreateNote = () => {
//   const { notes, setNotes } = useNotesContext();
//   const { user } = useAuthContext();
//   const [state, setState] = useState({
//     title: "",
//     subject: "",
//     description: "",
//   });

//   const handleChange = (event) => {
//     setState((previousState) => {
//       return { ...previousState, [event.target.name]: event.target.value };
//     });
//   };

//   const handleSaveNote = async () => {
//     let { title, subject, description } = state;
//     title = title.trim();
//     if (title.length < 3) {
//       return window.notify("Title must be at least 3 characters", "error");
//     }
//     let newNote = {
//       title,
//       subject,
//       description,
//       uid: user.uid,
//       id: window.RandomId(),
//       savedAt: new Date().toISOString(),
//     };
//     try {
//       await setDoc(doc(firestore, "Notes", newNote.id), newNote, {
//         merge: true,
//       });
//       window.notify("Added successfully", "success");
//       setNotes([...notes, newNote]);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//       window.notify("Error while adding the Note! ", "error");
//     }
//   };

//   return (
//     <div className="create-note-container">
//       <h2>Create Note</h2>
//       <form className="create-note-form">
//         <div className="form-group">
//           <label htmlFor="noteTitle">Note Title</label>
//           <input
//             type="text"
//             id="noteTitle"
//             placeholder="Enter note title"
//             name="title"
//             value={state.title}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="subject">Subject</label>
//           <select
//             id="subject"
//             value={state.subject}
//             name="subject"
//             onChange={handleChange}
//           >
//             <option value="">Select a Subject</option>
//             <option value="math">Math</option>
//             <option value="science">Science</option>
//             <option value="history">History</option>
//             <option value="english">English</option>
//             {/* Add more subjects as needed */}
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="noteContent">Note Content</label>
//           <textarea
//             id="noteContent"
//             placeholder="Enter the content of your note"
//             value={state.description}
//             name="description"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="content-alignment flex-row w-100">
//           <button type="button" onClick={handleSaveNote}>
//             Save Note
//           </button>
//           <Link to="/">
//             <button type="button" className="btn btn-success mx-2">
//               Go to Home
//             </button>
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateNote;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "../../Config/firebase";
import { useNotesContext } from "../../Contexts/notes";
import { useAuthContext } from "../../Contexts/auth";
import { Layout, Card, Form, Input, Button, Typography } from "antd";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const CreateNote = () => {
  const navigate = useNavigate();
  const { notes, setNotes } = useNotesContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSaveNote = async (values) => {
    setLoading(true);
    try {
      const noteId = Math.random().toString(36).slice(2);
      const noteRef = doc(firestore, "Notes", noteId);

      const noteData = {
        ...values,
        id: noteId,
        createdBy: user.fullName,
        updatedBy: user.fullName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        uid: user.uid,
      };
      await setDoc(noteRef, noteData);
      setNotes([noteData, ...notes]);
      window.notify("Note created successfully!", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      window.notify("Error creating note", "error");
    } finally {
      setLoading(false);
    }
  };

  // console.log("serverTimestamp() :>> ", serverTimestamp().type);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <div className="create-note-container">
          <Card
            className="create-note-card"
            title={
              <div className="create-note-header">
                <Link to="/" className="back-button">
                  <ArrowLeftOutlined /> Back
                </Link>
                <Title level={4} className="page-title">
                  Create New Note
                </Title>
              </div>
            }
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSaveNote}
              className="create-note-form"
            >
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  { required: true, message: "Please input note title!" },
                ]}
              >
                <Input
                  placeholder="Enter note title"
                  className="styled-input"
                />
              </Form.Item>

              <Form.Item
                name="subject"
                label="Subject"
                rules={[
                  { required: true, message: "Please input note subject!" },
                ]}
              >
                <Input
                  placeholder="Enter note subject"
                  className="styled-input"
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please input note description!" },
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="Enter note description"
                  className="styled-input"
                />
              </Form.Item>

              <Form.Item className="form-actions">
                <Button
                  type="default"
                  onClick={() => navigate("/")}
                  className="cancel-button"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                  className="submit-button mx-3"
                >
                  Save Note
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateNote;
