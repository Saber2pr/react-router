import React from "react"
import ReactDOM from "react-dom"
import { Router, Link, Route, HashHistory, usePush } from "."

const Blog = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/blog/1">1</Link>
        </li>
        <li>
          <Link to="/blog/2">2</Link>
        </li>
        <li>
          <Link to="/blog/3">3</Link>
        </li>
      </ul>
      <Route path="/blog/1" component={() => <div>blog1</div>} />
      <Route
        path="/blog/2"
        component={() => {
          const [push, getHref] = usePush()
          console.log(getHref())
          return (
            <div>
              blog2
              <button onClick={() => push("/about")}>about</button>
            </div>
          )
        }}
      />
      <Route path="/blog/3" component={() => <div>blog3</div>} />
    </>
  )
}

export const App = () => {
  return (
    <>
      <header className="title">app</header>
      <main>
        <Router history={HashHistory}>
          <ul>
            <li>
              <Link to="/">home</Link>
              <Link to="/blog/1">blog</Link>
              <Link to="/about">about</Link>
            </li>
          </ul>
          <Route exact path="/" component={() => <div>home</div>} />
          <Route path="/blog" component={() => <Blog />} />
          <Route path="/about" component={() => <div>about</div>} />
        </Router>
      </main>
      <footer>footer</footer>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
