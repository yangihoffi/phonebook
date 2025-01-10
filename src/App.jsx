import axios from "axios";
import Entry from "./components/Entry";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const foundPerson = persons.findIndex(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );

    if (foundPerson !== -1) {
      alert(`${newName} already exists in the phonebook.`);
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
        id: uuidv4(),
      };

      axios
        .post("http://localhost:3001/persons", newPersonObject)
        .then((res) => {
          setPersons(persons.concat(res.data));
          setNewName("");
          setNewNumber("");
        });
    }
  };

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <h2>Add a new</h2>
        <form onSubmit={addPerson}>
          Name:{" "}
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter a name..."
            required
          />
          <br />
          Number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            placeholder="Enter a number..."
            required
          />
          <br />
          <button type="submit">Add</button>
        </form>
      </div>
      <div>
        <h2>Numbers</h2>
        {persons.map((person) => (
          <Entry key={person.id} person={person} />
        ))}
      </div>
    </>
  );
};

export default App;
