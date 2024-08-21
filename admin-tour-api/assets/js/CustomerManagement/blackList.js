document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/users/getUsers")
    .then((response) => response.json())
    .then((users) => {
      const tbody = document.querySelector("table tbody");
      tbody.innerHTML = ""; // Tabloyu temizle

      const blacklistedUsers = users.filter((user) => user.isBlackList);

      if (blacklistedUsers.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML =
          '<td colspan="7" class="text-center">Tabloda herhangi bir veri mevcut değil</td>';
        tbody.appendChild(row);
      } else {
        blacklistedUsers.forEach((user) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${user.id}</td>
              <td>${user.firstName} ${user.lastName}</td>
              <td>${user.email}</td>
              <td>${
                user.registrationDate
                  ? new Date(user.registrationDate).toLocaleDateString()
                  : ""
              }</td>
              <td>${
                user.lastLoginDate
                  ? new Date(user.lastLoginDate).toLocaleDateString()
                  : ""
              }</td>
              <td>${user.identityNo}</td>
              <td>
                <button class="btn btn-outline-secondary btn-sm" onclick="viewUser(${
                  user.id
                })">
                  <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm" onclick="sendEmail(${
                  user.id
                })">
                  <i class="fas fa-envelope"></i>
                </button>
              </td>
            `;
          tbody.appendChild(row);
        });
      }
    })
    .catch((error) =>
      console.error("Kullanıcı verileri yüklenirken hata oluştu:", error)
    );
});
