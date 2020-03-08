import React, { Component } from 'react';
import Visuals from './containers/Visuals/Visuals';
import Word from './containers/Word/Word';
import Input from './containers/Input/Input';
import Help from './containers/Help/Help';
import axios from './axios-words';
import './App.css';

const HangmanContext = React.createContext();

class HangmanProvider extends Component {
    state = {
        gameOver: false,                        // boolean
        gameStatus: 'init',                     // init / won / lost
        letters: [
            { value: 'a', status: 'init' },      // init / hit / miss
            { value: 'b', status: 'init' },
            { value: 'c', status: 'hit' },
            { value: 'd', status: 'miss' },
            { value: 'e', status: 'init' },
            { value: 'f', status: 'init' },
            { value: 'g', status: 'init' },
            { value: 'h', status: 'init' },
            { value: 'i', status: 'init' },
            { value: 'j', status: 'init' },
            { value: 'k', status: 'init' },
            { value: 'l', status: 'init' },
            { value: 'm', status: 'init' },
            { value: 'n', status: 'init' },
            { value: 'o', status: 'init' },
            { value: 'p', status: 'init' },
            { value: 'q', status: 'init' },
            { value: 'r', status: 'init' },
            { value: 's', status: 'init' },
            { value: 't', status: 'init' },
            { value: 'u', status: 'init' },
            { value: 'v', status: 'init' },
            { value: 'w', status: 'init' },
            { value: 'x', status: 'init' },
            { value: 'y', status: 'init' },
            { value: 'z', status: 'init' },
        ],
        wrongLetterCount: 0,        // 0-7
        unknownLetterCount: null,   // total number of unknown letters in word
        selectedWord: '',  // word from library (should be null, this is for testing purposes)
        helpShown: false            // boolean
    }

    componentDidMount() {
        let randomWordIndex = Math.floor(Math.random() * 7381);
        axios.get(`https://hangman-react-a7336.firebaseio.com/${randomWordIndex}.json`)
            .then(response => {
                this.setState({selectedWord: response.data.word});
            })
            .catch(error => {
                console.log("foutje");
            });
    }

    render() {
        return(
            <HangmanContext.Provider value={{
                state: this.state,
                initInputLetters: () => {
                    // console.log("init input letter buttons");
                    const startArray = [];
                    let allLetters = this.state.letters;
                    var resetLetters = allLetters.map((letter) => {
                        startArray.push({
                            value: letter.value,
                            status: 'init'
                        });
                    })
                    this.setState((prevState, props) => ({
                        letters: startArray
                    }));
                },
                newWordFromDb: () => {
                    let randomWordIndex = Math.floor(Math.random() * 7381);
                    axios.get(`https://hangman-react-a7336.firebaseio.com/${randomWordIndex}.json`)
                        .then(response => {
                            this.setState({selectedWord: response.data.word});
                        })
                        .catch(error => {
                            console.log("foutje");
                        });
                }
            }}>
                {this.props.children}
            </HangmanContext.Provider>
        );
    }
}

class App extends Component {
    render() {
        return (
        <HangmanProvider>
            <div className="App">
                <Visuals />
                <Word />
                <div className="temp">----</div>
                <Input />
                <Help />
            </div>
        </HangmanProvider>
        );
    }
}

export {HangmanContext};
export default App;