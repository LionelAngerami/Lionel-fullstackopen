const Filter = ({ searchTerm, handleSearchChange }) => (
    <div>
      Filter shown with: 
      <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );

  export default Filter