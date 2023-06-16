document.addEventListener('DOMContentLoaded', function() {
  const getRequestButton = document.getElementById('getRequestButton');

  getRequestButton.addEventListener('click', function() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5500'
      },
      mode: 'cors',
      credentials: 'include'
    };

    fetch('http://localhost:4000/cookie', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Response:', data);
      })
      .catch(error => console.error(error));
  });
});
