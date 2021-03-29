import React from 'react';

const TableRow = ({ time, price, change }) => {
  return (
    <tr>
      <td>{time.toDateString()}</td>
      <td>{price} USD</td>
      <td>{change} USD</td>
    </tr>
  )
};

export default TableRow;