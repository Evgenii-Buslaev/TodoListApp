const input = document.querySelector(".new-task-input");
const addButton = document.querySelector(".new-task-submit");
const addedTasksContainer = document.querySelector(".container-output");
const addedTask = document.querySelector(".added-tasks");
const deadLine = document.querySelector(".new-task-deadline-input");
const clearAllBtn = document.querySelector(".clear-tasks");
const secondHeader = document.querySelector("h2");
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

addButton.addEventListener("click", function addTask() {
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
    if (editBtn.innerText.toLowerCase() == "edit") {
      taskOut.removeAttribute("readonly");
      taskOut.style.color = "#ec4899";
      taskOut.focus();
      editBtn.innerText = "Save";
    } else {
      taskOut.setAttribute("readonly", "readonly");
      editBtn.innerText = "Edit";

      // working with time
      const editDate = new Date();
      const editDay = editDate.getDate();
      const editMonth = editDate.getMonth();
      const editHour = editDate.getHours();
      const editMinutes = editDate.getMinutes();

      let editStr = `Edited on ${editDay} ${monthArray[editMonth]} at ${editHour}:${editMinutes}`;
      dateDiv.innerText = editStr;
      dateDiv.classList.add("edit_date");
    }
  });

  deleteBtn.addEventListener("click", () => {
    addedTasksContainer.removeChild(divTask);
    dateDiv.remove();
    dateTimerCont.remove();
  });

  input.value = "";

  // working with the time
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  const str = `Created on ${day} ${monthArray[month]} at ${hour}:${minutes}`;
  let dateTimerCont = document.createElement("div");
  dateTimerCont.classList.add("dates");

  let dateDiv = document.createElement("div");
  dateDiv.classList.add("date");

  dateDiv.innerText = str;
  dateTimerCont.appendChild(dateDiv);
  addedTasksContainer.append(dateTimerCont);

  // wordking with deadlines
  let start;
  if (deadLine.value <= 100 && deadLine.value > 0) {
    start = Date.now();
    let hours = deadLine.value - 1;
    let divDeadLine = document.createElement("div");
    divDeadLine.classList.add("timer");
    let seconds = 59;
    let minutes = 59;
    if (deadLine.value > 0 && deadLine.value < 1) {
      hours = 0;
      minutes = 60 * deadLine.value;
      seconds = 0;
    }
    dateTimerCont.appendChild(divDeadLine);
    let timer = setInterval(() => {
      let time = Date.now();
      seconds--;
      if (hours.toString().length < 2) {
        hours = "0" + hours;
      }
      if (minutes.toString().length < 2) {
        minutes = "0" + minutes;
      }
      if (seconds.toString().length < 2) {
        seconds = "0" + seconds;
      }
      if (seconds < 0) {
        minutes--;
        seconds = 59;
      }
      if (minutes < 0) {
        hours--;
        minutes = 59;
      }
      divDeadLine.innerText = `${hours}:${minutes}:${seconds}`;
      if ((time - start) / 3600000 > +hours + 1) {
        clearInterval(timer);
        divDeadLine.innerText = `You ran out of time`;
        alert("You ran out of time");
      }
    }, 1000);
  } else {
    if (deadLine.value > 100)
      alert(
        `Please, add your task with deadline later. You have enough time yet`
      );
    if (deadLine.value < 0) alert(`Wrong integer`);
  }
  deadLine.value = "";

  // working with the local storage
  localStorage.setItem("tasks", JSON.stringify(addedTasksContainer.innerHTML));
});

// working with the local storage

if (localStorage.getItem("tasks")) {
  let data = JSON.parse(localStorage.getItem("tasks"));

  console.log(secondHeader);

  addedTasksContainer.innerHTML = data;
  secondHeader.innerText = "You had the following tasks:";
  let paragragh = document.createElement("p");
  paragragh.innerText =
    "You had these task before you reload the page. You can clear this state by clicking the C/A button.";

  addedTasksContainer.prepend(paragragh);
}
clearAllBtn.onclick = () => {
  localStorage.clear();
  location.reload();
};

if (document.documentElement.clientWidth < 430) {
  deadLine.placeholder = "H-rs";
}
