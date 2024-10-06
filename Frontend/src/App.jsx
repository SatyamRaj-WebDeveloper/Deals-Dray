import SignUp from './Components/SignUp.jsx'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Login from './Components/Login.jsx'
import DashBoard from './Components/DashBoard.jsx'



function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={ <SignUp/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Dashboard' element={<DashBoard/>}/>
      </Routes>
    </Router>
   
    </>
  )
}

export default App
