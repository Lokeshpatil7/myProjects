import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Tutorial from "./Tutorial";
import Tutorials from "./Tutorials";
import User from "./User";
import Demo from "./Demo";
import HooksSample from "./HooksSample";
import Video from "./Video";
import TutorialCrudUi from "./TutorialCrudUi";
import Home from "./components/Home";
import EditUser from "./components/EditUser";
import AddUser from "./components/AddUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Home />
        <EditUser />
        <AddUser />
      </Router>

      {/* <Video /> */}
      {/* <Tutorial /> */}
      {/* <Tutorials /> */}
      {/* <User /> */}
      {/* <TutorialCrudUi /> */}
      {/* <HooksSample /> */}
      {/* <Ui /> */}
      {/* <Demo /> */}
    </div>
  );
}

export default App;
