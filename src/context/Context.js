import { createContext, useEffect, useState } from "react";
import { ref, push, set } from "firebase/database";
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
    const newContact = {
      userName,
      phoneNumber,
      gender,
    };
    setUserData([...userData, newContact]);
    saveToDatabase(newContact);
  };

  //Firebase

  const saveToDatabase = (item) => {
    const userRef = ref(db, "Contact");
    const newUserRef = push(userRef);
    set(newUserRef, {
      ...item,
    });
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
      }}
    >
      {children}
    </Context.Provider>
  );
};
