//Registration validation and Posting to DB
const regForm = document.getElementById("regform");
const url = "http://localhost:3000/v1/auth/register";

regForm.addEventListener("submit", (e) => {
  const fullname = document.getElementById("fullname");
  const clientEmail = document.getElementById("clientemail");
  const password = document.getElementById("password");
  const passwordRep = document.getElementById("repeatpassword");
  if (password.value !== passwordRep.value) {
    return alert("Passwords dont match!");
  }
  e.preventDefault();
  fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: fullname.value,
      email: clientEmail.value,
      password: password.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.err) {
        return alert("Inccorrect details! please try again");
      } else if (fullname && clientEmail && password) {
        localStorage.setItem("token", data.token);
        alert("Succesfull registration!");
        location.href = "index.html";
      } else {
        alert("Inccorect detailes provided! please try again");
      }
    })
    .catch((err) => {
      alert("unexpected error has occured!");
    });
});
