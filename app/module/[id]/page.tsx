export default function SpecificModule({ params }: { params: { id: string } }) {
  return <div>Module {params.id}</div>;
}
