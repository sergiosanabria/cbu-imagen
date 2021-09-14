import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { CloudUploadIcon } from "@heroicons/react/outline";

export default function ImageUpload({ onUploadImage }) {
  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const maxFileSize = 8000000;
  const btnStyle =
    "flex flex-wrap items-center justify-around text-2xl border-2 border-dashed text-gray-500 p-10 mb-5 sm:m-2";
  const btnNoDragg = "border-gray-300 ";
  const btnDragg = "text-gray-300 border-gray-100";
  const acceptType = ["jpg", "jpeg", "HEIC", "gif", "png"];

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);

    if (imageList.length > 0) {
      onUploadImage(imageList[0]);
    }
    // setImages(imageList);
  };

  return (
    <div className="w-full">
      <ImageUploading
        value={images}
        onChange={onChange}
        acceptType={acceptType}
        maxFileSize={maxFileSize}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          // write your building UI
          <div className="w-full">
            <button
              onClick={onImageUpload}
              {...dragProps}
              className={
                isDragging
                  ? `${btnStyle} ${btnDragg}`
                  : `${btnStyle} ${btnNoDragg}`
              }
            >
              <div>
                <CloudUploadIcon
                  className={`w-20 h-20 text-indigo-600 ${
                    isDragging ? "text-indigo-200" : ""
                  }`}
                ></CloudUploadIcon>
              </div>
              <div className={"w-full pt-4"}>
                {" "}
                Hacé un click o arrastrá una imagen
              </div>
            </button>

            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}

            {errors && (
              <div className="text-red-600 mt-1">
                {errors.maxNumber && (
                  <span>Number of selected images exceed maxNumber</span>
                )}
                {errors.acceptType && (
                  <span>El tipo de archivo seleccionado no está permitido</span>
                )}
                {errors.maxFileSize && (
                  <span>
                    El archivo seleccionado exedece el tamaño máximo permitido
                    de 10 MB
                  </span>
                )}
                {errors.resolution && (
                  <span>
                    Selected file is not match your desired resolution
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
