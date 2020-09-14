function getFromDB(endpoint) {
  const headers = { "Content-Type": "application/json" };
  const config = {
    method: "GET",
    headers: headers,
  };

  console.log(
    `Sending ${config.method} request to https://localhost:3001${endpoint}`
  );

  return fetch(endpoint, config).then(async (res) => {
    const data = await res.json();
    if (res.ok) return data;
    return Promise.reject(data);
  });
}

function goToPage(type, id) {
  window.location.assign(
    `${window.location.protocol}//${window.location.host}/watch/${type}/${id}`
  );
}

export { goToPage, getFromDB };
//will add post handling later