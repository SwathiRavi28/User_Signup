import './App.css';
import firstPage from './components/FirstPage';
import signIn from './components/SignIn';
import main from './components/Main';
import { BrowserRouter as Router, Route  } from "react-router-dom";


function App() {
  return (
    <Router>
    
    <div className="wrapper">
        
        <div id="content">
            <Route path="/" exact component={firstPage} />
            <Route path="/signin" component={signIn} />
            <Route path="/main" component={main} />
        </div>
    </div>
</Router>
  );
}

export default App;
