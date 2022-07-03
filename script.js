const input = document.querySelector(".new-task-input");
const addButton = document.querySelector(".new-task-submit");
const addedTasksContainer = document.querySelector(".container-output");
const addedTask = document.querySelector(".added-tasks");
const deadLine = document.querySelector(".new-task-deadline-input");
const clearAllBtn = document.querySelector(".clear-tasks");
const secondHeader = document.querySelector("h2");

let monthArray = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

addButton.addEventListener("click", function addTask() {
  // check if user did't fill in the form
  let taskText = input.value;
  if (!taskText) {
    alert("Пожалуйста, напишите текст");
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
  editBtn.innerText = "Изменить";

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerText = "Удалить";

  divBtns.appendChild(editBtn);
  divBtns.appendChild(deleteBtn);

  //functions of the 'a new task''s block:

  editBtn.addEventListener("click", () => {
    if (editBtn.innerText.toLowerCase() == "изменить") {
      taskOut.removeAttribute("readonly");
      taskOut.style.color = "#ec4899";
      taskOut.focus();
      editBtn.innerText = "Сохранить";
    } else {
      taskOut.setAttribute("readonly", "readonly");
      editBtn.innerText = "Изменить";

      // working with time
      const editDate = new Date();
      const editDay = editDate.getDate();
      const editMonth = editDate.getMonth();
      const editHour = editDate.getHours();
      const editMinutes = editDate.getMinutes();
      let editStr;

      if (editMinutes.length < 2) {
        editStr = `Изменено ${editDay}-ого ${monthArray[editMonth]} в ${editHour}:)${editMinutes}`;
      }
      editStr = `Изменено ${editDay}-ого ${monthArray[editMonth]} в ${editHour}:${editMinutes}`;

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
  let str;
  if (minutes.length < 2) {
    str = `Создано ${day}-ого ${monthArray[month]} в ${hour}:0${minutes}`;
  }
  str = `Создано ${day}-ого ${monthArray[month]} в ${hour}:${minutes}`;

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
        divDeadLine.innerText = `Время закончилось.`;
        alert("Время закончилось");
      }
    }, 1000);
  } else {
    if (deadLine.value > 100)
      alert(
        `Пожалуйста, добавьте эту задачу без срока, или добавьте позже. У Вас еще достаточно времени`
      );
    if (deadLine.value < 0)
      alert(`Отрицательное значение. Введите, пожалуйста, положительное`);
  }
  deadLine.value = "";

  // working with the local storage
  localStorage.setItem("tasks", JSON.stringify(addedTasksContainer.innerHTML));
});

// working with the local storage

if (localStorage.getItem("tasks")) {
  let data = JSON.parse(localStorage.getItem("tasks"));
  addedTasksContainer.innerHTML = data;
  secondHeader.innerText = "У Вас были следующие задачи:";
  let paragragh = document.createElement("p");
  paragragh.innerText =
    "У Вас были эти задачи до того, как Вы перезагрузили страницу. Вы можете продолжить работу, воспользовавшись кнопкой 'Очистить'";

  addedTasksContainer.prepend(paragragh);
}
clearAllBtn.onclick = () => {
  localStorage.clear();
  location.reload();
};

if (document.documentElement.clientWidth < 430) {
  deadLine.placeholder = "Ч.";
}
