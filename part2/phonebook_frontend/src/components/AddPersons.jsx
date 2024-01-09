import React from "react"

const AddNewPerson = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
    <form onSubmit={addPerson}>
        <div>
            name: <input value={newName} onChange={handleNameChange} /><br></br>
            number: <input value={newNumber} onChange={handleNumberChange} /><br></br>
            <button type="submit">add</button>
        </div>
  </form>
  )
}

export default AddNewPerson;

