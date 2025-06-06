const dayButtons = document.querySelectorAll('.date');
const tasks = document.querySelectorAll('.task');

let currentDay = 1;

function updateTasks(day) {
  tasks.forEach(task => {
    const allowedDay = parseInt(task.dataset.dayAllowed, 10);
    if (allowedDay <= day) {
      task.classList.add('active');
    } else {
      task.classList.remove('active');
      task.classList.remove('done');
    }
  });
}

dayButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentDay = parseInt(btn.dataset.day, 10);

    dayButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    updateTasks(currentDay);
  });
});

tasks.forEach(task => {
  task.addEventListener('click', () => {
    if (task.classList.contains('active')) {
      task.classList.toggle('done');
    }
  });
});

// Init default
updateTasks(currentDay);
