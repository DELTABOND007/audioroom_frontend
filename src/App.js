import './App.css';
import Home from './pages/Home/Home.js';
import Navigation from './components/shared/navigation/Navigation';
import {Route,BrowserRouter,Switch,Redirect} from 'react-router-dom';  
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import Room from './pages/Room/Room';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';

function App() {

  const { loading } = useLoadingWithRefresh();
  return loading ?
  (<Loader message="Processing..." />
  ):(
    <BrowserRouter>
      <Navigation />
       <Switch>
      <GuestRoute path="/" exact> {/*matching exact */}
        <Home />
      </GuestRoute>

      <GuestRoute path="/authenticate">  
        <Authenticate/>
      </GuestRoute>

      <SemiProtectedRoute path="/activate">
        <Activate/>
      </SemiProtectedRoute>

      <ProtectedRoute path="/rooms">
        <Rooms/>
      </ProtectedRoute>

      <ProtectedRoute path="/room/:id">
        <Room/>
      </ProtectedRoute>

      {/* <Route path="/register" exact> {/*matching exact 
        <Register/>
      </Route>*/}

      {/*<Route path="/login" exact> {/*matching exact 
        <Login/>
      </Route> */}

      

      
    </Switch>
    </BrowserRouter>)
  
}

const GuestRoute=({children,...rest})=>{
  const {isAuth}=useSelector((state)=>state.auth)
  return (
  <Route {...rest}
  render={({location})=>{

    return isAuth ? ( 
    <Redirect to={
      {
        pathname: '/rooms',
        state: {from:location} //from location
      }
    }/>) :(
      children
    )
  }}>

  </Route>
  );

}

const SemiProtectedRoute=({children,...rest})=>{
  
  const {user,isAuth}=useSelector((state)=>state.auth)
  return (
  <Route {...rest}
  render={({location})=>{

    return !isAuth ? (   //if not authenticated
    <Redirect to={
      {
        pathname: '/',
        state: {from:location}
      }
    }/>) : isAuth && !user.activated ?(
      children
    ):( <Redirect to={
        {
          pathname:'/rooms',
          state:{from:location}
        }
      }/>
    )
  }}>

  </Route>
  );

}

const ProtectedRoute=({children,...rest})=>{
  
  
  const {user,isAuth}=useSelector((state)=>state.auth)
  return (
  <Route {...rest}
  render={({location})=>{

    return !isAuth ? (   //if not authenticated
    <Redirect to={
      {
        pathname: '/',
        state: {from:location}
      }
    }/>) : isAuth && !user.activated ?( <Redirect to={
        {
          pathname:'/activate',
          state:{from:location}
        }
      }/>
    ):( 
      children
      )
  }}>

  </Route>
  );

}

export default App;
