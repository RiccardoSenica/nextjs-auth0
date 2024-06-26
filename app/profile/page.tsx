'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

export default withPageAuthRequired(function Profile() {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${window.location.origin}/api/profile`);
      setUser(await res.json());
    })();
  }, []);

  return (
    <main>
      <h1>Profile (fetched from API)</h1>
      <h3>User</h3>
      <pre data-testid='module'>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
});
