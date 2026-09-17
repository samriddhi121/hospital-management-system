const API_URL = 'https://hospital-management-system-h202.onrender.com/api/auth';

// Pehle check karo ki user logged in hai ya nahi
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (!token) {
  // Agar token nahi hai, matlab login nahi kiya - wapas login page bhejo
  window.location.href = 'index.html';
}

window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      window.location.href = 'index.html';
    }
  }
});

// User ka naam dikhao
document.getElementById('userName').textContent = `${user.name} (${user.role})`;

// Welcome banner update karo
document.getElementById('welcomeName').textContent = user.name;

const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('currentDate').textContent = today.toLocaleDateString('en-IN', options);

// Dashboard stats load karo (sirf Admin ke liye kaam karega)
async function loadDashboard() {
  try {
    const response = await fetch(`${API_URL}/dashboard`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      console.log('Dashboard data load nahi hui (shayad Admin nahi ho)');
      return;
    }

    const data = await response.json();
    document.getElementById('totalPatients').textContent = data.total_patients;
    document.getElementById('totalDoctors').textContent = data.total_doctors;
    document.getElementById('todayAppointments').textContent = data.today_appointments;

  } catch (error) {
    console.error('Error:', error);
  }
}

loadDashboard();

// Logout button
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
});
