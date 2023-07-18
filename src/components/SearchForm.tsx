import React, { useState } from 'react';

interface User {
  id: number;
  login: string;
}

interface SearchFormProps {
  users: User[] | undefined;
  onSearch: (username: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ users, onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter GitHub username"
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
      {users && users.length === 0 && (
        <p className="text-red-500 mt-2">No users found.</p>
      )}
    </form>
  );
};

export default SearchForm;
