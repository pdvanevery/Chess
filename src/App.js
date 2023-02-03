import './App.css';
import { useState } from 'react';
import {Chessboard} from 'react-chessboard'
import { Chess } from 'chess.js';

function App() {

  const [game, setGame] = useState(new Chess())
  
  //function for game state
  function safeGameMutate(modify){
    setGame(()=> {
      const update = new Chess ()
      update.loadPgn(game.pgn())
      modify(update)
      return update
    })
  }

  //Movement of Computer
  function makeRandomMove(){
    const possibleMove = game.moves()

    //exit if the game is over
    if(game.game_over() || game.in_draw() || possibleMove.length === 0 ) return
    
    //select random move
    const randomIndex = Math.floor(Math.random() * possibleMove.length)

    //play random move
    safeGameMutate((game) => {
      game.move(possibleMove[randomIndex])
    })
  }

  //Perform an action when a Piece is dropped by a User
  function onDrop(source,target){
    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: source,
        to: target,
        promotion:'q'
      })
  })
    
    //illegal move
    if(move == null) return false

    //valid move, checks every 200ms
    setTimeout(makeRandomMove, 200)
    return true
  }

  return (
  <div className='game'>
     <Chessboard 
     position={game.fen()}
     onPieceDrop={onDrop}
     />
  </div>
  );
}

export default App;
