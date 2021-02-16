import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddArticle from "./components/add-article.component";
import Article from "./components/article.component";
import ArticlesList from "./components/article-list.component";

function App() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tutorials" className="navbar-brand">
              Articles app
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Articles
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add Article
                </Link>
              </li>
            </div>
          </nav>
  
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/articles"]} component={ArticlesList} />
              <Route exact path="/add" component={AddArticle} />
              <Route path="/?id:id" component={Article} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
  
  export default App;