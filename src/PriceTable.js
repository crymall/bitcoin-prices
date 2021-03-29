import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import TableRow from "./TableRow.js";

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

        const onlyZeroHours = history.filter((price) => {
          const time = new Date(price.timestamp);
          return time.getHours() === 0;
        });

        setPrices(onlyZeroHours);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const assembleRows = (acc, item) => {
    const { timestamp, price } = item;
    const { rows, prevPrice } = acc;

    const change = !prevPrice ? "n/a" : price - prevPrice;
    const parsedTime = new Date(timestamp);
    rows.push(<TableRow time={parsedTime} price={price} change={change}/>);

    return { rows, prevPrice: price };
  }

  return (
    <Table striped bordered variant="dark">
      <thead>
        <th>Date</th>
        <th>Price</th>
        <th>Change</th>
      </thead>
      <tbody>
        {prices.reduce(assembleRows, {rows: [], prevPrice: null}).rows}
      </tbody>
    </Table>
  );
};

export default PriceTable;
