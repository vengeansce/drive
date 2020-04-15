import React, { useEffect } from 'react';
import { Navigation } from 'components';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Drive';
  }, []);
  return (
    <Navigation>
      <div>Home</div>
    </Navigation>
  );
}
