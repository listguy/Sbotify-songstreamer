// Get data to display on screen from '/watch' entry points
function getFromDB(endpoint) {
  const headers = {
    "Content-Type": "application/json",
    "auth-token": getToken(),
  };
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
    if (res.status === 403) {
      window.location = "/login";
    }
    return Promise.reject(new Error(data));
  });
}

// // Get all rows of a table, give filter (artist, album) to sort by, and/or order (title,date)
// function getAllBy(table, filter, id, order, limit, offset) {
//   if (!table) throw new Error(`Expected to get a string, got ${typeof table}`);

//   const endpoint = `/api/get_all/${table}?filter=${filter ? filter : ``}&id=${
//     id ? id : ``
//   }&order=${order ? order : ``}&limit=${limit ? limit : 10000000}&offset=${
//     offset ? offset : 0
//   }`;
//   const headers = { "Content-Type": "application/json" };
//   const config = {
//     method: "GET",
//     headers: headers,
//   };

//   console.log(
//     `Sending ${config.method} All ${table} by ${filter}=${id} order: ${order} limit: ${limit} offset: ${offset} request to https://localhost:3001${endpoint}`
//   );

//   return fetch(endpoint, config).then(async (res) => {
//     const data = await res.json();
//     if (res.ok) return data;
//     return Promise.reject(new Error(data));
//   });
// }

const getToken = () => {
  return localStorage.getItem("LIT");
};

// Get By Id
function getSingleById(type, id) {
  const headers = {
    "Content-Type": "application/json",
    "auth-token": getToken(),
  };

  const config = {
    method: "GET",
    headers: headers,
  };

  console.log(
    `Sending ${config.method} ${type} by id=${id} request to https://localhost:3001/${type}/${id}`
  );

  return fetch(`/${type}/${id}`, config).then(async (res) => {
    const data = await res.json();

    if (res.ok) {
      return data;
    }
    if (res.status === 403) {
      window.location = "/login";
    }
    return Promise.reject(new Error(data));
  });
}

function getAll(type, order, limit) {
  const headers = {
    "Content-Type": "application/json",
    "auth-token": getToken(),
  };
  const config = {
    method: "GET",
    headers: headers,
  };
  const path = `${type}${order ? `?order=${order}` : ``}${
    limit ? `&limit=${limit}` : ``
  }`;

  console.log(
    `Sending ${config.method} all ${type} ${
      order ? `order by ${order}` : ``
    } request to https://localhost:3001/${path}`
  );

  return fetch("/" + path, config).then(async (res) => {
    const data = await res.json();

    if (res.ok) {
      return data;
    }
    if (res.status === 403) {
      window.location = "/login";
    }
    return Promise.reject(new Error(data));
  });
}

function search(query) {
  const headers = { "Content-Type": "application/json" };
  const config = {
    method: "GET",
    headers: headers,
  };
  const path = `search?query=${query}`;

  console.log(
    `Sending search ${config.method} request to https://localhost:3001/${path}`
  );

  return fetch("/" + path, config).then(async (res) => {
    const data = await res.json();
    if (res.ok) {
      return data;
    }
    return Promise.reject(new Error(data));
  });
}

function login(cardentials) {
  const headers = {
    "Content-Type": "application/json",
  };

  const config = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(cardentials),
  };

  console.log(
    `Sending ${config.method} request to https://localhost:3001/user/login`
  );

  return fetch(`/user/login`, config).then(async (res) => {
    const data = await res.json();

    if (res.ok || res.status === 400) {
      return data;
    }
    return Promise.reject(new Error(data));
  });
}

function register(cardentials) {
  const headers = {
    "Content-Type": "application/json",
  };

  const config = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(cardentials),
  };

  console.log(
    `Sending ${config.method} request to https://localhost:3001/user/register`
  );

  return fetch(`/user/register`, config).then(async (res) => {
    const data = await res.json();

    if (res.ok || res.status === 400) {
      return data;
    }
    return Promise.reject(new Error(data));
  });
}
function searchElastic(query, specificIndex) {
  const headers = { "Content-Type": "application/json" };
  const config = {
    method: "GET",
    headers: headers,
  };
  const index = specificIndex ? `/${specificIndex}` : "";
  const path = `search${index}?search=${query}`;

  console.log(
    `Sending search elastic ${config.method} request to https://localhost:3001/${path}`
  );

  return fetch("/" + path, config).then(async (res) => {
    const data = await res.json();
    if (res.ok) {
      return data;
    }
    return Promise.reject(new Error(data));
  });
}

export {
  getFromDB,
  getSingleById,
  getAll,
  search,
  login,
  register,
  searchElastic,
};
//will add post handling later
