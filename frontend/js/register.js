const API_URL = 'http://localhost:5000/api/auth';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const errorBox = document.getElementById('errorMessage');
  const successBox = document.getElementById('successMessage');
  errorBox.classList.add('d-none');
  successBox.classList.add('d-none');

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await response.json();

    if (!response.ok) {
      errorBox.textContent = data.message;
      errorBox.classList.remove('d-none');
      return;
    }

    successBox.textContent = 'Register ho gaya! Ab login karo...';
    successBox.classList.remove('d-none');

    // 2 second baad login page pe bhej do
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);

  } catch (error) {
    errorBox.textContent = 'Server se connect nahi ho pa raha.';
    errorBox.classList.remove('d-none');
  }
});