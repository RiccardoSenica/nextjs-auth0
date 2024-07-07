'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default withPageAuthRequired(function Profile() {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/protected/profile');

      setUser(response.data);
    })();
  }, []);

  return (
    <>
      <h1>Profile (fetched from API)</h1>
      {JSON.stringify(user, null, 2)}
    </>
  );
});
