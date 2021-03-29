import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const PriceTable = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          "https://api.coinranking.com/v1/public/coin/1/history/30d"
        );
        const {
          data: { history },
        } = await data.json();

        const onlyZeroHours = history.filter(price => {
          const time = new Date(price.timestamp)
          return time.getHours() === 0;
        })

        setPrices(onlyZeroHours);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <Table striped bordered variant="dark">
      <thead>
        <th>Date</th>
        <th>Price</th>
      </thead>
      <tbody>
        {prices.map(item => {
          const time = new Date(item.timestamp);
          return (
            <tr>
              <td>{time.toDateString()}</td>
              <td>{item.price}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  );
};

export default PriceTable;
