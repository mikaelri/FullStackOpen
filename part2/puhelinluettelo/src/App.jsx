import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from '../components/Filter.jsx'
import FilterResults from '../components/FilterResults.jsx'
import AddNewPerson from '../components/AddPersons.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [showFiltered, setShowFiltered] = useState([]);

  const handlefilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(event.target.value);

    const filtered = persons.filter(person => 
      person?.name?.toLowerCase().includes(value?.toLowerCase()));
    setShowFiltered(filtered);
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setShowFiltered(response.data)
      })
  
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

      if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return };

    const updatedPersons = [...persons, {name: newName, number: newNumber}];
    setPersons(updatedPersons);
    setNewNumber('');
    setNewName('');

    axios
    .post('http://localhost:3001/persons',{name: newName, number: newNumber})
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })

    const filtered = updatedPersons.filter(person =>
      person?.name?.toLowerCase().includes(filterValue.toLowerCase())
    );
    setShowFiltered(filtered);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setShowFiltered={setShowFiltered} handlefilterChange={handlefilterChange}/>
      <h2>add a new</h2>
      <AddNewPerson 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        />
      <h2>Numbers</h2>
      <FilterResults showFiltered={showFiltered}/>
    </div>
  )

};

export default App;
