/*
NOTES:
- use devtool "Rect Dev." for FF

*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//******************
// REACT COMPONENT (BASE)
//******************
class Game extends React.Component {
//---1 call Board component (no props passed)
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

//******************
// REACT COMPONENT(PARENT) 
//******************
class Board extends React.Component {
    //---2-1 run constructor
    constructor(props) {
        super(props);
        //---2-2 set initial state; all squares to empty and X as start player
        this.state = { 
            squares: Array(9).fill(null),
            xIsNext:false
        };
    }

    //---6-1 Square component is clicked; activate
    handleClick(i) {
        //---6-2 save a copy of squares from state (slice means copying square instead of modify)
        const squares = this.state.squares.slice();

        //---6-3 ignore click if winner true or click on square already exist 
        if(calculateWinner(squares) || squares[i]) {
            return;
        }

        //---6-4 select next char, check if true(X)/false(O)
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        //---6-5 set new state for squares (incl. the new change) and next char (opposite of current) 
        this.setState({
            squares: squares,
            //---6-6 set next char to not X (false)
            xIsNext: !this.state.xIsNext,
        });
    }

    //---4-1
    renderSquare(i) {
        return (
            //(passing down two props to Square)
            //---4-2 call component; pass prop data value and, call onClick method (when clicked)
            <Square
                //--4-3 read from squares in this.state (to read X O NULL)
                value={this.state.squares[i]}
                //--4-4 pass down a funnction to Square, by click
                onClick={() => this.handleClick(i)}//x4
            />
        );
    }

    //---3-1 run render
    render() {
        //---3-2 call method for winner
        const winner = calculateWinner(this.state.squares);
        let status;

        //---3-6 check if winner, if not then write next player
        if (winner){
            status = "Winner: " + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        //---3-7 return JSX to DOM; call renderSquare
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

//******************
// REACT COMPONENT (CHILD) - FUNCTION COMPONENT
//******************
//---5-1 take prop data and return JSX for DOM render; set evemt listener; return click to method handleClick
function Square(props) {
    return (//5-2 event listener
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

//**********
// FUNCTION
//**********
//--3-3 multidimensional array
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    //--3-4 loop through multidimensional array
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];               //??????
      
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; //true
      }
    }
    //--3-5 no winner, return null (false)
    return null;
  } 

const root = ReactDOM.createRoot(document.getElementById("root"));
//0 root call top component
root.render(<Game />);






//NOTES

/*
When a Square is clicked, the onClick function provided by the Board is called. 
Here’s a review of how this is achieved:

x1    The onClick prop on the built-in DOM <button> component tells React to set up 
    a click event listener.
x2    When the button is clicked, React will call the onClick event handler that is 
    defined in Square’s render() method.
x3    This event handler calls this.props.onClick(). The Square’s onClick prop was 
    specified by the Board.
x4    Since the Board passed onClick={() => this.handleClick(i)} to Square, the 
    Square calls the Board’s handleClick(i) when clicked.
x5    We have not defined the handleClick() method yet, so our code crashes. If you 
    click a square now, you should see a red error screen saying 
    something like “this.handleClick is not a function”.
*/

/*
AT STEP 12
After these changes, we’re again able to click on the Squares to fill them, the same as we 
had before. However, now the state is stored in the Board component instead of the individual 
Square components. When the Board’s state changes, the Square components re-render automatically. 
Keeping the state of all squares in the Board component will allow it to determine the winner in 
the future.

Since the Square components no longer maintain state, the Square components receive values from 
the Board component and inform the Board component when they’re clicked. In React terms, the Square
components are now controlled components. The Board has full control over them.

Note how in handleClick, we call .slice() to create a copy of the squares array to modify instead 
of modifying the existing array. We will explain why we create a copy of the squares array in the 
next section.
*/


        /*
        There are generally two approaches to changing data. The first approach is to mutate 
        the data by directly changing the data’s values. The second approach is to replace 
        the data with a new copy which has the desired changes.
        */


/*class Square extends React.Component {
    //5 add a constructur
    //11-2 no longer keeps track of Game's state
    /*constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }*/
/*
    //actual each square
    render() {//x2
        return (
            //6 change render method to display current state's value when clicked
            //3 put X on click (arrow function)
            //2-2 get data from board (parent) by props
            <button className="square"
                onClick={() => {//x1
                    this.props.onClick()//x3
                }}>
                {this.props.value}
            </button>
            //{this.state.value}
        );
    }
}
*/

  //********
  //HISTORY 
  //********
