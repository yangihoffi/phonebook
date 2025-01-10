const Entry = ({ person }) => {
  return (
    <div>
      <span>{person.name}</span> <span>{person.number}</span>
      <br />
    </div>
  );
};

export default Entry;
