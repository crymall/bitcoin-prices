import React from "react";
import format from 'date-fns/format';

const TableRow = ({ time, price, direction, change }) => {
  const formattedPrice = Number(price).toFixed(2);
  const formattedChange = change === "n/a" ? change : Number(change).toFixed(2);
  const dateFormat = format(time, "yyyy-MM-dd").concat("T", format(time, 'HH:mm:ss'));

  const rowClick = (e) => {

  };

  return (
    <tr>
      <td>{dateFormat}</td>
      <td>{formattedPrice}</td>
      <td>{direction}</td>
      <td>{formattedChange}</td>
      <td>{time.toLocaleDateString("en-US", { weekday: "long" })}</td>
    </tr>
  );
};

export default TableRow;
