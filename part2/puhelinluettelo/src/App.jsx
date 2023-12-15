import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import FilterResults from './components/FilterResults.jsx'
import AddNewPerson from './components/AddPersons.jsx'
import personService from './services/persons.js'

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
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setShowFiltered(initialPersons)
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };

    if (persons.some(person => person.name === newName)) {
    alert(`${newName} is already added to phonebook`)
    return 
  } else {
      personService
        .create(personObject)
        .then(response => {
        setPersons(persons.concat(response))
        setNewNumber('');
        setNewName('');
        
        const filtered = persons.concat(response).filter(person =>
          person?.name?.toLowerCase().includes(filterValue.toLowerCase())
        );
        setShowFiltered(filtered);
      })
    }
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
