const API_URL = 'http://localhost:5000/api/doctors';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'index.html';
}

async function loadDoctors() {
  const errorBox = document.getElementById('errorMessage');
  const spinner = document.getElementById('loadingSpinner');
  const table = document.getElementById('doctorsTable');

  try {
    const response = await fetch(API_URL, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const doctors = await response.json();

    if (!response.ok) {
      errorBox.textContent = doctors.message;
      errorBox.classList.remove('d-none');
      spinner.classList.add('d-none');
      return;
    }

    const tableBody = document.getElementById('doctorsTableBody');
    tableBody.innerHTML = '';

    doctors.forEach(doctor => {
      const row = `
        <tr>
          <td>${doctor.id}</td>
          <td>${doctor.name}</td>
          <td>${doctor.email}</td>
          <td>${doctor.specialization}</td>
          <td>${doctor.availability}</td>
          <td>${doctor.contact}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });

    spinner.classList.add('d-none');
    table.classList.remove('d-none');

  } catch (error) {
    errorBox.textContent = 'Server se connect nahi ho pa raha.';
    errorBox.classList.remove('d-none');
    spinner.classList.add('d-none');
  }
}

loadDoctors();

document.getElementById('addDoctorForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const userId = document.getElementById('userId').value;
  const specialization = document.getElementById('specialization').value;
  const availability = document.getElementById('availability').value;
  const contact = document.getElementById('contact').value;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId, specialization, availability, contact })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    bootstrap.Modal.getInstance(document.getElementById('addDoctorModal')).hide();
    document.getElementById('addDoctorForm').reset();
    loadDoctors();

  } catch (error) {
    alert('Server se connect nahi ho pa raha.');
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
});