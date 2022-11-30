/*
NOTES:
- use devtool "Rect Dev." for FF

*/

//1
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//******************
// REACT COMPONENT (BASE)
//******************
class Game extends React.Component {
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


//******************
// REACT COMPONENT(PARENT) 
//******************
class Board extends React.Component {
    //7 create constructor, add Board's initial stat to contain 
    //an array of 9 nulls
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            //14-1 set "X" as default.. bool
            xIsNext:true,
        };
    }

    //12 add handleClick method
    handleClick(i) {
        //(slice means copying square instead of modify)
        /*
        There are generally two approaches to changing data. The first approach is to mutate 
        the data by directly changing the data’s values. The second approach is to replace 
        the data with a new copy which has the desired changes.
        */
        const squares = this.state.squares.slice();

        //18 ignore click after win
        if(calculateWinner(squares) || squares[i]) {
            return;
        }

        //14-1 choose char
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        //squares[i] = "X";
        this.setState({
            squares: squares,
            //14-3 flip bool value
            xIsNext: !this.state.xIsNext,
        });
    }

    //actual square render
    renderSquare(i) {
        //2-1 pass prop to square (child)
        return (
            //(passing down two props to Square)
            <Square
                //10 read from squares in this.state (to read X O NULL)
                value={this.state.squares[i]}
                //11-1 pass down a funnction to Square, by click
                onClick={() => this.handleClick(i)}//x4
            />
        );
        //return <Square value={i} />;
    }

    //15 change status
    render() {
        //const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        //17 declare a winner
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner){
            status = "Winner: " + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

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

//******************
// REACT COMPONENT (CHILD)
//******************
//13 create a function component instead
//notice no arrow function in props, as before
//it works with no changes in Board/Game
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}



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

//**********
// FUNCTION
//**********
//16 paste the winnder function code
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  //********
  //HISTORY 
  //********
  

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
