function init() {
  const root = document.getElementById("root");
  ReactDOM.render(<App />, root);
}

init();

function App() {
  const { useState, StrictMode } = React;
  const [count, setCount] = useState(0);

  return <StrictMode>
    <div className="count-value">{count}</div>
    <button type="button" onClick={(event) => {
      setCount((count) => (count + 1));
    }}>Increase</button>
  </StrictMode>;
}
