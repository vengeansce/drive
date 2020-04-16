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
        <Link to="/">
          <h3 className="self-center">Drive</h3>
        </Link>
        {user.role > 0 && (
          <Link
            to="/dashboard"
            className={`px-3 py-2 mx-6 self-center rounded-md text-sm font-medium leading-5 hover:text-white hover:bg-gray-700 ${
              isActiveLink('dashboard')
                ? 'outline-none text-white bg-gray-700'
                : 'bg-gray-900 text-gray-300'
            }`}
          >
            Dashboard
          </Link>
        )}
      </Flex.Between>
      <div className="self-center">
        <span className="self-center">{user.displayName}</span>
        <span className="mx-3 self-center">|</span>
        <LogoutButton onClick={() => firebase.auth().signOut()} />
      </div>
    </Flex.Between>
  );
}

const LogoutButton = ({ ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 172 172"
    className="w-6 h-6 self-center inline-block cursor-pointer"
    style={{ fill: '#000000' }}
    {...rest}
  >
    <g
      fill="none"
      fillRule="nonzero"
      stroke="none"
      strokeWidth="1"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
      strokeDasharray=""
      strokeDashoffset="0"
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{ mixBlendMode: 'normal' }}
    >
      <path d="M0,172v-172h172v172z" fill="none"></path>
      <g fill="#e53e3e">
        <path d="M86,6.88c-43.61533,0 -79.12,35.50467 -79.12,79.12c0,23.3781 10.21499,44.43061 26.37109,58.89656c1.81717,1.72574 4.42892,2.32704 6.81778,1.56964c2.38886,-0.7574 4.17702,-2.7537 4.66788,-5.21121c0.49086,-2.45751 -0.39323,-4.98756 -2.30785,-6.60452c-13.37286,-11.97388 -21.7889,-29.26937 -21.7889,-48.65047c0,-36.17891 29.18109,-65.36 65.36,-65.36c36.17891,0 65.36,29.18109 65.36,65.36c0,19.37733 -8.41528,36.67279 -21.7889,48.65047c-1.91462,1.61696 -2.79871,4.14701 -2.30786,6.60453c0.49085,2.45752 2.27902,4.45382 4.66789,5.21122c2.38887,0.7574 5.00061,0.1561 6.81778,-1.56965c16.15534,-14.46904 26.3711,-35.52158 26.3711,-58.89656c0,-43.61533 -35.50467,-79.12 -79.12,-79.12zM85.89922,71.93094c-1.82469,0.02672 -3.56404,0.7772 -4.83539,2.08635c-1.27135,1.30915 -1.97057,3.06973 -1.94383,4.89443v62.51125l-12.33563,-12.33562c-1.2958,-1.33565 -3.07735,-2.08947 -4.93828,-2.08953c-2.80142,0.00066 -5.32276,1.69967 -6.37513,4.29592c-1.05237,2.59624 -0.42565,5.57131 1.58466,7.52237l23.46859,23.46859c1.30466,1.71744 3.33912,2.72377 5.49591,2.71849c2.15678,-0.00528 4.1863,-1.02155 5.48253,-2.74536l23.44172,-23.44172c1.79731,-1.72562 2.52131,-4.28807 1.89277,-6.6991c-0.62854,-2.41103 -2.51139,-4.29388 -4.92242,-4.92242c-2.41103,-0.62854 -4.97347,0.09546 -6.6991,1.89277l-12.33563,12.33562v-62.51125c0.02725,-1.85964 -0.69946,-3.65111 -2.01457,-4.96621c-1.31511,-1.31511 -3.10657,-2.04182 -4.96621,-2.01457z"></path>
      </g>
    </g>
  </svg>
);

const isActiveLink = (link) => {
  const pathname = window.location.pathname.split('/');
  return pathname[pathname.length - 1] === link;
};
