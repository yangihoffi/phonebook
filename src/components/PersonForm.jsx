const PersonForm = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  addPerson,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        Name:{" "}
        <input
          value={newName}
          onChange={setNewName}
          placeholder="Enter a name..."
          required
        />
        <br />
        Number:{" "}
        <input
          value={newNumber}
          onChange={setNewNumber}
          placeholder="Enter a number..."
          required
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default PersonForm;
