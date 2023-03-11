const root = document.getElementById("root");

function AddTodoForm(props) {
	const { addTodoItem } = props;
	const initialTodoItem = { content: "" };

	const submitAddTodoForm = function (event) {
		event.preventDefault();
		const addTodoForm = event.target;
		const content = addTodoForm.content.value.trim();

		if (content) {
			const newTodoItem = { ...initialTodoItem, content: content };
			addTodoItem(newTodoItem);
		}

		addTodoForm.reset();
	};

	return <form className="form add-todo-form" method="GET" action="#" onSubmit={submitAddTodoForm}>
		<input className="form-input" id="todo-content" name="content" />
		<input type="submit" className="form-submit" value="Add Todo" />
	</form>;
}

function TodoList(props) {
	const { todoItems, editTodoItem, deleteTodoItem } = props;
	const initialEditState = { index: -1, todoItem: { content: "" } };
	const [editState, setEditState] = React.useState(initialEditState);

	const changeEditContent = function (event) {
		if (event.keyCode === 13) {
			const { index, todoItem } = editState;
			todoItem.content = todoItem.content.trim();

			if (todoItem.content) {
				editTodoItem(index, todoItem);
			}

			setEditState(initialEditState);
		} else {
			const newTodoItem = editState.todoItem;
			newTodoItem.content = event.target.value;
			setEditState({ ...editState, todoItem: newTodoItem });
		}
	};

	const clickEditButton = function (index) {
		return function (event) {
			const newEditState = {
				...editState,
				index: index,
				todoItem: { ...todoItems[index] }
			};
			setEditState(newEditState);
		};
	};

	const clickSaveButton = function (event) {
		const { index, todoItem } = editState;
		todoItem.content = todoItem.content.trim();

		if (todoItem.content) {
			editTodoItem(index, todoItem);
		}

		setEditState(initialEditState);
	};

	const clickDeleteButton = function (index) {
		return function (event) {
			deleteTodoItem(index);
			setEditState(initialEditState);
		};
	};

	return <ul className="todo-list">
		{todoItems.map(function (todoItem, index) {
			if (editState.index === index) {
				return <li className="todo-item" key={todoItem.content + "edit"}>
					<input type="text" autoFocus="autoFocus" className="todo-item-content" defaultValue={todoItem.content} onKeyUp={changeEditContent} />
					<button type="button" className="todo-item-button" onClick={clickSaveButton}>Save</button>
					<button type="button" className="todo-item-button" onClick={clickDeleteButton(index)}>Delete</button>
				</li>;
			} else {
				return <li className="todo-item" key={todoItem.content + "normal"}>
					<div className="todo-item-content">{todoItem.content}</div>
					<button type="button" className="todo-item-button" onClick={clickEditButton(index)}>Edit</button>
					<button type="button" className="todo-item-button" onClick={clickDeleteButton(index)}>Delete</button>
				</li>;
			}
		})}
	</ul>;
}

function TodoApp() {
	const initialTodoItems = [
		{ content: "Hello" }
	];
	const [todoItems, setTodoItems] = React.useState(initialTodoItems);

	const addTodoItem = function (todoItem) {
		const newTodoItems = [...todoItems];
		newTodoItems.push(todoItem);
		setTodoItems(newTodoItems);
	};

	const deleteTodoItem = function (index) {
		const newTodoItems = [...todoItems];
		newTodoItems.splice(index, 1);
		setTodoItems(newTodoItems);
	};

	const editTodoItem = function (index, todoItem) {
		const newTodoItems = [...todoItems];
		newTodoItems[index] = todoItem;
		setTodoItems(newTodoItems);
	};

	return <div className="todo-app">
		<h1 className="todo-app-heading">Todo App</h1>
		<AddTodoForm addTodoItem={addTodoItem} />
		<TodoList todoItems={todoItems} deleteTodoItem={deleteTodoItem} editTodoItem={editTodoItem} />
	</div>;
}

ReactDOM.render(<TodoApp />, root);
