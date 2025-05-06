var tasks = [];

var form = document.getElementById("taskForm");
var taskContainer = document.getElementById("taskmanager");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  var taskName = document.getElementById("taskName").value.trim();
  var priority = document.getElementById("priority").value;
  var isImportant = document.getElementById("isImportant").checked;

  if (taskName === "") {
    alert("Please enter a task name.");
    return;
  }

  var task = {
    id: Date.now(),
    name: taskName,
    priority: priority,
    isImportant: isImportant,
    isCompleted: false,
    date: new Date().toLocaleDateString()
  };

  tasks.push(task);

  showTasks();
  console.log("JSON Format:");
  console.log(JSON.stringify(tasks, null, 2));

  form.reset();
});

function showTasks() {
  taskContainer.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];

    var taskDiv = document.createElement("div");

    if (task.isImportant) {
      taskDiv.style.backgroundColor = "#ffe5e5";
      taskDiv.style.borderLeft = "4px solid red";
    }

    if (task.isCompleted) {
      taskDiv.style.textDecoration = "line-through";
      taskDiv.style.opacity = "0.6";
    }

    var content = "<strong>" + task.name + "</strong> (" + task.priority + ")<br>";
    content += "<small>Added: " + task.date + "</small><br>";
    content += "<button onclick='markDone(" + task.id + ")'>" + 
               (task.isCompleted ? "Mark Incomplete" : "Mark Completed") + 
               "</button> ";
    content += "<button onclick='removeTask(" + task.id + ")'>Delete</button>";

    taskDiv.innerHTML = content;
    taskContainer.appendChild(taskDiv);
  }
}

function removeTask(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      break;
    }
  }

  showTasks();
  console.log("JSON Format:");
  console.log(JSON.stringify(tasks, null, 2));
}

function markDone(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].isCompleted = !tasks[i].isCompleted;
      break;
    }
  }

  showTasks();
  console.log("JSON Format:");
  console.log(JSON.stringify(tasks, null, 2));
}