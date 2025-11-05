import { Selector } from 'testcafe';

fixture("Todo List App Tests")
    .page("http://test.domainjutsugojocomeback.dk/todo/");

test("Add a new todo item", async t => {
    await t
        .typeText('#todo-input', 'Test Todo Item')
        .typeText('#date-input', '2024-12-31')
        .click('#add-button')
        .expect(Selector('.todo-item').withText('Test Todo Item').exists).ok();
})