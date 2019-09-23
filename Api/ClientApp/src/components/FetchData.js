import React, { Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const EXCHANGE_RATES = gql`
  {
    author(id: 1) {
      name
    }
  }
  `;

export function FetchData() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
    return <p>data</p>

  // return data.rates.map(({ currency, rate }) => (
  //   <div key={currency}>
  //     <p>
  //       {currency}: {rate}
  //     </p>
  //   </div>
  // ));
}