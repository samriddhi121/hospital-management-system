const API_URL = 'https://hospital-management-system-h202.onrender.com/api/auth';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorBox = document.getElementById('errorMessage');

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      errorBox.textContent = data.message;
      errorBox.classList.remove('d-none');
      return;
    }

    // Token aur user info save karo browser mein
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // Login successful, dashboard pe le jao
    window.location.href = 'dashboard.html';

  } catch (error) {
    errorBox.textContent = 'Server se connect nahi ho pa raha. Backend chal raha hai check karo.';
    errorBox.classList.remove('d-none');
  }
});
