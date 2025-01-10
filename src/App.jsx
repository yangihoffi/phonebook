import axios from "axios";
import Entry from "./components/Entry";
import { useState, useEffect } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    setNewName("");
  };

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter a name..."
            required
          />
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
