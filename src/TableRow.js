import React from 'react';

const TableRow = ({ time, price, direction, change }) => {
  const formattedPrice = Number(price).toFixed(2);
  const formattedChange = change === 'n/a' ? change : Number(change).toFixed(2);

  return (
    <tr>
      <td>{time.toDateString()}</td>
      <td>{formattedPrice}</td>
      <td>{direction}</td>
      <td>{formattedChange}</td>
    </tr>
  )
};

export default TableRow;