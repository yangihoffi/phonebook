const Entry = ({ person, deletePerson }) => {
  return (
    <div>
      <button onClick={deletePerson}>Delete</button> <span>{person.name}</span>{" "}
      <span>{person.number}</span>
      <br />
    </div>
  );
};

export default Entry;
