document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/inbox/getInboxes") // Bu, API'nizin endpointine uygun olmalıdır.
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("table tbody");
      tableBody.innerHTML = ""; // Tabloyu temizle

      data.forEach((inbox) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td style="width: 30px">
              <input type="checkbox" />
            </td>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <i class="fas fa-star text-warning"></i>
            </td>
            <td>
              <strong>${inbox.email}</strong><br />
              ${inbox.Subject}: ${inbox.message}
            </td>
            <td class="text-right" style="width: 200px">
              ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
            </td>
          `;

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error:", error));
});
