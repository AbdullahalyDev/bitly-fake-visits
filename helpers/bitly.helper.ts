import http from "http";

export default class Bitly {
  static async valdiate(code: string) {
    return new Promise(function (resolve) {
      http.get(
        {
          hostname: "bit.ly",
          path: `/${code}`,
          headers: {
            "User-Agent": "",
          },
        },
        function (response) {
          if (response.statusCode) {
            if (response.statusCode === 301) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            resolve(false);
          }
        }
      );
    });
  }
}
