const input = document.querySelector(".new-task-input");
const addButton = document.querySelector(".new-task-submit");
const addedTasksContainer = document.querySelector(".container-output");
const addedTask = document.querySelector(".added-tasks");

let monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

addButton.addEventListener("click", () => {
  // check if user did't fill in the form
  let taskText = input.value;
  if (!taskText) {
    alert("Add some text");
    return;
  }
  // adding a new task block
  let divTask = document.createElement("div");
  divTask.classList.add("tasks");
  addedTasksContainer.appendChild(divTask);

  let taskOut = document.createElement("input");
  taskOut.setAttribute("readonly", "readonly");
  taskOut.id = "task";
  divTask.appendChild(taskOut);
  taskOut.placeholder = taskText;

  let divBtns = document.createElement("div");
  divBtns.classList.add("edit-buttons");
  divTask.appendChild(divBtns);

  let editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.innerText = "Edit";

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerText = "Delete";

  divBtns.appendChild(editBtn);
  divBtns.appendChild(deleteBtn);

  //functions of the 'a new task''s block:

  editBtn.addEventListener("click", () => {
    if (editBtn.innerText.toLocaleLowerCase() == "edit") {
      taskOut.removeAttribute("readonly");
      taskOut.style.color = "#ec4899";
      taskOut.focus();
      editBtn.innerText = "Save";
    } else {
      taskOut.setAttribute("readonly", "readonly");
      editBtn.innerText = "Edit";

      // working with time
      const editDate = new Date();
      const editDay = date.getDate();
      const editMonth = date.getMonth();
      const editHour = date.getHours();
      const editMinutes = date.getMinutes();

      let editStr = `Edited on ${editDay} ${monthArray[editMonth]} at ${editHour}:${editMinutes}`;
      dateDiv.innerText = editStr;
      dateDiv.classList.add("edit_date");
    }
  });

  deleteBtn.addEventListener("click", () => {
    addedTasksContainer.removeChild(divTask);
    dateDiv.remove();
  });

  input.value = "";
  // working with the time
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  const str = `Created on ${day} ${monthArray[month]} at ${hour}:${minutes}`;

  let dateDiv = document.createElement("div");
  dateDiv.classList.add("date");

  dateDiv.innerText = str;
  addedTasksContainer.append(dateDiv);
});
