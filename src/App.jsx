import axios from "axios";
import Entry from "./components/Entry";
import { useState, useEffect } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  });

  return (
    <>
      <h2>Phonebook</h2>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Entry key={person.id} person={person} />
      ))}
    </>
  );
};

export default App;
