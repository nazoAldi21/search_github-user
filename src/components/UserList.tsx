import React from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

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

interface UserListProps {
  users: User[] | undefined;
  onUserSelect: (user: User) => void;
  selectedUser: User | null;
  repositories: Repository[];
  onToggleRepositoryList: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onUserSelect,
  selectedUser,
  repositories,
  onToggleRepositoryList,
}) => {
  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} className="my-2">
          <button
            onClick={() => onUserSelect(user)}
            className={`flex items-center justify-between w-full text-blue-500 hover:underline focus:outline-none ${
              selectedUser?.id === user.id ? 'font-bold' : ''
            }`}
          >
            {user.login}
            {selectedUser?.id === user.id ? (
              <HiChevronUp className="ml-2" />
            ) : (
              <HiChevronDown className="ml-2" />
            )}
          </button>
          {selectedUser?.id === user.id && (
            <ul className="ml-4 mt-2">
              {repositories.map((repo) => (
                <li key={repo.id} className="mb-2 bg-slate-950 rounded-md flex flex-row justify-between items-start content-start">
                    <div className="p-3 text-ellipsis overflow-hidden">
                        <h5 className="text-base py-4">{repo.name}</h5>
                        <h6 className="text-sm ">{repo.description}</h6>
                    </div>
                    <div className="p-3">
                        <h6 className="py-4">{repo.stargazers_count}</h6>
                    </div>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
