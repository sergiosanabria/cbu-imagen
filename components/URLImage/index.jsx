import { isValid } from "arg.js/src/cbu";
import { useState } from "react";
import { testImage } from "../../services/utils";

export default function URLImagen({
  url,
  onChangeUrl = (v) => {
    console.log(v);
  },
}) {
  const [valid, setValid] = useState(undefined);
  const onChangeInput = async (value) => {
    let isValid = false;
    if (!value) {
      isValid = true;
    } else {
      try {
        isValid = await testImage(value);
      } catch (error) {}
    }

    setValid(isValid);
    onChangeUrl(value, isValid);
  };
  return (
    <div className="w-full">
      <div className="mt-1 flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
          URL
        </span>
        <input
          type="text"
          value={url}
          onChange={({ target: { value } }) => {
            onChangeInput(value);
          }}
          className="p-3 font-size-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
          placeholder="https://www.example.com/cbu.jpg"
        />
      </div>
      {valid === false && (
        <p className="mt-2 text-sm text-red-500 text-left pl-16">
          La URL no es válida
        </p>
      )}
    </div>
  );
}
