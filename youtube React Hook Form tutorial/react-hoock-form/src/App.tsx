import { YouTubeForm } from "./components/YoutubeForm.js";
import { YapValidationForm } from "./components/YapValidationForm.js";

import "./App.css";
import { ZodValidationForm } from "./components/ZodYouTubeForm.js";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            marginRight: "30px",
            paddingRight: "30px",
            borderRight: "1px solid gray",
          }}
        >
          <YouTubeForm />
        </div>
        <div
          style={{
            marginRight: "30px",
            paddingRight: "30px",
            borderRight: "1px solid gray",
          }}
        >
          <YapValidationForm />
        </div>
        <div>
          <ZodValidationForm />
        </div>
      </div>
    </>
  );
}

export default App;
