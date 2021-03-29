import React from "react";

const TableRow = ({ time, price, direction, change }) => {
  const formattedPrice = Number(price).toFixed(2);
  const formattedChange = change === "n/a" ? change : Number(change).toFixed(2);
  const dateFormat = {
    dateStyle: "short"
  };

  return (
    <tr>
      <td>{time.toLocaleDateString("en-US", dateFormat)}</td>
      <td>{formattedPrice}</td>
      <td>{direction}</td>
      <td>{formattedChange}</td>
      <td>{time.toLocaleDateString("en-US", { weekday: "long" })}</td>
    </tr>
  );
};

export default TableRow;
