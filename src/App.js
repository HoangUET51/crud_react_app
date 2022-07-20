import "./App.scss";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { resfresh } from "./redux/slice/useSlice";
import { useEffect } from "react";
import AppRouter from "./Router/AppRouter";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(resfresh());
    }
  }, []);
  return (
    <>
      <div className="App-container">
        <Header />
        <Container>
          <AppRouter />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
