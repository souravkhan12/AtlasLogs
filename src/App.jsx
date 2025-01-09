import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./components/contexts/CitiesContext";
import { AuthProvider } from "./components/contexts/FakeAuthContext.jsx";

import ProtectedRoute from "./pages/ProtectedRoute.jsx";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// import Products from "./pages/Product";
// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Homepage = lazy(()=>import('./pages/Homepage.jsx'));
const Products = lazy(()=>import('./pages/Product.jsx'));
const Pricing = lazy(()=>import('./pages/Pricing.jsx'));
const PageNotFound = lazy(()=>import('./pages/PageNotFound.jsx'));
const AppLayout = lazy(()=>import('./pages/AppLayout.jsx'));
const Login = lazy(()=>import('./pages/Login.jsx'));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage/>}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Products />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
