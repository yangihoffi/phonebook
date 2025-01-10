import axios from "axios";
import { useState, useEffect, Fragment } from "react";

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
        <Fragment key={person.id}>
          <p>{person.name}</p>
          <br />
        </Fragment>
      ))}
    </>
  );
};

export default App;
