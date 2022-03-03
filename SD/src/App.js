import logo from "./logo.svg";
import "./App.css";
import UploadImage from "./components/UploadImage";
import UploadVideo from "./components/UploadVideo";
import UploadMultiple from "./components/uploadMultiple";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <UploadVideo></UploadVideo> */}
        <UploadImage></UploadImage>
        {/* <UploadMultiple></UploadMultiple> */}
      </header>
    </div>
  );
}

export default App;
