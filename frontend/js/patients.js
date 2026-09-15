const API_URL = 'http://localhost:5000/api/patients';
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'index.html';
}

// Sab patients load karke table mein dikhao
async function loadPatients() {
  const errorBox = document.getElementById('errorMessage');
  const spinner = document.getElementById('loadingSpinner');
  const table = document.getElementById('patientsTable');

  try {
    const response = await fetch(API_URL, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const patients = await response.json();

    if (!response.ok) {
      errorBox.textContent = patients.message;
      errorBox.classList.remove('d-none');
      spinner.classList.add('d-none');
      return;
    }

    const tableBody = document.getElementById('patientsTableBody');
    tableBody.innerHTML = ''; // pehle purana data saaf karo

    patients.forEach(patient => {
      const row = `
        <tr>
          <td>${patient.id}</td>
          <td>${patient.name}</td>
          <td>${patient.email}</td>
          <td>${patient.age}</td>
          <td>${patient.gender}</td>
          <td>${patient.contact}</td>
          <td>${patient.address}</td>
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

loadPatients();

// Naya patient add karo
document.getElementById('addPatientForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const userId = document.getElementById('userId').value;
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const contact = document.getElementById('contact').value;
  const address = document.getElementById('address').value;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId, age, gender, contact, address })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    // Modal band karo aur list refresh karo
    bootstrap.Modal.getInstance(document.getElementById('addPatientModal')).hide();
    document.getElementById('addPatientForm').reset();
    loadPatients();

  } catch (error) {
    alert('Server se connect nahi ho pa raha.');
  }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
});