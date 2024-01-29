/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import SearchBar from './components/SearchBar'
import PhoneBook from './components/PhoneBook'

import phonebook from './services/phonebook'

import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    console.log("effect")
    phonebook.getAll()
    .then(persons => {
      setPersons(persons);
      setFilteredPersons(persons)
    })
  }, [])

  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })

  const [search, setSearch] = useState('');

  const [filteredPersons, setFilteredPersons] = useState(persons)

  const handleSearchChange = (e) => {
    setSearch(e.target.value);

    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredPersons(filteredPersons);
  }
  
  const handlePersonChange = (e) => {
    setNewPerson({
      ...newPerson,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const matchingPerson = persons.find(p => p.name === newPerson.name);
  
    if (matchingPerson) {
      if (matchingPerson.number !== newPerson.number && 
        window.confirm(`${newPerson.name} is already on the phonebook, do you want to replace the old number?`)) {
          console.log(matchingPerson.id)
          phonebook.update(matchingPerson.id, { name: newPerson.name, number: newPerson.number, id: matchingPerson.id})
          .then(person => {
            setPersons((prevPersons) => prevPersons.map(p => p.id === person.id ? person : p));
            setFilteredPersons((prevPersons) => prevPersons.map(p => p.id === person.id ? person : p));
            setSuccessMessage(`${person.name} updated correctly with phone number '${person.number}'`)
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${matchingPerson.name} has already been removed from the server`)
            setFilteredPersons((prevPersons) => prevPersons.filter(p => p.id !== matchingPerson.id));
          }) 
      }
    } else {
      phonebook.create({ name: newPerson.name, number: newPerson.number })
      .then(person => {
        setPersons(persons.concat([person]))
        setSuccessMessage(`Added ${person.name}`)
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000)
        setFilteredPersons([...filteredPersons, person]);
        setNewPerson({
          name: '',
          number: ''
        });
    })  
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(`Do you want to delete user ${id}`)) {
      phonebook.deletePerson(id)
      .then(deletedPerson => {
        setPersons((prevPersons) => prevPersons.filter(p => p.id !== id))
        setFilteredPersons((prevPersons) => prevPersons.filter(p => p.id !== id))
        setSuccessMessage(`Deleted ${deletedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000)
    })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type="success" message={successMessage}/>
      <Notification type="error" message={errorMessage}/>
      <SearchBar search={search} handleSearchChange={handleSearchChange}></SearchBar>
      <PersonForm handleSubmit={handleSubmit} newPerson={newPerson} handlePersonChange={handlePersonChange}></PersonForm>
      <PhoneBook filteredPersons={filteredPersons} handleDelete={handleDelete}></PhoneBook>
    </div>
  )
}

export default App