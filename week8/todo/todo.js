
let todoCount = 0;

function startTodo() {

}

function addTodo() {
    
    todoCount++;

    const container = document.getElementById("todoContainer");

    container.innerHTML += `    
    <tr>
        <td>
            <label for="todo${todoCount}text">Todo #${todoCount} text</label>
            <input  id="todo${todoCount}text" value="..." type="text"></td>
        <td>
            <label for="todo${todoCount}done">Todo #${todoCount} done</label>
            <input  id="todo${todoCount}done"  type="checkbox"></td>
    </tr>
    `;
    
}
