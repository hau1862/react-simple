function init() {
  const root = document.getElementById("root");
  ReactDOM.render(<TodoApp />, root);
}

init();

function TodoApp() {
  const { useState, StrictMode } = React;
  const [state, setState] = useState({
    todoList: []
  });

  const addTodo = function (todo) {
    const { todoList } = state;
    setState({ ...state, todoList: todoList.concat(todo) });
  };

  return <StrictMode>
    <div className="add-todo-form-container">
      <AddTodoForm addTodo={addTodo} />
    </div>
    <div className="todo-list-container">
      <TodoList todoList={state.todoList} />
    </div>
  </StrictMode>;
}

function AddTodoForm(props) {
  const { addTodo } = props;

  const submitAddTodoForm = function (event) {
    event.preventDefault();
    const content = event.target.content.value.trim();

    if (content) {
      addTodo(content);
    }

    event.target.reset();
  };

  return <form className="add-todo-form" onSubmit={submitAddTodoForm}>
    <input type="text" name="content" className="form-input" />
    <input type="submit" value="Submit" className="form-submit" />
  </form>;
}

function TodoList(props) {
  const { todoList } = props;

  return <ul className="todo-list">
    {todoList.map((todo, index) => {
      return <li className="todo-item" key={index}>{todo}</li>;
    })}
  </ul>;
}
