import React,{useEffect, useState} from 'react'
import Data from './Fields.json'
import Checker from '../Checker/Checker'
import Triangle from './Triangle/Triangle'
import getCheckers from '../getCheckers/getCheckers'
import './Board.css'
import axios from 'axios'

const Board = () => {
    const [serverGameBoard,setServerGameBoard] = useState({})
    const [rightUpList,setRightUpList]= useState([])
    const [leftUpList,setLeftUpList]= useState([])
    const [leftDownList,setLeftDownList]= useState([])
    const [rightDownList,setRightDownList]= useState([])
    const getData=()=>{
        axios
        .get('http://localhost:8082/api/game/board')
        .then((res)=>{
            //setServerGameBoard({...res.data})
            setLeftDownList(res.data.boardFields.filter((f)=>f.position<=5))
            setRightDownList(res.data.boardFields.filter((f)=>f.position>5 && f.position<=11))
            setLeftUpList(res.data.boardFields.filter((f)=>f.position>11 && f.position<=17))
            setRightUpList(res.data.boardFields.filter((f)=>f.position >17 && f.position<=23))
        })
        .catch((err)=>{
            console.log(err)
        })
        console.log("ggg")
    }
    useEffect(()=>{
        getData()
    },[])




    const renderTriangle = (array) => {
        return array.map((f,index)=> {
            let position,color,number,player;
		
            if(f.position>=0 && f.position<=11) 
                position="bottom"
            else 
                position="top"
            
            if(f.position%2 === 0)
                color= "1"
            else
                color= "2"	
            
            if(f.checkers.length>0)
                if(f.checkers[0].player.id=== serverGameBoard.player1.id)
                    player=1
                else
                    player=2
                
            number = f.checkers.length
            
          return (
                <div className={"tria_container " + position}>
                    <Triangle id={index} color={color} position={position}>
                        {getCheckers(player,number)}
                    </Triangle>
                </div>
            )
        })
    }
    return (
        <div id="game_board" className="container-fluid">

            <div id="leftSide" className="row">
                <div className="blocksUp">
                    {renderTriangle(leftUpList)}
                </div>
                <div className="blocksDown">
                    {renderTriangle(leftDownList)}
                </div>
            </div>

            <div id="rightSide" className="row">
                <div className="blocksUp">
                    {renderTriangle(rightUpList)}
                </div>
                <div className="blocksDown">
                    {renderTriangle(rightDownList)}
                </div>
            </div>

        </div>
    )
}

export default Board