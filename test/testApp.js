import { Selector } from 'testcafe';

fixture("Todo List App Tests")
    .page("http://test.domainjutsugojocomeback.dk/todo/");

test("Add a new todo item", async t => {
    await t
        .typeText(Selector("#todoInput"), "Testcafe")      // todo text
        .typeText(Selector("#todoDate"), "2025-12-31")     // date input
        .click(Selector(".todoForm button"))            // the Add button
    
     await t
        .click(Selector(".todoList li").find('input[type="checkbox"]'));  // complete the todo item
});
