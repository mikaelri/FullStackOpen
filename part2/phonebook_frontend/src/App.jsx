import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import FilterResults from './components/FilterResults.jsx'
import AddNewPerson from './components/AddPersons.jsx'
import personService from './services/persons.js'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [showFiltered, setShowFiltered] = useState([]);
  const [notification, setNotification] = useState(null)


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

  const showNotification = (text) => {
    setNotification(text);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  }

  const addPerson = (person) => {
    person.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, personObject)
          .then(response => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : response
            ));
            setNewNumber('');
            setNewName('');
            showNotification(`${newName} number updated successfully.`, 'notification');
            showNotification({message: `${newName} number updated successfully.`, type: 'notification'})
          })
          .catch(error => {
            showNotification({message: `Information of ${newName} has already been removed from the server!`, type: 'error'})
            setNewNumber('');
            setNewName('');
            console.error('Error updating person:', error);
          });
      }

    } else {
      personService
        .create(personObject)
        .then(response => {
        setPersons(persons.concat(response))
        setNewNumber('');
        setNewName('');
        showNotification({message: `Person ${newName} added successfully.`, type: 'notification'});
      })
      .catch(error => {
        showNotification({message: error.response.data.error, type: 'error'});
        setNewNumber('');
        setNewName('');
        console.log(error.response.data)
      })
    }
  };

  useEffect(() => {
    const filtered = persons.filter((person) =>
    person?.name?.toLowerCase().includes(filterValue.toLowerCase())
    );
    setShowFiltered(filtered);
  }, [persons, filterValue]);

  const handlePersonDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(p => p.id !== person.id));
          setShowFiltered(prevFiltered => prevFiltered.filter(p => p.id !== person.id));
          showNotification({message: `${person.name} was deleted from the phonebook!`, type: 'notification'})
        })
        .catch(error => {console.error('Error deleting person:', error);
        });
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
      <Notification text={notification} />
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
      <FilterResults showFiltered={showFiltered} handlePersonDelete={handlePersonDelete}/>
    </div>
  )

};

export default App;
