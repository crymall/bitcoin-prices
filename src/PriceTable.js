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
    const parsedTime = new Date(timestamp);

    if (!prevPrice) {
      rows.push(
        <TableRow
          time={parsedTime}
          price={price}
          prevPrice={"na"}
          change={"na"}
          direction={"na"}
        />
      );
    } else {
      const change = price - prevPrice;
      let direction = Number(change) > 0 ? "Up" : "Down";
      if (change === 0) direction = "Same";
      rows.push(
        <TableRow
          time={parsedTime}
          price={price}
          prevPrice={prevPrice}
          change={change}
          direction={direction}
        />
      );
    }

    return { rows, prevPrice: price };
  };

  return (
    <Table striped bordered variant="dark">
      <thead>
        <th>Date</th>
        <th>Price</th>
        <th>Direction</th>
        <th>Change</th>
        <th>Day of Week</th>
      </thead>
      <tbody>
        {prices.reduce(assembleRows, { rows: [], prevPrice: null }).rows}
      </tbody>
    </Table>
  );
};

export default PriceTable;
