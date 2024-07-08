'use client';

import { CustomerForm, CustomerFormSchema } from '@utils/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SingleCustomerForm({
  params
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [customerForm, setCustomerForm] = useState<CustomerForm | null>(null);

  useEffect(() => {
    (async () => {
      try {
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
      } catch (error) {
        console.error(error);
        router.push('/customer-form');
      }
    })();
  }, [params.id, router]);

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
    <div className='mx-auto my-4 max-w-md'>
      <div className='mb-2'>
        <span className='text-lg font-bold'>Form data</span>
        <pre className='mt-2 rounded bg-gray-100 p-2'>
          {JSON.stringify(customerForm, null, 2)}
        </pre>
      </div>
      <button
        onClick={handleDelete}
        className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
      >
        Delete
      </button>
    </div>
  );
}
