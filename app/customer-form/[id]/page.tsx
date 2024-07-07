'use client';

export default function SingleCustomerForm({
  params
}: {
  params: { id: string };
}) {
  return <div>Module {params.id}</div>;
}
