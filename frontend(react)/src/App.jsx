import "./App.css";
import TodoDisplay from "./components/TodoDisplay";
import PostCreator from "./components/PostCreator";
import ListPosts from "./components/ListPosts";
import NoteApp from "./components/NoteApp";
import Debounce from "./components/Debounce";
import InfiniteScroll from "./components/InfiniteScroll";

function App() {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <h1>React Hooks Demo</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "20px",
          width: "100%",
        }}
      >
        <TodoDisplay />
        <PostCreator />
        <ListPosts />
        <NoteApp />
        <Debounce />
        <InfiniteScroll />
      </div>
    </div>
  );
}

export default App;
