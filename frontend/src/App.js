import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Chat from './pages/Chats';
import Home from './pages/Home';
function App() {
  return (
    <div className="App">
    <Route path="/" component={Home} exact/>
    <Route path="/chats" component={Chat} exact/>
    </div>
  );
}

export default App;
