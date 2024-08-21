//İnbox:
// document.addEventListener('DOMContentLoaded', function () {
//   fetch('/api/inboxes') // Bu, API'nizin endpointine uygun olmalıdır.
//     .then(response => response.json())
//     .then(data => {
//       const tableBody = document.querySelector('table tbody');
//       tableBody.innerHTML = ''; // Tabloyu temizle

//       data.forEach(inbox => {
//         const row = document.createElement('tr');

//         row.innerHTML = `
//           <td style="width: 30px">
//             <input type="checkbox" />
//           </td>
//           <td>
//             <input type="checkbox" />
//           </td>
//           <td>
//             <i class="fas fa-star text-warning"></i>
//           </td>
//           <td>
//             <strong>${inbox.email}</strong><br />
//             ${inbox.Subject}: ${inbox.message}
//           </td>
//           <td class="text-right" style="width: 200px">
//             ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
//           </td>
//         `;

//         tableBody.appendChild(row);
//       });
//     })
//     .catch(error => console.error('Error:', error));
// });

//Müsteriler:

// document.addEventListener('DOMContentLoaded', function () {
//   fetch('/api/users') // Bu, API'nizin endpointine uygun olmalıdır.
//     .then(response => response.json())
//     .then(users => {
//       const tableBody = document.querySelector('table tbody');
//       tableBody.innerHTML = ''; // Tabloyu temizle

//       users.forEach(user => {
//         const row = document.createElement('tr');

//         row.innerHTML = `
//           <td><input type="checkbox" /></td>
//           <td><a href="#">${user.id}</a></td>
//           <td><a href="#">${user.firstName} ${user.lastName}</a></td>
//           <td>${user.email}</td>
//           <td>${user.registrationDate ? new Date(user.registrationDate).toLocaleDateString() : ''}</td>
//           <td>${user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleDateString() : ''}</td>
//           <td>${user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : ''}</td>
//           <td>${user.reservations ? user.reservations.length : 0}</td>
//           <td>${user.customerType}</td>
//           <td>
//             <button class="btn btn-outline-secondary btn-sm">
//               <i class="fas fa-search"></i>
//             </button>
//             <button class="btn btn-outline-secondary btn-sm">
//               <i class="fas fa-envelope"></i>
//             </button>
//           </td>
//         `;

//         tableBody.appendChild(row);
//       });
//     })
//     .catch(error => console.error('Error:', error));
// });

//Kara liste :

{
  /* <div class="d-flex justify-content-between mb-3">
  <div>
    <label for="recordsPerPage">Sayfada</label>
    <select id="recordsPerPage" class="form-select form-select-sm d-inline-block w-auto">
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
    </select>
    kayıt göster
  </div>
  <div>
    <input type="text" class="form-control form-control-sm" placeholder="Ara..." />
  </div>
</div> */
}
{
  /* <table class="table table-bordered">
  <thead>
    <tr>
      <th>ID</th>
      <th>Kullanıcı</th>
      <th>Email</th>
      <th>Kayıt Tarihi</th>
      <th>Son Giriş</th>
      <th>TC Kimlik No</th>
      <th>İşlemler</th>
    </tr>
  </thead>
  <tbody id="user-table-body">
    <tr>
      <td colspan="7" class="text-center">
        Tabloda herhangi bir veri mevcut değil
      </td>
    </tr>
  </tbody>
</table>
<div class="d-flex justify-content-between">
  <div id="record-count">Kayıt yok</div>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#">Önceki</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">Sonraki</a>
      </li>
    </ul>
  </nav>
</div> */
}

{
  /* <script>
  document.addEventListener("DOMContentLoaded", function () {
    fetch("/users/blacklisted")  // API endpoint to fetch blacklisted users
      .then(response => response.json())
      .then(users => {
        const userTableBody = document.getElementById("user-table-body");
        const recordCount = document.getElementById("record-count");
        
        userTableBody.innerHTML = ""; // Clear existing rows
        
        if (users.length > 0) {
          users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${user.id}</td>
              <td>${user.firstName} ${user.lastName}</td>
              <td>${user.email}</td>
              <td>${new Date(user.registrationDate).toLocaleDateString()}</td>
              <td>${user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleDateString() : "N/A"}</td>
              <td>${user.identityNo}</td>
              <td>
                <button class="btn btn-outline-secondary btn-sm">
                  <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm">
                  <i class="fas fa-envelope"></i>
                </button>
              </td>
            `;
            userTableBody.appendChild(row);
          });
          recordCount.textContent = `${users.length} kayıt bulundu`;
        } else {
          const noDataRow = document.createElement("tr");
          noDataRow.innerHTML = `
            <td colspan="7" class="text-center">
              Kara listede kullanıcı bulunamadı
            </td>
          `;
          userTableBody.appendChild(noDataRow);
          recordCount.textContent = "Kayıt yok";
        }
      })
      .catch(error => console.error("Kara liste kullanıcıları yüklenirken hata oluştu:", error));
  });
</script> */
}
