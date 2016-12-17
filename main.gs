// Simple GAS for move the overdue tasks with today date and add [OVERDUE] to the title
// Author : rodrigo@codi.com.ar


function index() {
  // I get all my list
  var lists = listTaskLists();
  if(lists != -1) {
    // For each list i get all the tasks
    for(var i=0;i < lists.items.length;i++) {
      var tasks = listTasks(lists.items[i].id);
      //I check each task to see if is overdue and change it for today
      if (tasks != -1) {
        for(var j=0;j < tasks.items.length;j++) {
          var now = new Date();
          now.setHours(0,0,0,0);
          if(tasks.items[j].due < now.toISOString()) {
            //If the task is older
            move(lists.items[i].id,tasks.items[j].id,tasks.items[j].title);
          } 
          //tasks with no due date are gives TRUE
        }
        Tasks.Tasks.clear(lists.items[i].id);
      }
    }
  }
}

function listTaskLists() {
  var taskLists = Tasks.Tasklists.list();
  if (taskLists.items) {
    return taskLists;
  } else {
    return -1;
  }
}

function listTasks(taskListId) {
  var tasks = Tasks.Tasks.list(taskListId);
  if (tasks.items) {
    return tasks;
  } else {
    return -1;
  }
}

function move(taskListId, taskId,title) {
  var task = Tasks.newTask();
  task.setDue(new Date().toISOString());
  if(title.indexOf('[OVERDUE]') < 0) {
    task.setTitle('[OVERDUE] '+ title);
  }
  Tasks.Tasks.patch(task, taskListId, taskId);
}