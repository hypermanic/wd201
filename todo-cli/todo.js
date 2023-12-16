/*const todoList = () => {
    all = []
    const add = (todoItem) => {
      all.push(todoItem)
    }
    const markAsComplete = (index) => {
      all[index].completed = true
    }
  
    const overdue = () => {
      // Write the date check condition here and return the array
      // of overdue items accordingly.
      // eslint-disable-next-line no-undef
      ovd=[]
      for(let i=0;i<all.length;i++){
        // eslint-disable-next-line no-undef
        if(all[i].dueDate<today)
        {
          ovd.push(all[i]);
        }
      }
      return ovd
    }
  
    const dueToday = () => {
      // Write the date check condition here and return the array
      // of todo items that are due today accordingly.
      dut=[]
      for(let i=0;i<all.length;i++){
        if(all[i].dueDate===today)
        {
          dut.push(all[i]);
        }
      }
      return dut
    }
  
    const dueLater = () => {
      // Write the date check condition here and return the array
      // of todo items that are due later accordingly.
      dul=[]
      for(let i=0;i<all.length;i++){
        if(all[i].dueDate>today)
        {
          dul.push(all[i]);
        }
      }
      return dul
    }
  
    const toDisplayableList = (list) => {
      // Format the To-Do list here, and return the output string
      // as per the format given above.
      out = []
    for (i = 0; i < list.length; i++) {
      if (list[i].dueDate === today) {
        if (list[i].completed === false) {
          out.push(`[ ] ${list[i].title}`)
        } else {
          out.push(`[x] ${list[i].title}`)
        }
      } else {
        if (list[i].completed === false) {
          out.push(`[ ] ${list[i].title} ${list[i].dueDate}`)
        } else {
          out.push(`[x] ${list[i].title} ${list[i].dueDate}`)
        }
      }
    }
    return out.join('\n')

    }
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList
    };
  };
  
 module.exports=todoList;

 // ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = d => {
  return d.toISOString().split("T")[0]
}

var dateToday = new Date()
const today = formattedDate(dateToday)
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
)
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
)

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
todos.add({ title: 'Pay rent', dueDate: today, completed: true })
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

console.log("My Todo-list\n")

console.log("Overdue")
var overdues = todos.overdue()
var formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log("\n")

console.log("Due Today")
let itemsDueToday = todos.dueToday()
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log("\n")

console.log("Due Later")
let itemsDueLater = todos.dueLater()
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log("\n\n")*/
const todoList = () => {
  let all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const today = new Date();
    return all.filter((todo) => new Date(todo.dueDate) < today && !todo.completed);
  };

  const dueToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return all.filter((todo) => todo.dueDate === today && !todo.completed);
  };

  const dueLater = () => {
    const today = new Date().toISOString().split('T')[0];
    return all.filter((todo) => new Date(todo.dueDate) > new Date(today) && !todo.completed);
  };

  const toDisplayableList = (list) => {
    return list
      .map((todo) => {
        const status = todo.completed ? '[x]' : '[ ]';
        return `${status} ${todo.title} ${todo.dueDate}`;
      })
      .join('\n');
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
