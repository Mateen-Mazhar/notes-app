// import React, { useState } from "react";
// import { firestore } from "../../Config/firebase";
// import { useNotesContext } from "../../Contexts/notes";

// const EditNote = (id) => {
// const {notes} = useNotesContext();
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
  // const handleUpdate = async (id) => {
  //   try {
  //     await updateDoc(doc(firestore, "Notes", id), {});
  //     window.notify("Added to Cart successfully", "success");
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //     window.notify("Error while adding the item to the Cart! ", "error");
  //   }
  // };

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

// export default EditNote;
