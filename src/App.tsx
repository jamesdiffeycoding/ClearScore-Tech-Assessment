import "./App.css";
import IdeaCards from "./components/IdeaCards";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">ClearScore Idea Board</header>
      <main className="app-main">
        <IdeaCards />
      </main>
    </div>
  );
}
