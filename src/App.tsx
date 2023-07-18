import React, { useState } from "react";
import axios from "axios";
import SearchForm from "./components/SearchForm";
import UserList from "./components/UserList";

interface User {
  id: number;
  login: string;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const handleUserSearch = async (username: string) => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${username}&per_page=5`
      );
      const usersData: User[] = response.data.items;
      setUsers(usersData);
      setSelectedUser(null);
      setRepositories([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserSelect = async (user: User) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${user.login}/repos`
      );
      const repositoriesData: Repository[] = response.data;
      setSelectedUser(user);
      setRepositories(repositoriesData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleRepositoryList = (userId: number) => {
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(null);
      setRepositories([]);
    } else {
      const user = users.find((user) => user.id === userId);
      if (user) {
        handleUserSelect(user);
      }
    }
  };

  return (
    <main className="w-2/4 xs:w-full sm:w-full h-full flex-col justify-start my-6 items-start inline-flex">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="my-4">
          <h1 className="text-xl font-bold text-center">GitHub User Search</h1>
        </div>
        <div className="my-4">
          <SearchForm onSearch={handleUserSearch} />
        </div>
        <div className="w-2/4 my-4 xs:w-full sm:w-full px-10">
          <UserList
            users={users}
            onUserSelect={handleUserSelect}
            selectedUser={selectedUser}
            repositories={repositories}
            onToggleRepositoryList={handleToggleRepositoryList}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
