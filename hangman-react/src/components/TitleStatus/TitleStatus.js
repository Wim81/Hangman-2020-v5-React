import React, { Component } from 'react';
import { HangmanContext } from '../../App';
import styled, { keyframes } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import title_hangman from '../../assets/title_hangman.png';
import title_alright from '../../assets/title_alright.png';
import title_gameover from '../../assets/title_gameover.png';

class TitleStatus extends Component {

    render() {
        return (
            <HangmanContext.Consumer>
                {(context) => {
                    let bgImg = context.state.gameStatus;
                    let classes = null;
                    switch (bgImg) {
                        case 'init':
                            classes = "show_title_hangman";
                            break;
                        case 'in_progress':
                            classes = "show_title_hangman";
                            break;
                        case 'won':
                            classes = "show_title_alright";
                            break;
                        case 'lost':
                            classes = "show_title_gameover";
                            break;
                        default:
                            return 'Something went wrong';
                    }

                    return (
                        <StyledTitleStatus className={classes}>
                            <CSSTransition
                                classNames='title'
                                in={this.props.mode1}
                                timeout={600}
                                unmountOnExit >
                                {state => (
                                    <div
                                        className="titleStatus title_hangman"
                                        style={{
                                            top: state === 'exiting' ? '-100%' :
                                                state === 'entering' ? '100%' : '0%'
                                        }}>
                                    </div>
                                )}
                            </CSSTransition>

                            <CSSTransition
                                classNames='won'
                                in={this.props.mode2 === "won"}
                                timeout={600}
                                unmountOnExit >
                                {state => (
                                    <div
                                        className="titleStatus title_game_won"
                                        style={{
                                            transition: 'all 0.6s ease-in-out',
                                            top: state === 'exiting' ? '-100%' :
                                                state === 'entering' ? '100%' : '0%'
                                        }}>
                                        {context.state.gameOver}
                                    </div>
                                )}
                            </CSSTransition>

                            <CSSTransition
                                classNames='lost'
                                in={this.props.mode2 === "lost"}
                                timeout={600}
                                unmountOnExit >
                                {state => (
                                    <div
                                        className="titleStatus title_game_lost"
                                        style={{
                                            transition: 'all 0.6s ease-in-out',
                                            top: state === 'exiting' ? '-100%' :
                                                state === 'entering' ? '100%' : '0%'
                                        }}>
                                        {context.state.gameOver}
                                    </div>
                                )}
                            </CSSTransition>

                        </StyledTitleStatus>
                    );
                }
            }
            </HangmanContext.Consumer>
        );
    }
}

const keyFramesMoveIn = keyframes`
    0% { top: 100%; opacity: 0; }
    1% { top: 99%; opacity: 1; }
    100% {top: 0%; opacity: 1;}
`;

const keyFramesMoveOut = keyframes`
    0% { top: 0%; opacity: 1; }
    30% { top: 0%; opacity: 1; }
    99% { top: -100%; opacity: 1; }
    100% {top: -100%; opacity: 0;}
`;

const StyledTitleStatus = styled.div`
    width: 72%;
    height: 25%;
    position: absolute;
    top: 2%;
    left: 14%;
    overflow: hidden;
    
    .titleStatus {
        background-position: center top;
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        top: 100%;
        height: 100%;
        width: 100%;
    }
    
    .title-enter,
    .won-enter,
    .lost-enter {
        animation: ${keyFramesMoveIn} 0.6s forwards;
    }
    
    .title-exit,
    .won-exit,
    .lost-exit {
        animation: ${keyFramesMoveOut} 0.6s forwards;
    }
   
    .title_hangman { background-image: url(${title_hangman})};
    .title_game_won { background-image: url(${title_alright})};
    .title_game_lost { background-image: url(${title_gameover})};
`;

export default TitleStatus;
