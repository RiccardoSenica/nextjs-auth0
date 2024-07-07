'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Button } from '@components/Button';
import { CustomerForm, CustomerFormSchema } from '@utils/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default withPageAuthRequired(function SingleCustomerForm({
  params
}: {
  params: { id: string };
}) {
  const router = useRouter();
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

  async function handleDelete() {
    if (!customerForm) {
      return;
    }

    const result = await axios.delete(
      `/api/protected/customer-form/${customerForm.id}`
    );

    if (result.status !== 200) {
      console.error(result.data.error);
      return;
    }

    router.push('/customer-form');
  }

  if (!customerForm) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Form {JSON.stringify(customerForm)}</div>
      <Button onClick={handleDelete}>Delete</Button>
    </>
  );
});
