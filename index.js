//Login Validation

const logInForm = document.getElementById("loginform");
const url = "http://localhost:3000/v1/auth/login";

logInForm.addEventListener("submit", (e) => {
  const emailLog = document.getElementById("emaillog");
  const passwordLog = document.getElementById("passwordlog");
  e.preventDefault();
  fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailLog.value,
      password: passwordLog.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.err) {
        return alert("Inccorrect details! please try again");
      } else if (emailLog && passwordLog) {
        localStorage.setItem("token", data.token);
        location.href = "content.html";
      } else {
        alert("Incorrect details provided! please try again or register");
      }
    });
});
