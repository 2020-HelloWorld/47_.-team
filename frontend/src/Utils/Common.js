// return the user data from the session storage
export const getUser = () => {
  const userStr = { 
    name: localStorage.getItem('name'),
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role')
  }
  if (localStorage.getItem('token')) return JSON.parse(userStr);
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return localStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('name');
  localStorage.removeItem('role');
}

// set the token and user from the session storage
export const setUserSession = (token, username, name, role) => {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
  localStorage.setItem('name', name);
  localStorage.setItem('role', role);
}