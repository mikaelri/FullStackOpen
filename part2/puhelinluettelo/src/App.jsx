import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Mary Marylin', number: '49-24-6423112' }
  ])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filterValue, setFilterValue] = useState('');
  const [showFiltered, setShowFiltered] = useState(persons);

  const handleFilter = (event) => {
    const value = event.target.value;
    setFilterValue(event.target.value);
    const filtered = persons.filter((person) => person.name.toLowerCase().includes(value.toLowerCase()));
    setShowFiltered(filtered);
  };

const addPerson = (event) => {
  event.preventDefault();

    if (persons.some(person => person.name === newName)) {
    alert(`${newName} is already added to phonebook`)
    return };

  setPersons([...persons, { name: newName, number: newNumber}]);
  setNewNumber('');
  setNewName('');
}

const handleNameChange = (event) => {
  setNewName(event.target.value)
  };

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
};

  return (
    <div>
      <h2>Phonebook</h2>
      <>filter shown with <input type="text" value={filterValue} onChange={handleFilter}/></>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
        name: <input value={newName} onChange={handleNameChange} /><br></br>
        number: <input value={newNumber} onChange={handleNumberChange} /><br></br>
        <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {showFiltered.map((person, id) => (
          <p key={id}>
            {person.name} {person.number}
            </p>
        ))}
      </div>
    </div>
  )

}

export default App