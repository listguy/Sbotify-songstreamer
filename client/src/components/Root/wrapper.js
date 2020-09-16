// Get data to display on screen from '/watch' entry points
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
    return Promise.reject(new Error(data));
  });
}

// Get all rows of a table, give filter (artist, album) to sort by, and/or order (title,date)
function getAllBy(table, filter, id, order) {
  if (!table) throw new Error(`Expected to get a string, got ${typeof table}`);

  const endpoint = `api/get_all/${table}?filter=${filter ? filter : ``}&id=${
    id ? id : ``
  }&order=${order ? order : ``}`;
  const headers = { "Content-Type": "application/json" };
  const config = {
    method: "GET",
    headers: headers,
  };

  console.log(
    `Sending ${config.method} All ${table} by ${filter}=${id} order${order} request to https://localhost:3001${endpoint}`
  );

  return fetch(endpoint, config).then(async (res) => {
    const data = await res.json();
    if (res.ok) return data;
    return Promise.reject(new Error(data));
  });
}

export { getAllBy, getFromDB };
//will add post handling later
