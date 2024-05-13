import React from 'react';
import { BrowserRouter, Route, Link, Routes, Outlet } from 'react-router-dom';
function Home() {
  return (<div><h1>Home page</h1></div>);
}
function About() {
  return (<div><h1>About us page</h1></div>);
}
function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <Routes>
        <Route
            path="/"
            element={
              <div>
                <Outlet />
              </div>
            }
          >
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
