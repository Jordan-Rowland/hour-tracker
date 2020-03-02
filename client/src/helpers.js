export async function postFetchRequest(url, data, token=null) {
  const res = await fetch(
    url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ ...data, token: token }),
  });
  const response = await res.json();
  return response;
}

export async function deleteFetchRequest(url, token) {
  const res = await fetch(
    url, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ token: token }),
  });
  const response = await res.json();
  return response;
}
