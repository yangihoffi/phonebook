const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <input
        value={filter}
        onChange={setFilter}
        placeholder="Search a name..."
      />
    </div>
  );
};

export default Filter;
