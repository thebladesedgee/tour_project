document
  .getElementById("newServiceForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const serviceName = document.getElementById("serviceName").value;
    const shortDescription = document.getElementById("shortDescription").value;
    const unitPrice = document.getElementById("unitPrice").value;
    const currency = document.getElementById("currency").value;
    const mandatory = document.getElementById("mandatory").checked;

    const newServiceData = {
      serviceNmae: serviceName,
      introduction: shortDescription,
      price: parseFloat(unitPrice),
      exchangeType: currency,
      isNecessary: mandatory,
    };

    fetch("http://localhost:5000/otherservice/createOtherService", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newServiceData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or show a message
        console.log("Service created successfully:", data);
        alert("Hizmet başarıyla oluşturuldu!");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        alert("Hizmet oluşturulurken bir hata oluştu.");
      });
  });
