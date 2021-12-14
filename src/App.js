import React, { useState, useEffect, Fragment } from "react";
import "./app.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import axios from "axios";

const App = () => {

  
  const [contacts, setContacts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    id: "",
    fullName: "",
    gender: "",
    phone: "",
    address: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    fullName: "",
    gender: "",
    phone: "",
    address: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:44322/Patient/ListGet", {
        headers: { 
    'apiKey': 'crTK#PLnfFri7c35^?YfmM64U=^9KL'
  }
    })
      .then(res => {
        setContacts(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  })

  const postData = () => {
        axios.post('https://localhost:44322/Patient/Post', 
            {
              fullName: `${addFormData.fullName}`,
              dob: "2021-12-11T13:33:33.584Z",
              genderID : `${addFormData.gender}`,
              phone: `${addFormData.phone}`,
              address: `${addFormData.address}`
            },
            {
              headers: { 
                'apiKey': 'crTK#PLnfFri7c35^?YfmM64U=^9KL'
              }
            }
            );
        };
   const editData = (id) => {
        axios.post('https://localhost:44322/Patient/Post', 
            {
              id: id,
              fullName: `${editFormData.fullName}`,
              dob: "2021-12-11T13:33:33.584Z",
              phone: `${editFormData.phone}`,
              genderID : `${editFormData.gender}`,
              address: `${editFormData.address}`              
            },
            {
              headers: { 
                'apiKey': 'crTK#PLnfFri7c35^?YfmM64U=^9KL'
              }
            }
            );
        }     
    
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: addFormData.id,
      fullName: addFormData.fullName,
      genderName: addFormData.genderName,
      phone: addFormData.phone,
      address: addFormData.address,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      genderName: editFormData.genderName,
      phone: editFormData.phone,
      address: editFormData.address,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      genderName: contact.genderName,
      phone: contact.phone,
      address: contact.address,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
        axios.delete(`${'https://localhost:44322/Patient/Delete?PatientID='}${contactId}`, {
        headers: { 
    'apiKey': 'crTK#PLnfFri7c35^?YfmM64U=^9KL'
  }})
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    editData={editData}
                    contact={contact}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    editData={editData}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <select name='gender' onChange={handleAddFormChange}> 
          <option value='0'> 
            Select gender
          </option>
          <option value='1'> 
            Male
          </option>
          <option value='2'> 
            Female
          </option>
        </select>
        <input
          type="text"
          name="phone"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an address..."
          onChange={handleAddFormChange}
        />
        <button onClick={() => postData()} type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;