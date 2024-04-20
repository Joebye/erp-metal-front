import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './pages/SignIn';
import './App.css'
import { useMemo } from "react";
import routesConfig from './config/routes-config.json';
import NotFound from './pages/NotFound';
import { RouteType } from './navigators/Navigator';
import Navigator from './navigators/Navigator';
import CheckStatus from "./pages/CheckStatus";
import SendEmail from "./pages/SendEmail";
import Requests from "./pages/Requests";
import { useSelectorUser } from "./redux/store";
import SignOut from "./pages/SignOut";
import authConfig from './config/auth-config.json';

const {localStorageKey} = authConfig;
const {always,admin,authenticated,noauthenticated,user} = routesConfig;

type RouteTypeOrder = RouteType & {order?: number}

function getRoutes(): RouteType[] {
  const res: RouteTypeOrder[] = [];
  res.push(...always);
  let storedDataStr = localStorage.getItem(localStorageKey);
  
  if (!storedDataStr) {
    res.push(...noauthenticated)
  } else  {
  const storedData = JSON.parse(storedDataStr);
  const email = storedData.email;
  const userType = email.includes('admin') ? 'admin' : 'user';
  res.push(...authenticated);
     if (userType == 'admin') {
    res.push(...admin)
    
  } else {
    res.push(...user)
  }
   
  res.sort((r1, r2) => {
    let res = 0;
    if (r1.order && r2.order) {
      res = r1.order - r2.order;
    } 
    return res
  });
 
  
   res[res.length - 1].label = email;
   }
 
  return res
}


const App: React.FC = () => {

const curUser = useSelectorUser();
const routes = useMemo(() => getRoutes(), [curUser]);
  
 
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigator routes={routes}/>}>
        <Route path="signin" element={<SignIn/>}/>
        <Route path="sendemail" element={<SendEmail/>}/>
        <Route path="checkstatus" element={<CheckStatus/>}/>
        <Route path="requests" element={<Requests/>}/>
        <Route path="signout" element={<SignOut/>}/>
        <Route path="*" element={<NotFound/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
}

export default App;