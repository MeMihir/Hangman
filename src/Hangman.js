import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { 
      nWrong: 0, 
      guessed: new Set([" ","-"]), 
      answer: "apple",
      isWord : false,
      isWin  : false
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleWord  = this.handleWord.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset= this.handleReset.bind(this);
    this.handleKeyPress=this.handleKeyPress.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */

  arr2string(arr) {
    let str="";
    arr.forEach(element => {
      str+=element;
    });
    console.log(str);
    return str;
  }

  guessedWord() {
    let ans = this.state.answer.split("").map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
    return ans;
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
    this.setState(st => ({
      isWin : this.arr2string(st.answer.split("").map(ltr => (this.state.guessed.has(ltr) ? ltr : "_")))===st.answer
    }))
  }

  handleWord(evt) {
    this.setState({answer : evt.target.value.toLocaleLowerCase()})
  }

  handleSubmit(evt){
    this.setState({isWord : true})
  }

  handleReset(evt){
    this.setState({
      isWord : false,
      answer : "",
      nWrong : 0,
      guessed : new Set([" ","-"]),
      isWin : false
    })
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "0123456789abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        key={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  handleKeyPress(evt){
    let ltr = evt.key;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
    this.setState(st => ({
      isWin : this.arr2string(st.answer.split("").map(ltr => (this.state.guessed.has(ltr) ? ltr : "_")))===st.answer
    }))
    console.log(ltr);
  }


  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        {!this.state.isWord ? 
        <div>
            <label>WORD : </label>
            <input type="text" name="word" onChange={this.handleWord}></input>
            <button onClick={this.handleSubmit}>Submit</button>
        </div>
        :
        <div onKeyPress={this.handleKeyPress} tabIndex='0'>
          <div className="Hangman-left">
            <img alt={String(this.state.nWrong) + "Wrong"} src={this.props.images[this.state.nWrong]} />
          </div>
          <div className="Hangman-right">
            {this.state.nWrong !== this.props.maxWrong ?
              <p><p className='Hangman-word'>{this.guessedWord()}</p>
              {!this.state.isWin ? 
                <p className='Hangman-btns'>{this.generateButtons()}</p>
                :
                <p className="Hangman-btns"><strong>YOU WIN!!!</strong></p>}</p>
              :
              <p><p className='Hangman-word'>{this.state.answer}</p>
                <p className="Hangman-btns"><strong>YOU LOOSE!!!</strong></p></p>
            }
          </div>
          <p><strong>Number of Wrong Guesses : {this.state.nWrong}</strong></p>
          <button onClick={this.handleReset}>Restart</button>
        </div>
        }
        </div>
    );
  }
}
export default Hangman;
