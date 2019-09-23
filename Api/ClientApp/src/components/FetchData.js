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

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    const query = useQuery(EXCHANGE_RATES);
    this.state = { forecasts: [], loading: true, query: query };

    // fetch('api/SampleData/WeatherForecasts')
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({ forecasts: data, loading: false });
    //   });
  }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.dateFormatted}>
              <td>{forecast.dateFormatted}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let query = this.state.qyery;
    let contents = query.loading ? <p><em>Loading...</em></p> :
      query.error ? <p><em>Error...{query.error}</em></p> :
        <p>data!</p>;

    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
