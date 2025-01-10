const Entry = ({ person }) => {
  return (
    <>
      <span>{person.name}</span> <span>{person.number}</span>
      <br />
    </>
  );
};

export default Entry;
