import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import NotePage from './Components/NotePage';
import Test from "./Components/Test";

const App = () => {
  return (
    <Router>
      <div className='App'>
        <div className="notes-list">
          <Header />
          <div>
            <Routes>
              <Route path="/" exact element={<Test />}></Route>
              <Route path="/note/:id" element={<NotePage />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
