import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Layout from "./Layout";
import SingleVenue from "./components/SingleVenue";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import CreateVenue from "./pages/CreateVenue";
import EditVenue from "./pages/EditVenue";

function App() {
  return (
    <Router>
      <UserProvider>
        {" "}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="home" element={<Home />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="createvenue" element={<CreateVenue />} />
            <Route path="editvenue/:id" component={EditVenue} />
            <Route path="venue/:id" element={<SingleVenue />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
