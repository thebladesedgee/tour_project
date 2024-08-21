document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/users/getUsers") // Bu, API'nizin endpointine uygun olmalıdır.
    .then((response) => response.json())
    .then((users) => {
      const tableBody = document.querySelector("table tbody");
      tableBody.innerHTML = ""; // Tabloyu temizle

      users.forEach((user) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            
            <td><a href="#">${user.id}</a></td>
            <td><a href="#">${user.firstName} ${user.lastName}</a></td>
            <td>${user.email}</td>
            <td>${user.telNumber}</td>
            <td>${user.registrationDate}</td>
            <td>${user.lastLoginDate}</td>
            <td>${user.dateOfBirth}</td>
            <td>${user.reservations ? user.reservations.length : 0}</td>
            <td>${user.customerType}</td>
            <td>
              <button class="btn btn-outline-secondary btn-sm">
                <i class="fas fa-search"></i>
              </button>
              <button class="btn btn-outline-secondary btn-sm">
                <i class="fas fa-envelope"></i>
              </button>
            </td>
          `;

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error:", error));
});
