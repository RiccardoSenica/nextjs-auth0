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
  CustomerFormListSchema,
  CustomerFormSchema
} from '@utils/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export default function Modules() {
  const [modules, setModules] = useState<CustomerForm[]>([]);

  const form = useForm<CustomerForm>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: {
      type: CustomerFormType.TYPE1,
      text: ''
    }
  });

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/protected/customer-form');

      const validatedResponse = CustomerFormListSchema.safeParse(response.data);

      if (!validatedResponse.success) {
        console.error(validatedResponse.error);
        return;
      }

      setModules(validatedResponse.data);
    })();
  }, []);

  async function handleSubmit(values: CustomerForm) {
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

      const validatedResponse = CustomerFormSchema.safeParse(
        response.data.data
      );

      if (!validatedResponse.success) {
        console.error(validatedResponse.error);
        return;
      }

      setModules([...modules, validatedResponse.data]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Modules</h1>
      {modules &&
        modules.map(module => (
          <div key={module.id}>
            <h2>{module.type}</h2>
            <p>{module.text}</p>
          </div>
        ))}
      <h1>Create Module</h1>
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
          <Button type='submit'>Submit</Button>
        </form>
      </FormProvider>
    </>
  );
}
