export default function api_headers() {
  // let token = JSON.parse(window.localStorage.getItem("token"));
  // const header = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     Accept: "application/json",
  //   },
  // };
  // return header;
  // let token = JSON.parse(window.localStorage.getItem("token"));
  // let token2 = token.replace(/^"(.*)"$/, "$1");
  let token2 = window.localStorage.getItem("token");
  const header = {
    headers: {
      Authorization: `Bearer ${token2}`,
      Accept: "application/json",
    },
  };
  return header;
}
