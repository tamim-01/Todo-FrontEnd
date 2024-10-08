import Addtask from "./pages/Add-TaskPage.jsx";
import TaskManager from "./pages/TaskManager.jsx";
import { SigninPage } from "./pages/signin.jsx";
import { SignupPage } from "./pages/signup.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ProfilePage from "./pages/edit-Profilepage.jsx";
import Edittask from "./pages/Edit-TaskPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SigninPage" element={<SigninPage />} />
        <Route path="/SignupPage" element={<SignupPage />} />
        <Route path="/taskmanager" element={<TaskManager />} />
        <Route path="/Addtaskpage" element={<Addtask />} />
        <Route path="/Edittask" element={<Edittask />} />
        <Route path="/EditProfile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
