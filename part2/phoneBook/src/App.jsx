import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personsService from './services/persons'
import Notification from './components/Notification'
import './index.css'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, []);

  const addName = (event) => {
    event.preventDefault()
    const trimmedName = newName.trim()
    const existingPerson = persons.find(person => person.name === trimmedName)
  
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${trimmedName} is already in the phonebook, replace the old number whit a new one?`
      );
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personsService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
          setPersons(persons.map(person => (
            person.id !== existingPerson.id ? person : returnedPerson)))
          setNewName('')
          setNewNumber('')
          setMessage(`Updated ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${existingPerson.name} has already been removed from the server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
          setPersons(persons.filter(person => person.id !== existingPerson.id))
        });
      }
    } else {
      const newPerson = { name: trimmedName, number: newNumber, id: trimmedName};
      personsService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      });
    }
  };
  

  const erasePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService.erase(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  };



  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
      <Filter 
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
     />
      
      <h3>Add a new</h3>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      
      <h3>Numbers</h3>
      <Persons 
        persons={filteredPersons} 
        erasePerson={erasePerson} />
    </div>
  );
};

export default App;
