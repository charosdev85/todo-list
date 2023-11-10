"use strict";

let data = [];
let id = 0;

// Buttons
const plusBtn = document.querySelector(".plusBtn");
const createButton = document.querySelector(".button");
// form
const form = document.querySelector(".form");
// input
const input = document.querySelector(".input");
// list
const list = document.querySelector(".list");

// event
plusBtn.addEventListener("click", (e) => {
  e.currentTarget.classList.add("hide");
  form.classList.remove("hide");
});

// create element
const createElement = () => {
  list.innerHTML = "";
  data.forEach((o) => {
    list.insertAdjacentHTML(
      "afterbegin",
      ` <li class="list-item ${o.isChecked === true ? "checked" : ""} ${
        o.isChecked === false ? "no-checked" : ""
      }" data-set="${o.id}">
      <span>${o.name}</span>
      <div class="actions">
        <span class="edit-s"> edit </span>
        <span class="delete-s"> del </span>
        <span class="checked-s"> check</span>
        <span class="no-checked-s"> no check </span>
      </div>
    </li>`
    );
  });
};

createButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (id !== 0) {
    data = data.map((d) => {
      if (d.id === id) {
        return {
          id: d.id,
          name: input.value,
          isChecked: d.isChecked,
        };
      } else {
        return d;
      }
    });
  } else {
    const date = new Date();
    const obj = {
      id: date.getTime(),
      name: input.value,
      isChecked: undefined,
    };
    data.push(obj);
  }
  form.classList.add("hide");
  plusBtn.classList.remove("hide");
  input.value = "";
  createElement();
});

const deleteEl = (dataset) => {
  data = data.filter((d) => dataset !== d.id);
  createElement();
};

list.addEventListener("click", (e) => {
  const dataset = +e.target.parentElement.parentElement.dataset.set;
  const target = e.target.classList[0];
  if (target === "checked-s") {
    data = data.map((d) => {
      if (d.id === dataset) {
        return {
          id: d.id,
          name: d.name,
          isChecked: true,
        };
      } else {
        return d;
      }
    });
    createElement();
  } else if (target === "no-checked-s") {
    data = data.map((d) => {
      if (d.id === dataset) {
        return {
          id: d.id,
          name: d.name,
          isChecked: false,
        };
      } else {
        return d;
      }
    });
    id = 0;
    createElement();
  } else if (target === "delete-s") {
    deleteEl(dataset);
  } else if (target === "edit-s") {
    plusBtn.classList.add("hide");
    form.classList.remove("hide");
    input.value = data.filter((d) => dataset === d.id)[0].name;
    id = dataset;
  }
});
