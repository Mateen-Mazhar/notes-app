import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import { firestore } from "../Config/firebase";
import { useAuthContext } from "./auth";
const NotesContext = createContext();
const NotesProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const showNotes = useCallback(async () => {
    if (user) {
      const q = query(
        collection(firestore, "Notes"),
        where("uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const NotesContent = [];
      for (const doc of querySnapshot.docs) {
        const document = doc.data();
        NotesContent.push(document);
      }
      setNotes(NotesContent);
    }
  }, [user]);

  useEffect(() => {
    showNotes();
  });

  const removeNote = async (Note) => {
    try {
      await deleteDoc(doc(firestore, "Notes", Note.id));
      window.notify("Note deleted successfully", "success");
      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== Note.id));
    } catch (error) {
      console.error(error);
      window.notify("Something went wrong while deleting the Note! ", "error");
    }
  };

  return (
    <NotesContext.Provider
      value={{ removeNote, notes, setNotes, searchQuery, setSearchQuery }}
    >
      {children}
    </NotesContext.Provider>
  );
};
export const useNotesContext = () => useContext(NotesContext);
export default NotesProvider;
