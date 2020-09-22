import React, { Component } from "react";
import Cat from "./Cat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { checkStatus } from "../helpers/httpStatusCheck";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { catBreeds: [] };
  }
  componentDidMount() {
    if (window.sessionStorage.getItem("catBreeds")) {
      this.setState({
        catBreeds: JSON.parse(window.sessionStorage.getItem("catBreeds")),
      });
    } else {
      const breedPromise = fetch("https://api.thecatapi.com/v1/breeds", {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.REACT_APP_CAT_API}`,
        },
      });

      breedPromise
        .then(checkStatus)
        .then((res) => res.json())
        .then((cats) => {
          let catNames = cats.map((cat) => cat.name);
          this.setState({ catBreeds: catNames });
          window.sessionStorage.setItem("catBreeds", JSON.stringify(catNames));
        });
    }
  }

  render() {
    return (
      <Router forceRefresh={true}>
        <Switch>
          <Route exact path="/breeds/:breed" component={Cat} />
          <Route exact path="/">
            <div id="cat-list">
              {this.state.catBreeds.map((cat) => (
                <React.Fragment>
                  <a href={"breeds/" + cat}>{cat}</a>
                  <br />
                </React.Fragment>
              ))}
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Main;
