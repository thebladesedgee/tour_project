async function createUser(user) {
  const url = "http://localhost:5000/users/create";
  const data = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    telNumber: user.telNumber,
    password: user.password,
    customerType: user.customerType,
    gender: user.gender,
    identityNo: user.identityNo,
    passportNo: user.passportNo,
    dateOfBirth: user.dateOfBirth,
    //address: user.address,
    //corporate: user.corporate,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("User created successfully:", responseData);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const user = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      telNumber: document.getElementById("phone").value,
      password: document.getElementById("password").value,
      customerType: document.getElementById("customerType").value,
      gender: document.getElementById("gender").value,
      identityNo: document.getElementById("idNumber").value,
      passportNo: document.getElementById("passportNumber").value,
      dateOfBirth: document.getElementById("dob").value,
      //address: document.getElementById("address").value,
      //corporate: document.getElementById("corporate").checked,
    };

    createUser(user);
  });
