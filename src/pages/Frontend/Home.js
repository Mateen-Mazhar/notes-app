// import React, { useState } from "react";
// import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
// import { Button, Form, Input, Layout, Modal, theme } from "antd";
// import { useAuthContext } from "../../Contexts/auth";
// import { useNotesContext } from "../../Contexts/notes";
// import { doc, updateDoc } from "firebase/firestore";
// import { firestore } from "../../Config/firebase";
// import { Link } from "react-router-dom";
// const { Content } = Layout;

// const Home = () => {
//   const [editNote, setEditNote] = useState({
//     title: "",
//     subject: "",
//     description: "",
//     id: "",
//   });
//   const { notes, setNotes, removeNote } = useNotesContext();
//   const { user, isAuth, handleLogout } = useAuthContext();
//   // const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const showModal = (note) => {
//     setEditNote({
//       title: note.title,
//       subject: note.subject,
//       description: note.description,
//       id: note.id,
//       savedAt: new Date().toISOString(),
//     });
//     setIsModalOpen(true);
//   };
//   const handleOk = async () => {
//     try {
//       const noteRef = doc(firestore, "Notes", editNote.id);
//       await updateDoc(noteRef, { ...editNote });
//       setNotes([...notes]);
//       window.notify("Note updated successfully", "success");
//       setIsModalOpen(false);
//       const updatedNote = notes.find((note) => note.id === editNote.id);

//       console.log("updatedNote :>> ", updatedNote);
//     } catch (error) {
//       console.error("Error updating note:", error);
//       window.notify("Error updating note", "error");
//     }
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <Layout
//       style={{
//         minHeight: "100vh",
//       }}
//     >
//       {/* <Sider
//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//         // style={{
//         //   overflow: "auto",
//         //   height: "100vh",
//         //   position: "fixed",
//         //   left: 0,
//         //   top: 0,
//         //   bottom: 0,
//         // }}
//       >
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="dark"
//           defaultSelectedKeys={["1"]}
//           mode="inline"
//           items={items}
//         />
//       </Sider> */}
//       <Layout>
//         <Link to="/create">
//           <Button
//             type="primary"
//             shape="circle"
//             icon={<PlusOutlined />}
//             size="large"
//             style={{
//               position: "fixed",
//               bottom: "40px",
//               right: "40px",
//               width: "60px",
//               height: "60px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               zIndex: 1000,
//             }}
//           />
//         </Link>
//         <Content
//           style={{
//             margin: "0 16px",
//           }}
//         >
//           <div
//             className="h-100 "
//             style={{
//               padding: 24,
//               minHeight: 360,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             <div className="container">
//               <div className="row">
//                 {Array.isArray(notes) && notes.length > 0 ? (
//                   notes.map((note, index) => (
//                     <div className="col-md-4 mb-4" key={index}>
//                       <div className="note-card h-100">
//                         <div className="card-body">
//                           <h5 className="card-title">{note.title}</h5>
//                           <p className="card-text">{note.content}</p>
//                         </div>
//                         <div className="card-footer content-alignment flex-row justify-content-between">
//                           <small className="text-muted">
//                             Last updated at:{" "}
//                             {new Date(note.savedAt).toLocaleString()}
//                           </small>
//                           <div>
//                             <Button
//                               className="btn btn-outline-primary   btn-sm"
//                               icon={<EditOutlined />}
//                               onClick={() => showModal(note)}
//                             ></Button>
//                             <Button
//                               className="btn btn-outline-danger btn-sm ms-2"
//                               icon={<DeleteOutlined />}
//                               onClick={() => removeNote(note)}
//                             ></Button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No notes available</p>
//                 )}
//                 <Modal
//                   title="Edit Note"
//                   open={isModalOpen}
//                   onOk={handleOk}
//                   onCancel={handleCancel}
//                   centered
//                   width={600}
//                 >
//                   <Form layout="vertical" className="p-2">
//                     <Form.Item
//                       label="Title"
//                       required
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please input title!",
//                         },
//                       ]}
//                     >
//                       <Input
//                         placeholder="Enter title"
//                         name="title"
//                         value={editNote.title}
//                         onChange={(e) =>
//                           setEditNote({
//                             ...editNote,
//                             title: e.target.value,
//                           })
//                         }
//                       />
//                     </Form.Item>

//                     <Form.Item
//                       label="Subject"
//                       required
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please input subject!",
//                         },
//                       ]}
//                     >
//                       <Input
//                         placeholder="Enter subject"
//                         name="subject"
//                         value={editNote.subject}
//                         onChange={(e) =>
//                           setEditNote({
//                             ...editNote,
//                             subject: e.target.value,
//                           })
//                         }
//                       />
//                     </Form.Item>

//                     <Form.Item
//                       label="Description"
//                       required
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please input description!",
//                         },
//                       ]}
//                     >
//                       <Input.TextArea
//                         rows={4}
//                         placeholder="Enter description"
//                         name="description"
//                         value={editNote.description}
//                         onChange={(e) =>
//                           setEditNote({
//                             ...editNote,
//                             description: e.target.value,
//                           })
//                         }
//                       />
//                     </Form.Item>
//                   </Form>
//                 </Modal>
//               </div>
//             </div>
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };
// export default Home;

import React, { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Layout,
  Modal,
  Empty,
  Spin,
  theme,
  Popconfirm,
} from "antd";
import { useAuthContext } from "../../Contexts/auth";
import { useNotesContext } from "../../Contexts/notes";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../../Config/firebase";
import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";

const { Content } = Layout;

const Home = () => {
  const [form] = Form.useForm();
  const [editNote, setEditNote] = useState({
    title: "",
    subject: "",
    description: "",
    id: "",
  });
  const { notes, setNotes, removeNote, searchQuery } = useNotesContext();
  const { user, isAuth } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const filteredNotes = notes?.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const editModal = (note) => {
    setEditNote({
      title: note.title,
      subject: note.subject,
      description: note.description,
      id: note.id,
    });
    form.setFieldsValue({
      title: note.title,
      subject: note.subject,
      description: note.description,
    });
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      console.log("values :>> ", form.validateFields());
      let values = await form.validateFields();
      values = {
        ...values,

        updatedBy: user.fullName,
        updatedAt: serverTimestamp(),
      };
      const noteRef = doc(firestore, "Notes", editNote.id);
      await updateDoc(noteRef, values);
      window.notify("Note updated successfully", "success");
      setIsModalOpen(false);
      form.resetFields();
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editNote.id ? { ...note, ...values } : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
      window.notify("Error updating note", "error");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            margin: "24px 16px",
          }}
        >
          <div className="container">
            <div className="row mb-4">
              <div className="col">
                <h2 className="section-title">My Notes</h2>
                <p className="text-muted">
                  Manage and organize your study notes
                </p>
              </div>
            </div>

            <div className="row">
              {notes === null ? (
                <div className="col text-center py-5">
                  <Spin size="large" />
                </div>
              ) : Array.isArray(filteredNotes) && filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <div className="col-md-4 mb-4" key={note.id}>
                    <div className="note-card">
                      <div className="note-card__content">
                        <h5 className="note-card__title">{note.title}</h5>
                        <p className="note-card__subject">{note.subject}</p>
                        <p className="note-card__text">{note.description}</p>
                      </div>
                      <div className="note-card__footer">
                        <div className="note-card__footer-info">
                          <div className="d-flex justify-content-between flex-wrap gap-2">
                            <div className="metadata-column">
                              <small className="text-muted d-flex align-items-center gap-1">
                                <i className="far fa-calendar-plus"></i>
                                Created at:{" "}
                                {note.createdAt
                                  ? new Date(
                                      note.createdAt.seconds * 1000
                                    ).toLocaleString()
                                  : "N/A"}
                              </small>
                              <small className="text-muted d-block">
                                <i className="far fa-user"></i> By{" "}
                                {note.createdBy}
                              </small>
                            </div>
                            <div className="metadata-column">
                              <small className="text-muted d-flex align-items-center gap-1">
                                <i className="far fa-calendar-check"></i>
                                Updated at:{" "}
                                {note.updatedAt
                                  ? new Date(
                                      note.updatedAt.seconds * 1000
                                    ).toLocaleString()
                                  : "N/A"}
                              </small>
                              <small className="text-muted d-block">
                                <i class="fa-sharp fa-solid fa-user-pen"></i> By{" "}
                                {note.updatedBy}
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="note-card__actions d-flex flex-column">
                          <abbr title="Edit note">
                            <Button
                              type="text"
                              icon={<EditOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                editModal(note);
                              }}
                              className="note-card__button"
                            />
                          </abbr>
                          <abbr title="Share note">
                            <RWebShare
                              data={{
                                text: "Invite your friends to view this note!",
                                url: window.location.href,
                                title: "Notes",
                              }}
                              onClick={() =>
                                console.log("shared successfully!")
                              }
                            >
                              <Button
                                type="text"
                                icon={
                                  <i className="fa-sharp-duotone fa-solid fa-share-nodes"></i>
                                }
                              />
                            </RWebShare>
                          </abbr>
                          <Popconfirm
                            title="Are you sure to delete this note?"
                            onConfirm={() => removeNote(note)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <abbr title="Delete note">
                              <Button
                                type="danger"
                                icon={<DeleteOutlined />}
                                className="note-card__button note-card__button--danger"
                              />
                            </abbr>
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col text-center py-5">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span>No notes yet. Start creating your first note!</span>
                    }
                  >
                    <Link to="/create">
                      <Button type="primary">Create Note</Button>
                    </Link>
                  </Empty>
                </div>
              )}
            </div>
          </div>
        </div>

        <Link to={isAuth ? "/create" : "/auth/login"}>
          <i className="fa-solid fa-plus fa-2xl floating-action-button text-light bg-primary"></i>
        </Link>

        <Modal
          title="Edit Note"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Update
            </Button>,
          ]}
          centered
          width={600}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please input title!" }]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>

            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: "Please input subject!" }]}
            >
              <Input placeholder="Enter subject" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <Input.TextArea rows={4} placeholder="Enter description" />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default Home;
