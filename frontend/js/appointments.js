const API_URL = 'https://hospital-management-system-h202.onrender.com/api/appointments';
const token = localStorage.getItem('token');

if (!token) {
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

async function loadAppointments() {
  const errorBox = document.getElementById('errorMessage');

  try {
    const response = await fetch(API_URL, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const appointments = await response.json();

    if (!response.ok) {
      errorBox.textContent = appointments.message;
      errorBox.classList.remove('d-none');
      return;
    }

    const tableBody = document.getElementById('appointmentsTableBody');
    tableBody.innerHTML = '';

    appointments.forEach(appt => {
      const row = `
        <tr>
          <td>${appt.id}</td>
          <td>${appt.patient_name}</td>
          <td>${appt.doctor_name}</td>
          <td>${appt.specialization}</td>
          <td>${new Date(appt.slot_time).toLocaleString()}</td>
          <td><span class="badge bg-secondary">${appt.status}</span></td>
          <td>
            <button class="btn btn-sm btn-success" onclick="updateStatus(${appt.id}, 'confirmed')">Confirm</button>
            <button class="btn btn-sm btn-danger" onclick="updateStatus(${appt.id}, 'cancelled')">Cancel</button>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });

  } catch (error) {
    errorBox.textContent = 'Server se connect nahi ho pa raha.';
    errorBox.classList.remove('d-none');
  }
}

loadAppointments();

// Naya appointment book karo
document.getElementById('bookForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const patientId = document.getElementById('patientId').value;
  const doctorId = document.getElementById('doctorId').value;
  const slotTimeRaw = document.getElementById('slotTime').value;

  // datetime-local se "2026-09-20T10:30" milta hai, MySQL ko "2026-09-20 10:30:00" chahiye
  const slotTime = slotTimeRaw.replace('T', ' ') + ':00';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ patientId, doctorId, slotTime })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message); // yahi wo jagah hai jaha "double-booking" error dikhega
      return;
    }

    bootstrap.Modal.getInstance(document.getElementById('bookModal')).hide();
    document.getElementById('bookForm').reset();
    loadAppointments();

  } catch (error) {
    alert('Server se connect nahi ho pa raha.');
  }
});

// Status change karo (confirm/cancel)
async function updateStatus(id, status) {
  try {
    const response = await fetch(`${API_URL}/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    loadAppointments(); // list refresh karo naya status dikhane ke liye

  } catch (error) {
    alert('Server se connect nahi ho pa raha.');
  }
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
});
