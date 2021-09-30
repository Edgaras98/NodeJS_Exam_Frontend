//Creating variables
const queryString = window.location.search;
const token = localStorage.getItem("token");
const params = queryString.split("=")[1];
const table = document.getElementById("billtable");
const urlBill = "http://localhost:3000/v1/content/bills";
const section = document.getElementById("grpbill");
const addBillForm = document.getElementById("addbill");

//GET Bill's details

fetch(`${urlBill}/${params}`, {
  headers: {
    authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      const tr = table.insertRow();
      const td1 = tr.insertCell();
      td1.textContent = element.id;

      const td3 = tr.insertCell();
      td3.textContent = `${element.amount}$`;

      const td4 = tr.insertCell();
      td4.textContent = element.description;
    });
  });

//POST new Bill by ID

addBillForm.addEventListener("submit", (e) => {
  const amount = document.getElementById("billinput").value;
  const description = document.getElementById("descinput").value;
  const group_id = params;
  e.preventDefault();
  fetch(`${urlBill}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ group_id, amount, description }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!group_id || !amount || !description) {
        alert("Please add details!");
      } else {
        location.reload();
      }
    })
    .catch((err) => {
      alert("Unexpected error please try again");
    });
});
