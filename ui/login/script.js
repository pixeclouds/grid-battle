document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const username = document.querySelector('#username').value;
      const password = document.querySelector('#password').value;
  
      // Perform AJAX request to send login/signup data to backend
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      localStorage.setItem('user', data.token)
      console.log(data); // Handle the response from the backend
    });
  });
  