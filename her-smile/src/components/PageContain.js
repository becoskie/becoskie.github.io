import React, { Component } from "react";
import Home from "./pages/Home";
import Mary from "./pages/Mary";
import mary from "../mary.json"
import MaryCard from "./MaryCard";
import ScoreBar from "../components/ScoreBar";

class PageContain extends Component {
  state = {
    currentPage: "Home",
    mary,
    maryClicked: [],
    score: 0,
    highScore: 0,
    message: "Click Image To Begin!"
  };

  imageClick = event => {
    const currentMary = event.target.alt;
    const MaryAlreadyClicked = this.state.maryClicked.indexOf(currentMary) > -1;

    if (MaryAlreadyClicked) {
      if(this.state.score > this.state.highScore) {
        this.setState( {highScore: this.state.score} )
      }
      this.setState({
        maryClicked: [],
        score: 0,
        message: "You made Mary smell like yesterday!",
      });

    } else {
      if(this.state.score >= this.state.highScore) {
        this.setState( {highScore: this.state.score + 1} )
      }

      this.setState(
        {
          mary: this.state.mary.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          maryClicked: this.state.maryClicked.concat(
            currentMary
          ),
          score: this.state.score + 1,
          message: "Good job! Keeping Mary Fresh",
        },
        () => {
          if (this.state.score === 12) {
            this.setState({
              mary: this.state.mary.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              maryClicked: [],
              score: 0,
              message: "You Kept Mary fresh for 12 days!"
            });
          }
        }
      );
    }

  }; // end image clicked


  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    if (this.state.currentPage === "Home") {
      return (
        <Home
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
        />
      );
    } else if (this.state.currentPage === "Mary") {
      return <Mary>
        <ScoreBar 
          message = {this.state.message}
          score = {this.state.score}
          highScore = {this.state.highScore}
        />
      {this.state.mary.map(mary => (
        <MaryCard
          imageClick={this.imageClick}
          id={mary.id}
          key={mary.id}
          image={mary.image}
        />
      ))} 
      </Mary>;
    } 
  };

  render() {
    return (
      <div>
        {this.renderPage()}
      </div>
    );
  }
}

export default PageContain;
