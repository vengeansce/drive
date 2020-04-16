import React, { useEffect, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Navigation, Table, TH } from 'components';
import db from 'config/firebase';
import { Global } from 'contexts';

const getRoleName = (roleNumber) => {
  switch (roleNumber) {
    case 2:
      return 'Super Admin';
    case 1:
      return 'Admin';
    default:
      return 'User';
  }
};

export default function Home() {
  const { user } = useContext(Global);
  const [users, setUsers] = useState({});
  const togglePermission = useCallback((key, permType) => {
    setUsers((prev) => {
      try {
        const users = { ...prev };
        const prevUser = users[key];
        const permValue = !prevUser.permissions[permType];
        const data = {
          ...users,
          [key]: {
            ...prevUser,
            permissions: {
              ...prevUser.permissions,
              [permType]: permValue,
            },
          },
        };
        db.ref(`users/${key}/permissions/${permType}`).set(permValue);
        return data;
      } catch (error) {
        return prev;
      }
    });
  }, []);

  useEffect(() => {
    document.title = 'Dashboard';
    if (user.role) {
      const ref = db.ref('users').orderByChild('role');
      ref.once('value').then((snapshot) => {
        setUsers(snapshot.val());
      });
    }
  }, [user.role]);

  return (
    <Navigation>
      {user.role ? (
        <Table>
          <thead>
            <tr>
              {['Name', 'Role', 'Permissions'].map((elm, i) => (
                <TH key={i.toString()}>{elm}</TH>
              ))}
              {/* <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th> */}
            </tr>
          </thead>
          <tbody className="bg-white">
            {Object.keys(users).map(
              (key) =>
                users[key].email != user.email && (
                  <TRD
                    key={key}
                    name={users[key].displayName}
                    email={users[key].email}
                    role={users[key].role}
                    permissions={users[key].permissions}
                  >
                    <Pill
                      active={users[key].permissions.create}
                      handleClick={() => togglePermission(key, 'create')}
                    >
                      create
                    </Pill>
                    <Pill
                      active={users[key].permissions.read}
                      handleClick={() => togglePermission(key, 'read')}
                    >
                      read
                    </Pill>
                    <Pill
                      active={users[key].permissions.delete}
                      handleClick={() => togglePermission(key, 'delete')}
                    >
                      delete
                    </Pill>
                  </TRD>
                )
            )}
          </tbody>
        </Table>
      ) : (
        <div className="text-center">
          {"You don't have permissions to access this page."}
        </div>
      )}
    </Navigation>
  );
}

const TRD = ({ email, name, role, children }) => (
  <tr>
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          <img
            className="h-10 w-10 rounded-full"
            src="https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png"
            alt=""
          />
        </div>
        <div className="ml-4">
          <div className="text-sm leading-5 font-medium text-gray-900">
            {name}
          </div>
          <div className="text-sm leading-5 text-gray-500">{email}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
      {getRoleName(role)}
    </td>
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      {children}
    </td>

    {/* <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
      <a
        href="#"
        className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"
      >
        Delete
      </a>
    </td> */}
  </tr>
);

TRD.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.number,
};

const Pill = ({ children, active, handleClick }) => (
  <span
    className={`px-2 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
      active ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'
    }`}
    onClick={handleClick}
  >
    {children}
  </span>
);

Pill.propTypes = {
  active: PropTypes.bool,
  handleClick: PropTypes.func,
};
