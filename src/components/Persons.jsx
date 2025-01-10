import Entry from "./Entry";

const Persons = ({ persons, deletePerson }) => {
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
