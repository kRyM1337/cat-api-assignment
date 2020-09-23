import React, { Component } from "react";
import Cat from "./Cat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { checkStatus } from "../helpers/httpStatusCheck";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { catBreeds: [] };
  }

  //Load from cache if possible, otherwise fetch info
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
          let catInfo = cats.map((cat) => {
            return { name: cat.name, id: cat.id };
          });
          //Set local state and cache
          this.setState({ catBreeds: catInfo });
          window.sessionStorage.setItem("catBreeds", JSON.stringify(catInfo));
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            catBreeds: null,
            errorMsg: "There has been a network error. Please try again!",
          });
        });
    }
  }

  render() {
    if (this.state.catBreeds === null) {
      return this.state.errorMsg;
    } else {
      return (
        <Router forceRefresh={true}>
          <Switch>
            <Route exact path="/breeds/:breed" component={Cat} />
            <Route exact path="/">
              <React.Fragment>
                <h1>Cats!</h1>
                <div
                  id="cat-list"
                  style={{
                    position: "fixed",
                    width: "20vw",
                    border: "1px solid black",
                    height: "80vh",
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {this.state.catBreeds.map((cat) => (
                    <a href={"/breeds/" + cat.name}>{cat.name}</a>
                  ))}
                </div>
              </React.Fragment>
            </Route>
          </Switch>
        </Router>
      );
    }
  }
}

export default Main;
