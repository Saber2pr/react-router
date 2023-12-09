import React from "react"
import ReactDOM from "react-dom"
import { Router, NavLink, Route, usePush, Switch, createHashHistory } from "."

const Blog = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink className="a" to="/blog/1">
            1
          </NavLink>
        </li>
        <li>
          <NavLink className="a" to="/blog/2">
            2
          </NavLink>
        </li>
        <li>
          <NavLink className="a" to="/blog/3">
            3
          </NavLink>
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
              <button onClick={() => push("/关于")}>关于</button>
            </div>
          )
        }}
      />
      <Route path="/blog/3" component={() => <div>blog3</div>} />
    </>
  )
}
const HashHistory = createHashHistory()

export const App = () => {
  return (
    <>
      <header className="title">app</header>
      <main>
        <Router history={HashHistory}>
          <ul>
            <li>
              <NavLink className="a" to="/">
                home
              </NavLink>
              <NavLink
                className="a"
                to="/blog/1"
                isActive={(to, path) => path.startsWith("/blog")}
              >
                blog
              </NavLink>
              <NavLink className="a" to="/关于">
                关于
              </NavLink>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" component={() => <div>home</div>} />
            <Route path="/blog" component={() => <Blog />} />
            <Route path="/关于" component={() => <div>关于</div>} />
            <Route path="*" component={() => <div>404</div>} />
          </Switch>
        </Router>
      </main>
      <footer>footer</footer>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
