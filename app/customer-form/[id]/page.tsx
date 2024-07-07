'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { CustomerForm, CustomerFormSchema } from '@utils/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default withPageAuthRequired(function SingleCustomerForm({
  params
}: {
  params: { id: string };
}) {
  const [customerForm, setCustomerForm] = useState<CustomerForm | null>(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `/api/protected/customer-form/${params.id}`
      );

      const validatedResponse = CustomerFormSchema.safeParse(
        response.data.data
      );

      if (!validatedResponse.success) {
        console.error(validatedResponse.error);
        return;
      }

      setCustomerForm(validatedResponse.data);
    })();
  }, [params.id]);

  if (!customerForm) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Form {params.id} {JSON.stringify(customerForm)}
    </div>
  );
});
