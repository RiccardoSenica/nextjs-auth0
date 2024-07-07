'use client';

import { Button } from '@components/Button';
import { FormControl } from '@components/FormControl';
import { FormMessage } from '@components/FormMessage';
import { Input } from '@components/Input';
import { FormField } from '@contexts/FormField/FormFieldProvider';
import { FormItem } from '@contexts/FormItem/FormItemProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerFormType } from '@prisma/client';
import {
  CustomerForm,
  CustomerFormCreate,
  CustomerFormCreateSchema,
  CustomerFormListSchema,
  CustomerFormSchema
} from '@utils/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function CustomerForms() {
  const [customerForms, setCustomerForms] = useState<CustomerForm[]>([]);

  const form = useForm<CustomerFormCreate>({
    resolver: zodResolver(CustomerFormCreateSchema),
    defaultValues: {
      type: CustomerFormType.TYPE1,
      text: ''
    }
  });

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/protected/customer-form');

      const validatedResponse = CustomerFormListSchema.safeParse(
        response.data.data
      );

      if (!validatedResponse.success) {
        console.error(validatedResponse.error);
        return;
      }

      setCustomerForms(validatedResponse.data);
    })();
  }, []);

  async function handleSubmit(values: CustomerFormCreate) {
    console.log('values', values);

    try {
      const response = await axios.post(
        '/api/protected/customer-form',
        {
          type: CustomerFormType.TYPE1,
          text: values.text
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('response', response.data.data);

      const validatedResponse = CustomerFormSchema.safeParse(
        response.data.data
      );

      if (!validatedResponse.success) {
        console.error(validatedResponse.error);
        return;
      }

      setCustomerForms([...customerForms, validatedResponse.data]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Forms</h1>
      {customerForms &&
        customerForms.map(customerForm => (
          <div key={customerForm.id}>
            <h2>{customerForm.type}</h2>
            <p>{customerForm.text}</p>
          </div>
        ))}
      <h1>New form</h1>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name='text'
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Input placeholder='name' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit'>Create</Button>
        </form>
      </FormProvider>
    </>
  );
}
