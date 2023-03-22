import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import './App.css';

const ENDPOINT =
  'https://api-eu-west-2.hygraph.com/v2/clfh6ztxg0bqn01tb18bs3rv6/master';

const carsAnonQuery = `{
  cars {
    name
    id
    avatarUrl
  }
}`;

function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: carsAnonQuery,
          variables: {
            data: {
              name: 'Go mental twice!',
              description: 'Everywhere',
              dueTime: '2020-04-21T19:15:30Z',
            },
            where: {
              id: 'ckkpuapegf01l0b522w1x8o77',
            },
          },
        }),
      });
      if (!response.ok) throw new Error(`Failed to fetch`);
      return await response.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{JSON.stringify(error)}</p>;

  console.log(data.data.cars);

  return (
    <div className="App">
      <h1>Cars App</h1>
      {JSON.stringify(data.data.cars)}
    </div>
  );
}

export default App;
