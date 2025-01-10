import Entry from "./Entry";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Entry key={person.id} person={person} />
      ))}
    </div>
  );
};

export default Persons;
