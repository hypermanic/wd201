/* eslint-disable no-undef /
const todoList=require('../todo');

const{all,markAsComplete,add,overdue,dueToday,dueLater}=todoList();

// eslint-disable-next-line no-undef
describe("TodoList Test Suite",()=>{
    // eslint-disable-next-line no-undef
    beforeAll(()=>{
        add(

            {
                title: "Test todo",
                completed: false,
                dueDate: new Date().toLocaleDateString("en-CA")
            }
        );
    })
    // eslint-disable-next-line no-undef
    test("Shoud add new todo",()=>{
        const todoItemsCount = all.length;
        add(

            { 
                title: "Test todo",
                completed: false,
                dueDate: new Date().toLocaleDateString("en-CA")
            }
        );
    expect(all.length).toBe(todoItemsCount + 1);
});

    test("Should mark a todo as complete",()=>{
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    })

    test("retrival of overdue items",()=>{
        expect(all[0].overdue).toBe(false);
        overdue(0);
        expect(all[0].overdue).toBe(true);
    })
})
*/

/* eslint-disable no-undef 
const todoList = require("../todo");

const { add, markAsComplete, all, dueToday, dueLater, overdue } = todoList();

describe("Todo test suite", () => {
  test("should add new todo", () => {
    expect(all.length).toBe(0);
    const date = new Date();
    const yd = new Date(date);
    const td = new Date(date);
    td.setDate(date.getDate() + 1);
    yd.setDate(date.getDate() - 1);
    add({
      title: "Todo test",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    add({
      title: "Todo test",
      completed: false,
      dueDate: yd.toLocaleDateString("en-CA"),
    });
    add({
      title: "Todo test",
      completed: false,
      dueDate: td.toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(3);
  });

  test("should mark a todo as complete", () => {
    // Ensure the todo is initially marked as incomplete
    expect(all[0].completed).toBe(false);

    // Mark the todo as complete
    markAsComplete(0);

    // Ensure the todo is now marked as complete
    expect(all[0].completed).toBe(true);
  });

  test("should retrive a todo as duetoday", () => {
    expect(all.length).toBe(3);
    const k = dueToday();
    console.log(k);
    expect(k.length).toBe(1);
  });
  test("should retrive a todo as overdue", () => {
    let k = [];
    expect(k.length).toBe(0);
    k = overdue();
    console.log(k);
    expect(k.length).toBe(0);
  });
  test("should retrive a todo as laterdue", () => {
    let k = [];
    expect(k.length).toBe(0);
    k = dueLater();
    console.log(k);
    expect(k.length).toBe(2);
  });
});

*/


const todoList = require("../todo");

const { add, markAsComplete, all, dueToday, dueLater, overdue } = todoList();

describe("Todo test suite", () => {
  let today, yesterday, tomorrow;

  beforeEach(() => {
    today = new Date().toISOString().split("T")[0];
    const dateYesterday = new Date();
    dateYesterday.setDate(dateYesterday.getDate() - 1);
    yesterday = dateYesterday.toISOString().split("T")[0];
    const dateTomorrow = new Date();
    dateTomorrow.setDate(dateTomorrow.getDate() + 1);
    tomorrow = dateTomorrow.toISOString().split("T")[0];

    all.length = 0; // Reset the tasks list before each test
  });

  test("should add new todo", () => {
    expect(all.length).toBe(0);
    add({ title: "Submit assignment", dueDate: yesterday, completed: false });
    expect(all.length).toBe(1);
  });

  test("should mark a todo as complete", () => {
    add({ title: "Complete task", dueDate: tomorrow, completed: false });
    expect(all[0].completed).toBe(false);

    markAsComplete(0);

    expect(all[0].completed).toBe(true);
  });

  test("should retrieve a todo as due today", () => {
    add({ title: "Task due today", dueDate: today, completed: false });
    const todayTasks = dueToday();
    expect(todayTasks.length).toBe(1);
  });

  test("should retrieve a todo as overdue", () => {
    add({ title: "Overdue task", dueDate: yesterday, completed: false });
    const overdueTasks = overdue();
    expect(overdueTasks.length).toBe(1);
  });

  test("should retrieve a todo as later due", () => {
    add({ title: "Task due later", dueDate: tomorrow, completed: false });
    const laterDueTasks = dueLater();
    expect(laterDueTasks.length).toBe(1);
  });
});
