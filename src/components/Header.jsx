import React, { useContext } from 'react';
import { Flex } from 'components';
import { Link } from 'react-router-dom';
import { firebase } from 'config/firebase';
import { Global } from 'contexts';

export default function Header() {
  const { user } = useContext(Global);
  return (
    <Flex.Between css="px-8 py-4 bg-gray-800 text-white">
      <Flex.Between css="between flex-grow">
        <h3 className="self-center">Drive</h3>
        {user.role > 0 && (
          <Link
            to="/dashboard"
            className="px-3 py-2 mx-6 self-center rounded-md text-sm font-medium leading-5 bg-gray-900 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Dashboard
          </Link>
        )}
      </Flex.Between>
      <div className="self-center">
        <span>{user.displayName}</span>
        <span> | </span>
        <span
          className="cursor-pointer"
          onClick={() => firebase.auth().signOut()}
        >
          logout
        </span>
      </div>
    </Flex.Between>
  );
}
