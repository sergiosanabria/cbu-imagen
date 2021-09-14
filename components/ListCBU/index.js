import { useState } from "react";
import ListItemCBU from "../ListItemCBU";

export default function ListCBU({ list = [] }) {
  return (
    <div className="bg-white  ">
      <ul>
        {list.map((data, index) => (
          <ListItemCBU key={index} data={data}></ListItemCBU>
        ))}
      </ul>
    </div>
  );
}
