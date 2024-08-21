document
  .getElementById("categoryForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const categoryName = document.getElementById("categoryName").value;
    const parentCategory = document.getElementById("parentCategory").value;
    const order = document.getElementById("order").value;
    const categoryLanguage = document.getElementById("categoryLanguage").value;
    const text = document.getElementById("text").value;

    const data = {
      name: categoryName,
      parentCategory: parentCategory,
      order: order,
      language: categoryLanguage,
      CategoryText: text,
    };

    fetch("http://localhost:5000/toursCategory/createTourCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert("Kategori başarıyla eklendi!");
          document.getElementById("categoryForm").reset(); // Clear the form after submission
        } else {
          alert("Kategori eklenirken bir hata oluştu.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Kategori eklenirken bir hata oluştu.");
      });
  });
