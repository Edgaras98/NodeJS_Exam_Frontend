//Creating variables
const token = localStorage.getItem("token");
const urlContent = "http://localhost:3000/v1/content/accounts";
const addGroupForm = document.getElementById("addgroup");

//Getting Content

fetch(`${urlContent}`, {
  headers: {
    authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      //Creating variables
      const section = document.getElementById("groupselection");
      const div = document.createElement("div");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");
      //Styling components
      div.style.margin = "1rem";
      div.style.textAlign = "center";
      div.style.width = "10rem";
      div.style.height = "10rem";
      div.style.border = "1px solid black";
      div.style.borderRadius = "0.5rem";
      div.style.cursor = "pointer";
      //Redirection to item with id
      div.addEventListener("click", () => {
        location.href = `/bills.html?item=${element.id}`;
      });
      //
      h3.textContent = `ID: ${element.group_id}`;
      //
      p.textContent = element.name;
      //
      div.append(h3, p);
      //
      section.append(div);
    });
  });

//Posting new group

addGroupForm.addEventListener("submit", (e) => {
  const group_id = document.getElementById("groupinput").value;
  e.preventDefault();
  fetch(`${urlContent}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ group_id }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (token && group_id) {
        window.location.href = "content.html";
      } else {
        alert("Invalid data passed! please try again");
      }
    })
    .catch((err) => {
      alert("Unexpected error has occured please try again");
    });
});
