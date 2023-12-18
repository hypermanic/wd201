/*
////main code

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
*/

/* eslint-disable no-undef */
const db = require("../models");

const getJSDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Need to pass an integer as days");
  }
  const today = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  return new Date(today.getTime() + days * oneDay)
}

describe("Tests for functions in todo.js", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true })
  });

  test("Todo.overdue should return all tasks (including completed ones) that are past their due date", async () => {
    const todo = await db.Todo.addTask({ title: "This is a sample item", dueDate: getJSDate(-2), completed: false });
    const items = await db.Todo.overdue();
    expect(items.length).toBe(1);
  });

  test("Todo.dueToday should return all tasks that are due today (including completed ones)", async () => {
    const dueTodayItems = await db.Todo.dueToday();
    const todo = await db.Todo.addTask({ title: "This is a sample item", dueDate: getJSDate(0), completed: false });
    const items = await db.Todo.dueToday();
    expect(items.length).toBe(dueTodayItems.length + 1);
  });

  test("Todo.dueLater should return all tasks that are due on a future date (including completed ones)", async () => {
    const dueLaterItems = await db.Todo.dueLater();
    const todo = await db.Todo.addTask({ title: "This is a sample item", dueDate: getJSDate(2), completed: false });
    const items = await db.Todo.dueLater();
    expect(items.length).toBe(dueLaterItems.length + 1);
  });

  test("Todo.markAsComplete should change the `completed` property of a todo to `true`", async () => {
    const overdueItems = await db.Todo.overdue()
    const aTodo = overdueItems[0];
    expect(aTodo.completed).toBe(false);
    await db.Todo.markAsComplete(aTodo.id);
    await aTodo.reload();

    expect(aTodo.completed).toBe(true);
  })

  test("For a completed past-due item, Todo.displayableString should return a string of the format `ID. [x] TITLE DUE_DATE`", async () => {
    const overdueItems = await db.Todo.overdue()
    const aTodo = overdueItems[0];
    expect(aTodo.completed).toBe(true);
    const displayValue = aTodo.displayableString()
    expect(displayValue).toBe(`${aTodo.id}. [x] ${aTodo.title} ${aTodo.dueDate}`)
  })

  test("For an incomplete todo in the future, Todo.displayableString should return a string of the format `ID. [ ] TITLE DUE_DATE`", async () => {
    const dueLaterItems = await db.Todo.dueLater()
    const aTodo = dueLaterItems[0];
    expect(aTodo.completed).toBe(false);
    const displayValue = aTodo.displayableString()
    expect(displayValue).toBe(`${aTodo.id}. [ ] ${aTodo.title} ${aTodo.dueDate}`)
  })

  test("For an incomplete todo due today, Todo.displayableString should return a string of the format `ID. [ ] TITLE` (date should not be shown)", async () => {
    const dueTodayItems = await db.Todo.dueToday()
    const aTodo = dueTodayItems[0];
    expect(aTodo.completed).toBe(false);
    const displayValue = aTodo.displayableString()
    expect(displayValue).toBe(`${aTodo.id}. [ ] ${aTodo.title}`)
  })

  test("For a complete todo due today, Todo.displayableString should return a string of the format `ID. [x] TITLE` (date should not be shown)", async () => {
    const dueTodayItems = await db.Todo.dueToday()
    const aTodo = dueTodayItems[0];
    expect(aTodo.completed).toBe(false);
    await db.Todo.markAsComplete(aTodo.id);
    await aTodo.reload();
    const displayValue = aTodo.displayableString()
    expect(displayValue).toBe(`${aTodo.id}. [x] ${aTodo.title}`)
  })
});