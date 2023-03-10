{\rtf1\fbidis\ansi\deff0\nouicompat{\fonttbl{\f0\fnil\fcharset0 Calibri;}}
{\*\generator Riched20 10.0.19041}\viewkind4\uc1 
\pard\ltrpar\sa200\sl276\slmult1\f0\fs22\lang9 let input = document.querySelector(".input");\par
let submit = document.querySelector(".add");\par
let tasksDiv = document.querySelector(".tasks");\par
\par
// Empty Array To Store The Tasks\par
let arrayOfTasks = [];\par
\par
// Check if Theres Tasks In Local Storage\par
if (localStorage.getItem("tasks")) \{\par
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));\par
\}\par
\par
// Trigger Get Data From Local Storage Function\par
getDataFromLocalStorage();\par
\par
// Add Task\par
submit.onclick = function () \{\par
  if (input.value !== "") \{\par
    addTaskToArray(input.value); // Add Task To Array Of Tasks\par
    input.value = ""; // Empty Input Field\par
  \}\par
\};\par
\par
// Click On Task Element\par
tasksDiv.addEventListener("click", (e) => \{\par
  // Delete Button\par
  if (e.target.classList.contains("del")) \{\par
    // Remove Task From Local Storage\par
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));\par
    // Remove Element From Page\par
    e.target.parentElement.remove();\par
  \}\par
  // Task Element\par
  if (e.target.classList.contains("task")) \{\par
    // Toggle Completed For The Task\par
    toggleStatusTaskWith(e.target.getAttribute("data-id"));\par
    // Toggle Done Class\par
    e.target.classList.toggle("done");\par
  \}\par
\});\par
\par
function addTaskToArray(taskText) \{\par
  // Task Data\par
  const task = \{\par
    id: Date.now(),\par
    title: taskText,\par
    completed: false,\par
  \};\par
  // Push Task To Array Of Tasks\par
  arrayOfTasks.push(task);\par
  // Add Tasks To Page\par
  addElementsToPageFrom(arrayOfTasks);\par
  // Add Tasks To Local Storage\par
  addDataToLocalStorageFrom(arrayOfTasks);\par
\}\par
\par
function addElementsToPageFrom(arrayOfTasks) \{\par
  // Empty Tasks Div\par
  tasksDiv.innerHTML = "";\par
  // Looping On Array Of Tasks\par
  arrayOfTasks.forEach((task) => \{\par
    // Create Main Div\par
    let div = document.createElement("div");\par
    div.className = "task";\par
    // Check If Task is Done\par
    if (task.completed) \{\par
      div.className = "task done";\par
    \}\par
    div.setAttribute("data-id", task.id);\par
    div.appendChild(document.createTextNode(task.title));\par
    // Create Delete Button\par
    let span = document.createElement("span");\par
    span.className = "del";\par
    span.appendChild(document.createTextNode("Delete"));\par
    // Append Button To Main Div\par
    div.appendChild(span);\par
    // Add Task Div To Tasks Container\par
    tasksDiv.appendChild(div);\par
  \});\par
\}\par
\par
function addDataToLocalStorageFrom(arrayOfTasks) \{\par
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));\par
\}\par
\par
function getDataFromLocalStorage() \{\par
  let data = window.localStorage.getItem("tasks");\par
  if (data) \{\par
    let tasks = JSON.parse(data);\par
    addElementsToPageFrom(tasks);\par
  \}\par
\}\par
\par
function deleteTaskWith(taskId) \{\par
  // For Explain Only\par
  // for (let i = 0; i < arrayOfTasks.length; i++) \{\par
  //   console.log(`$\{arrayOfTasks[i].id\} === $\{taskId\}`);\par
  // \}\par
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);\par
  addDataToLocalStorageFrom(arrayOfTasks);\par
\}\par
\par
function toggleStatusTaskWith(taskId) \{\par
  for (let i = 0; i < arrayOfTasks.length; i++) \{\par
    if (arrayOfTasks[i].id == taskId) \{\par
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);\par
    \}\par
  \}\par
  addDataToLocalStorageFrom(arrayOfTasks);\par
\}\par
}
 