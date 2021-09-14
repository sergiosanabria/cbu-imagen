import { cbu } from "arg.js";
import Tesseract from "tesseract.js";

const CVU = [
  {
    codigo: "00000031",
    entidad: "Mercado Pago",
  },
  {
    codigo: "00000039",
    entidad: "BKR",
  },
  {
    codigo: "00000147",
    entidad: "Naranja X",
  },
  {
    codigo: "00000029",
    entidad: "Nubi",
  },
  {
    codigo: "00000277",
    entidad: "Paymovil",
  },
  {
    codigo: "00000013",
    entidad: "Prex",
  },
  {
    codigo: "00000741",
    entidad: "Propago",
  },
  {
    codigo: "00000079",
    entidad: "Ualá",
  },
];

export function testImage(url, timeoutT) {
  return new Promise(function (resolve, reject) {
    var timeout = timeoutT || 5000;
    var timer,
      img = new Image();
    img.onerror = img.onabort = function () {
      clearTimeout(timer);
      resolve(false);
    };
    img.onload = function () {
      clearTimeout(timer);
      resolve("success");
    };
    timer = setTimeout(function () {
      // reset .src to invalid URL so it stops previous
      // loading, but doesn't trigger new load
      img.src = "//!!!!/test.jpg";
      reject("timeout");
    }, timeout);
    img.src = url;
  });
}

export function copyToClipboard(str) {
  const el = document.createElement("textarea");
  el.value = str;
  console.log("Portapapeles", str);
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

export function readImage(image, logger = (m) => console.log(m)) {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(image, "spa", {
      logger: (m) => logger(m),
    })
      .then(({ data: { text } }) => {
        const list = findCBU(text);

        resolve(list);
      })
      .catch((err) => reject(err));
  });
}

export function findCBU(str) {
  let start = 0;
  let end = 22;

  let listCBU = [];
  while (end <= str.length) {
    const testCBU = str.substring(start, end);

    if (cbu.isValid(testCBU)) {
      let codigoEntidad = testCBU.substring(0, 8);
      const entidadCVU = CVU.find((c) => c.codigo == codigoEntidad);

      listCBU.push({
        numero: testCBU,
        cbu: cbu.getBankCode(testCBU) ? cbu.getAssociatedBank(testCBU) : null,
        cvu: entidadCVU ? entidadCVU.entidad : null,
      });
    }

    end++;
    start++;
  }

  return listCBU;
}
