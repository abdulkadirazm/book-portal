const api = "http://localhost:8080"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Credentials':true
}

export const get = (userId) =>
  fetch(`${api}/users/${userId}`, { headers })
    .then(res => res.json())
    

export const getAll = () =>
  fetch(`${api}/users`,{headers}).then(res => res.json())
   

export const insert = (shelf) => 
  fetch(`${api}/users`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shelf)
  }).then(response => {
    if (response.status >= 200 && response.status < 300) {
        console.log(response);
        window.location.reload();
        alert("Successfull!!")
        return response;
      } else {
       console.log('Somthing happened wrong');
      }
}).catch(err => err);

export const update = (user, shelf) =>
  fetch(`${api}/users/${user.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const deleteUser = (query) =>
  fetch(`${api}/users/${query}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })