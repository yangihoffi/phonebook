import "./style.css";

import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons.service";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((res) => setPersons(res.data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const foundPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );

    if (foundPerson) {
      if (
        window.confirm(
          `${newName} already exists in the phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(foundPerson);
      }
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
        id: uuidv4(),
      };

      personsService.create(newPersonObject).then((res) => {
        setPersons(persons.concat(res.data));

        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 2000);

        setNewName("");
        setNewNumber("");
      });
    }
  };

  const updatePerson = (foundPerson) => {
    const id = foundPerson.id;
    const changedPerson = {
      ...foundPerson,
      number: newNumber,
    };

    personsService
      .update(id, changedPerson)
      .then((res) => {
        setPersons(persons.map((p) => (p.id === id ? res.data : p)));
      })
      .catch((error) => {
        console.log(error);
        setMessage(
          `Information of ${newName} has already been removed from server`
        );
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      });

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    const foundPerson = persons.find((p) => p.id === id);

    if (!foundPerson) {
      return;
    }

    if (!window.confirm(`Delete ${foundPerson.name}?`)) {
      return;
    }

    personsService
      .remove(id)
      .then((res) => {
        setPersons(persons.filter((p) => p.id !== res.data.id));
      })
      .catch((error) => {
        console.log(error);
        setMessage(
          `Information of ${foundPerson.name} has already been removed from server`
        );
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      });

    console.log(`Deleted ${id}`);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} setFilter={(e) => setFilter(e.target.value)} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={(e) => setNewName(e.target.value)}
        setNewNumber={(e) => setNewNumber(e.target.value)}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
