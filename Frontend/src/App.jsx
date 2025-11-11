//rafce
import "./App.css";
import Main from "./components/home/Main.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PropertyList from "./components/home/PropertyList.jsx";
import PropertyListing from "./components/propertyListing/PropertyListing.jsx";

import Login from "./components/user/Login.jsx";
import Signup from "./components/user/Signup.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userActions} from "./store/User/user-slice.js";
import { CurrentUser } from "./store/User/user-action.js";
import EditProfile from "./components/user/EditProfile.jsx";
import Profile from "./components/user/Profile.jsx";

import BookingDetails from "./components/myBookings/BookingDetails";
import MyBookings from "./components/myBookings/MyBookings";
import Payment from "./components/payment/Payment"
import NotFound from "./components/NotFound";
import Accomodation from "./components/accomodation/Accomodation"
import AccomodationForm from "./components/accomodation/AccomodationForm";

function App() {
  const dispatch = useDispatch();
  const{errors,user} = useSelector((state) => state.user)
  useEffect(() =>{
    if(errors){
      dispatch(userActions.clearErrors());
    }
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}>
            <Route index element={<PropertyList/>}/>
            <Route path="propertylist/:id" element={<PropertyListing/>}/>
            {/* user routes */}
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<Signup/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="editprofile" element={user? <EditProfile/> : <Navigate to="/login"/>}/>

             {/* Booking Route */}
            <Route path="user/mybookings" element={user ? <MyBookings /> : <Navigate to="/login" />} />
            <Route path="user/mybooking/:bookingId" element={user ? <BookingDetails /> : <Navigate to="/login" />} />

             {/* Payment Route */}
            <Route path="payment/:propertyId" element={user ? <Payment /> : <Navigate to="/login" />} />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />

             {/* Accomodation Routes */}
            <Route path="accomodation" element={<Accomodation />} />
            <Route path="accomodationform" element={<AccomodationForm />} />


          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
