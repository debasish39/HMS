import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import { useLoading } from "./context/LoadingContext";
import { useEffect } from "react";
import BookNow from "./components/BookNow";
import Payment from "./pages/Payment";
import Receipt from "./pages/Receipt";
import Confirmation from "./pages/Confirmation";
import BookingHistory from "./pages/BookingHistory";
import NotFound from "./pages/NotFound";

export default function App() {
    const { loading, setLoading } = useLoading();
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // smooth UX delay

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <BrowserRouter>
          {loading && <Loader />}

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* Protected Routes */}
        <Route
          path="/hotels"
          element={
            <>
              <SignedIn>
                <Hotels />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/hotels/:id"
          element={
            <>
              <SignedIn>
                <HotelDetails />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
  path="/book/:id"
  element={
    <>
  <SignedIn>
                <BookNow/>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              </>
  }
/>
<Route
  path="/payment/:id"
  element={
    <>
  <SignedIn>
                <Payment />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              </>
  }
/>
<Route
  path="/confirmation"
  element={
    <>
  <SignedIn>
               <Confirmation />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              </>
  }
/>
<Route
  path="/receipt"
  element={
    <>
  <SignedIn>
                <Receipt />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              </>
  }
/>
<Route
  path="/history"
  element={
    <>
  <SignedIn>
                <BookingHistory />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
              </>
  }
/>
<Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
