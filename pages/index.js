import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import ImageUpload from "../components/ImageUpload";
import ListCBU from "../components/ListCBU";
import { copyToClipboard, readImage } from "../services/utils";
import { ToastContainer, toast } from "react-toastify";
import URLImagen from "../components/URLImage";

export default function Home() {
  const [reading, setReading] = useState(false);
  const [listCBU, setListCBU] = useState([]);
  const [url, setUrl] = useState("");
  const [progressValue, setProgressValue] = useState(0);

  const logReadImage = (data) => {
    if (data && data.status == "recognizing text") {
      setProgressValue(data.progress);
      // if ((data.progress, data.progress == 1)) {
      //   setReading(false);
      // }
    }
  };

  const copy = (str) => {
    setTimeout(() => {
      copyToClipboard(str);
    }, 1000);
    toast("Copiado al portapapeles");
  };

  const onChangeUrl = (url, isValid) => {
    setUrl(url);

    if (url && isValid) {
      onUploadImage(url);
    }
  };

  const onUploadImage = async (image) => {
    try {
      setReading(true);
      setListCBU([]);
      setProgressValue(0);

      let list = await readImage(
        typeof image === "string" ? image : image.data_url,
        logReadImage
      );

      setReading(false);
      if (list.length == 1) {
        // copy(list[0].numero);
      }

      document.getElementById("scroll-to-here").scrollIntoView();

      setListCBU(list);
    } catch (error) {}
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-5 text-center mb-5">
        <h1 className="text-6xl font-bold">
          Bienvenidos a <span className="text-indigo-600">CBU.JPG</span>
        </h1>

        <p className="mt-3 text-2xl text-gray-500">
          Extraé la CBU de una imagen, al toque 🤙🏻
        </p>

        <div className="flex flex-col items-center justify-around max-w-4xl mt-6 ">
          {!reading && (
            <div>
              <URLImagen onChangeUrl={onChangeUrl}></URLImagen>
              <div className="text-gray-500 m-5">O bien</div>
              <ImageUpload onUploadImage={onUploadImage}></ImageUpload>
            </div>
          )}

          {reading && (
            <div
              className={"w-full"}
              style={{ width: "13rem", height: "13rem" }}
            >
              <p className="m-2 text-indigo-600">Analizando imagen</p>
              <CircularProgressbar
                value={progressValue}
                maxValue={1}
                text={`${(progressValue * 100).toFixed(0)}%`}
              />
            </div>
          )}
          {!reading && progressValue == 1 && listCBU.length > 0 && (
            <div className={"w-full"}>
              <h2 className="text-green-700 text-3xl mt-8 tracking-wide font-bold">
                ¡Encotramos {listCBU.length} CBU!
              </h2>
              <h2 className="text-3xl mb-5 mt-1">🎉🚀🎉</h2>
            </div>
          )}
          {!reading && progressValue == 1 && listCBU.length == 0 && (
            <div className={"w-full"}>
              <h1 className="text-red-500 text-3xl mt-8 mb-5 tracking-wide font-bold">
                No encontramos una CBU 😔
              </h1>
            </div>
          )}

          {listCBU.length > 0 && (
            <div className={"w-full"}>
              <ListCBU list={listCBU}></ListCBU>
            </div>
          )}
        </div>
      </main>

      <footer
        id="scroll-to-here"
        className="flex items-center justify-center w-full  h-16 border-t"
      >
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hecho con ❤️💙🤍 en Misiones
        </a>
      </footer>
      <ToastContainer
        autoClose={3500}
        hideProgressBar={true}
        toastClassName={"toast-app"}
      />
    </div>
  );
}
