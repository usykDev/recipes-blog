import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { RecipesPage } from "./pages/RecipesPage";
import { RecipePage } from "./pages/RecipePage";
import { AddRecipePage } from "./pages/AddRecipePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { EditRecipePage } from "./pages/EditRecipePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path=":id" element={<RecipePage />} />
        <Route path=":id/edit" element={<EditRecipePage />} />
        <Route path="new" element={<AddRecipePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </Layout>
  );
}

export default App;
