import Entry from "./Entry";

const Persons = ({ persons, deletePerson }) => {
  if (persons.length === 0) {
    return <p>No entries in the phonebook</p>;
  }

  return (
    <div>
      {persons.map((person) => (
        <Entry
          key={person.id}
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default Persons;
