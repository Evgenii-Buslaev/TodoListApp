const input = document.querySelector(".new-task-input");
const addButton = document.querySelector(".new-task-submit");
const addedTasksContainer = document.querySelector(".container-output");
const addedTask = document.querySelector(".added-tasks");

addButton.addEventListener("click", () => {
  let taskText = input.value;
  if (!taskText) {
    alert("Add some text");
    return;
  }

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

  editBtn.addEventListener("click", () => {
    if (editBtn.innerText.toLocaleLowerCase() == "edit") {
      taskOut.removeAttribute("readonly");
      taskOut.style.color = "#ec4899";
      taskOut.focus();
      editBtn.innerText = "Save";
    } else {
      taskOut.setAttribute("readonly", "readonly");
      editBtn.innerText = "Edit";
    }
  });

  deleteBtn.addEventListener("click", () => {
    addedTasksContainer.removeChild(divTask);
  });

  input.value = "";
});
