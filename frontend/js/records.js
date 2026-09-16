const API_URL = 'https://hospital-management-system-h202.onrender.com/api/auth';
const user = JSON.parse(localStorage.getItem('user'));

if (!token) {
  window.location.href = 'index.html';
}

// Role ke hisaab se decide karo kaunsa API call karna hai
const isAdmin = user.role === 'admin';
const API_URL = isAdmin
  ? 'http://localhost:5000/api/records/all'
  : 'http://localhost:5000/api/records/my-records';

document.getElementById('pageInfo').textContent = isAdmin
  ? 'Sab patients ke records (Admin view)'
  : 'Aapke apne medical records';

// Admin ko patient/doctor ka naam bhi dikhana hai, patient ko sirf doctor ka naam
const tableHead = document.getElementById('tableHead');
tableHead.innerHTML = isAdmin
  ? `<tr><th>ID</th><th>Patient</th><th>Doctor</th><th>Diagnosis</th><th>Prescription</th><th>Visit Date</th></tr>`
  : `<tr><th>ID</th><th>Doctor</th><th>Diagnosis</th><th>Prescription</th><th>Visit Date</th></tr>`;

async function loadRecords() {
  const errorBox = document.getElementById('errorMessage');

  try {
    const response = await fetch(API_URL, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const records = await response.json();

    if (!response.ok) {
      errorBox.textContent = records.message;
      errorBox.classList.remove('d-none');
      return;
    }

    const tableBody = document.getElementById('recordsTableBody');
    tableBody.innerHTML = '';

    if (records.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">Koi record nahi mila</td></tr>`;
      return;
    }

    records.forEach(rec => {
      const visitDate = new Date(rec.visit_date).toLocaleDateString();
      const row = isAdmin
        ? `<tr>
            <td>${rec.id}</td>
            <td>${rec.patient_name}</td>
            <td>${rec.doctor_name}</td>
            <td>${rec.diagnosis}</td>
            <td>${rec.prescription}</td>
            <td>${visitDate}</td>
          </tr>`
        : `<tr>
            <td>${rec.id}</td>
            <td>${rec.doctor_name}</td>
            <td>${rec.diagnosis}</td>
            <td>${rec.prescription}</td>
            <td>${visitDate}</td>
          </tr>`;
      tableBody.innerHTML += row;
    });

  } catch (error) {
    errorBox.textContent = 'Server se connect nahi ho pa raha.';
    errorBox.classList.remove('d-none');
  }
}

loadRecords();

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
});
