import { useState } from "react";

import { ClipboardCopyIcon } from "@heroicons/react/outline";
import { copyToClipboard } from "../../services/utils";
import { toast } from "react-toastify";

export default function ListItemCBU({ data }) {
  const copy = (str) => {
    copyToClipboard(str);
    toast("Copiado al portapapeles");
  };

  return (
    <li className="flex  justify-between p-3 mt-4 mb-4 shadow-md rounded-md hover:text-gray-700">
      <div className="flex-initial">
        <div className="m-3">
          <h3 className={"text-indigo-600 font-bold"}>{data.numero}</h3>
          <h4>{data.cvu ? data.cvu : data.cbu}</h4>
          <p>{data.cvu ? "CVU" : "CBU"}</p>
        </div>
      </div>
      <div className="flex-initial">
        <ClipboardCopyIcon
          onClick={() => {
            copy(data.numero);
          }}
          className={"w-10 h-10 m-3 text-indigo-600 cursor-pointer"}
        ></ClipboardCopyIcon>
      </div>
    </li>
  );
}
