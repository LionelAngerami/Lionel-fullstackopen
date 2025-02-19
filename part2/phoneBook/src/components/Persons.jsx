const Persons = ({ persons, erasePerson }) => (
  <ul>
    {persons.map(person => (
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={() => erasePerson(person.id, person.name)}>erase</button>
      </li>
    ))}
  </ul>
);

export default Persons;
