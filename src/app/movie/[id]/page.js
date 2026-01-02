export default async function MoviePage({ params }) {
  const { id } = await params;

  return <div>Movie Page for ID: {id}</div>;
}
