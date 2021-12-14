import React from 'react'


function EditableRow({ contact, editFormData, handleEditFormChange, handleCancelClick, editData }) {
    
    return (
        <tr>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a name..."
                    name="fullName"
                    value={editFormData.fullName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <select name='gender' value={editFormData.genderName} onChange={handleEditFormChange}> 
                    <option value='0'> Select gender</option>
                    <option value='1'> 1</option>
                    <option value='2'> 2</option>
                </select>
            </td>
                <td>
                <input
                    type="text"
                    name="phone"
                    required="required"
                    value={editFormData.phone}
                    placeholder="Enter a phone"
                    onChange={handleEditFormChange}
                ></input>
                </td>
            <td>
                <input
                    type="text"
                    name="address"
                    required="required"
                    value={editFormData.address}
                    placeholder="Enter a address"
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td> 
                <button type="submit" onClick={() => editData(contact.id)}>Save</button>
                <button type='button' onClick={handleCancelClick}>Cancell</button>
            </td>
        </tr>
    )
}

export default EditableRow
