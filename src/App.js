import { useState, useEffect } from 'react'
import phoneBookService from './Services/phoneBookService'
import Contact from './Components/Contact'
console.log("App running")
const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(initialPhoneBook => {
        setPersons(initialPhoneBook)
      })}, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPerson = persons.filter(person=> person.name.toLowerCase().includes(newFilter.toLowerCase()))
  console.log(filteredPerson)

  const addContact = (event) => {
    event.preventDefault()
  
    const existingPerson = persons.find(person => person.name === newName)
  
    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
  
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }
  
        phoneBookService
          .updatePerson(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(`Failed to update ${existingPerson.name}'s number. Please try again.`)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      phoneBookService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(`Failed to add ${newName} to phonebook. Please try again.`)
        })
    }
  }

  const delContact = (id) => {
    const name = persons.find((person) => person.id === id).name
    
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      phoneBookService.deletePerson(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id))
    })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  console.log(persons)

  
  return (
    <div>
      <h2>Phonebook</h2>
        filter: <input
        value={newFilter}
        onChange={handleFilterChange}/>
      <h3>Add a new Contact:</h3>
      <form onSubmit={addContact}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange} />
          number: <input 
          value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Name, Number</h2>
        {filteredPerson.map(person => 
        <Contact key={person.id} person={person} delContact={delContact}/>)
        }

    </div>
  )
}

export default App