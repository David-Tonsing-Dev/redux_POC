import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./components/RootLayout";
import ErrorBoundary from "./common/ErrorBoundary";
const Cart = lazy(() => import("./components/Cart"));
const Dashboard = lazy(() => import("./components/Dashboard"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ErrorBoundary fallback="Error in dashboard">
              <Suspense fallback="Loading...">
                <Dashboard />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/cart"
          element={
            <ErrorBoundary fallback="Error in cart">
              <Suspense fallback="Loading...">
                <Cart />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
