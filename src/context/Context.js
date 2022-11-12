import { createContext, useEffect, useState } from "react";
import { ref, push, set, onValue, remove } from "firebase/database";
import { db } from "../utils/firebase";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  //Get form data
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  //storage data
  const [storageUserData, setStorageUserData] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  //userdata
  const [userData, setUserData] = useState([]);

  //func section

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isUpdate) {
      const newContact = {
        userName,
        phoneNumber,
        gender,
      };
      setUserData([...userData, newContact]);
      saveToDatabase(newContact);
    } else {
      saveToDatabase();
    }
  };

  //Firebase

  const saveToDatabase = (item) => {
    const userRef = ref(db, "Contact");
    const newUserRef = push(userRef);
    set(newUserRef, {
      ...item,
    });
  };

  useEffect(() => {
    const userRef = ref(db, "Contact");
    onValue(userRef, (details) => {
      const data = details.val();
      const contactArr = [];
      for (let id in data) {
        contactArr.push({ id, ...data[id] });
      }
      setUserData(contactArr);
    });
  }, []);

  //Update

  const handleUpdate = (item) => {
    setUserName(item.gender);
    setPhoneNumber(item.phoneNumber);
    setGender(item.gender);
    setIsUpdate(true);
  };

  //Delete

  const deleteDatabaseData = (item) => {
    remove(ref(db, "Contact/" + item.id));
  };

  return (
    <Context.Provider
      value={{
        setUserData,
        userData,
        setGender,
        setPhoneNumber,
        setUserName,
        gender,
        phoneNumber,
        userName,
        isUpdate,
        setIsUpdate,
        handleFormSubmit,
        deleteDatabaseData,
        handleUpdate,
      }}
    >
      {children}
    </Context.Provider>
  );
};
