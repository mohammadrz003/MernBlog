import "./App.css";
import { Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Home/HomePage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import RegisterPage from "./pages/register/registerPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";


function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={ <HomePage />} />
        <Route  path="/blog/:id" element={ <ArticleDetailPage />} />
        <Route  path="/register" element={ <RegisterPage />} />
        <Route  path="/login" element={ <LoginPage />} />
        <Route  path="/profile" element={ <ProfilePage />} />
      
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
