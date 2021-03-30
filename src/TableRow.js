import React, { useState } from "react";
import format from "date-fns/format";

const TableRow = ({ time, price, prevPrice, direction, change }) => {
  const [highlighted, setHighlight] = useState(false);
  const formattedPrice = Number(price).toFixed(2);
  const formattedPrevPrice =
    prevPrice === "na" ? prevPrice : Number(prevPrice).toFixed(2);
  const formattedChange = change === "na" ? change : Number(change).toFixed(2);
  const dateFormat = format(time, "yyyy-MM-dd").concat(
    "T",
    format(time, "HH:mm:ss")
  );

  const rowClick = async (e) => {
    try {
      const requestURL = `http://www.example.com/save_hits?priceDate=${dateFormat}&priceClick=${formattedPrice}&previousPriceClick=${formattedPrevPrice}`;
      const networkRequest = await fetch(requestURL, { mode: 'no-cors' });
      console.log(networkRequest);
    } catch (e) {
      console.error(e);
    }

    setHighlight(highlighted ? false : true);
  };

  const style = {
    backgroundColor: highlighted ? "#abbfff" : null,
  };

  return (
    <tr onClick={rowClick} style={style}>
      <td>{dateFormat}</td>
      <td>{formattedPrice}</td>
      <td>{direction}</td>
      <td>{formattedChange}</td>
      <td>{time.toLocaleDateString("en-US", { weekday: "long" })}</td>
    </tr>
  );
};

export default TableRow;
