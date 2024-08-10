import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Auth from "./auth/Auth";
import Admin from "./pages/Admin";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route path="/admin/*" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
