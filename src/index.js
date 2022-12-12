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


//*******************************************************************************************************
//TEST APP MIKAEL 1
//*******************************************************************************************************

var data=[];

const App = () => {

  const [inData, setIndata] = React.useState(""); // State hook for inData

    var myStyle = {
      color: '#0000FF'
    }

  //
  // Event handler for text input
  const handleChange = (event) => {
    setIndata(event.target.value);
  };

  //
  // Event handler for save button
  const handleSave = () => {
    data.push(inData);
    resetIndata(); // setIndata("");
  };

  //
  // Reset input field
    const resetIndata = () => {
      setIndata("");
    };
  
  //
  // Component rendering
    return (
      <div className="App">
        <input style={myStyle} type="text" placeholder="Input text" onChange={handleChange} value={inData} /> &nbsp;
        <button onClick={handleSave}>Save</button>&nbsp;{inData}
        <ul>
        {
          data.map((str) =>
              <li>{str}</li>
          )
        }
        </ul>
      </div>
    );
}
 
const root2 = ReactDOM.createRoot(document.getElementById('root2'));
root2.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//*******************************************************************************************************
//TEST APP MIKAEL 2
//*******************************************************************************************************

//2
var sortOrder = 1; // Default sort order - Ascending

//3-2
var datas=[
  {id:0,group:'Dua Lipa',song:'New Rules',album:'Dua Lipa', year:'2017'},
    {id:1, group:'Avicii',song:'Wake Me Up',album:'True',year:'2013'},
      {id:2, group:'Drake',song:'God’s Plan',album:'Scorpion',year:'2018'},
        {id:3,group:'Hov1',song:'Neon',album:'Hov1',year:'2017'}];

const App2 = () => {
    //3-1
    return (
    <div className="App">
      <List list={datas} />
    </div>
  )
};    

//4
const List = (props) => {
  var [values, setValues] = React.useState({}); // Hooks for input elems
  const [, forceUpdate] = React.useState(0); // Hook for elem update
  const [searchTerm, setSearchTerm] = React.useState(''); // Hook for search term


// Event handler for search button
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };


// Event handler for input elems
  const manageChange = (event) => {
    setValues(event.target.value);
    let elem = event.target.id[0]; // Ex. s2 => prop: song / id: 2
    let id = event.target.id[1];
    let i=0;
  // eslint-disable-next-line
    for(i=0;i<datas.length;i++) if(datas[i].id == id) break; // Get matching id for update
    id = i;
  // eslint-disable-next-line
    if (elem == 'g') datas[id].group = event.target.value;
  // eslint-disable-next-line
    if (elem == 's') datas[id].song = event.target.value;
  // eslint-disable-next-line
    if (elem == 'a') datas[id].album = event.target.value;
  // eslint-disable-next-line
    if (elem == 'y') datas[id].year = event.target.value;
  }


// Event handler for sort button
  const manageSort = (event) => {
    sortOrder *= -1;   
    filteredList = filteredList.sort((first, second) => {
                    return first.year > second.year ? sortOrder : -sortOrder;
                  })
    forceUpdate(n => !n); // Force render when sorted data  
  };


// Event handler for delete button
  const handleDel = (event) => {
    let id=event.target.id, i=0;
// eslint-disable-next-line
    for(i=0;i<datas.length;i++) if(datas[i].id == id) break; // Get matching id for removal
    datas.splice(i,1); // Remove record from datas
    forceUpdate(n => !n); // Force render  
  };


// Create filtered list based on search term 
let filteredList = props.list;
if(searchTerm) {
  filteredList = filteredList.filter(
    ({ group }) => group.toLowerCase().includes(searchTerm.toLowerCase()) 
  );
}

//5
  return (
  <div>
    <div id="searchDiv">
    <label htmlFor="search"></label>  
    &nbsp;<input id="search" onChange={handleChange} type="text" autoComplete="off" />&nbsp;<span class="glyphicon glyphicon-search" />
   </div>

  <table class="table table-striped">
  <thead>
    <tr><th>Edit</th><th>Group</th><th>Song</th><th>Album</th><th><button onClick={manageSort} >Year <span class="glyphicon glyphicon-sort"></span></button></th>
    </tr>
  </thead>
  <tbody>
      {

// Publish data array inclusive sorted on year and filtered on group
        //6-1
        filteredList.map((item, index) => {

        values = item;
        //6-2
        return (
  <tr>
    <td>
      <button class="btn" id={item.id} onClick={handleDel}>
        <span  class="glyphicon glyphicon-remove" ></span>&nbsp;&nbsp;Remove
      </button>
    </td>
    <td><input id={'g'+item.id} class="noborder" type="text" onChange={manageChange} value={values.group} /></td>
    <td><input id={'s'+item.id} class="noborder" type="text" onChange={manageChange} value={values.song} /></td>
    <td><input id={'a'+item.id} class="noborder" type="text" onChange={manageChange} value={item.album} /></td>
    <td><input id={'y'+item.id} class="noborder" type="text" onChange={manageChange} value={item.year} /></td>

  </tr>
      )})
      }
  </tbody>
</table>
</div>
  )    
      };

      const root3 = ReactDOM.createRoot(document.getElementById('root3'));
      //1
      root3.render(
        <React.StrictMode>
          <App2 />
        </React.StrictMode>
      );







      






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
