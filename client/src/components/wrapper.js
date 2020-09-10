export default function getFromDB(endpoint) {
  const headers = { "Content-Type": "application/json" };
  const config = {
    method: "GET",
    headers: headers,
  };

  console.log(
    `Sending ${config.method} request to https://localhost:3001${endpoint}`
  );

  return fetch(endpoint, config).then(async (res) => {
    console.log(res);
    const data = await res.json();
    if (res.ok) return data;
    return Promise.reject(data);
  });
}
//will add post handling later
