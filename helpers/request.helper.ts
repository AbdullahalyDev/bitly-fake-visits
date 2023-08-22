import http from "http";

export default class Request {
  static async visit(code: string) {
    return new Promise(function (resolve) {
      http.get(
        {
          hostname: "bit.ly",
          path: `/${code}`,
          headers: {
            "User-Agent": "AppleWebKit/537.36",
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
