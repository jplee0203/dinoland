import React, { Component } from 'react';
import './Sticker.css';
import mySocket from "socket.io-client";
import RoomSticker from "./comp2/RoomSticker";

class Sticker extends Component {
    constructor(props){
        super(props);
        this.state={
            myImg: require("./img/img1.png"),
            myImg2: require("./img/img2.png"), 
            myImg3: require("./img/img3.png"), 
            myImg4: require("./img/img4.png"), 
            allUsers:[],
            myId: null,
            showDisplay: false,
            stickers:[],
        }
        
        this.handleImage = this.handleImage.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
    }
    
    componentDidMount(){
        this.socket = mySocket("https://dinoland-sticker-socket.herokuapp.com/");
        
        this.socket.on("userjoined", (data)=>{
            this.setState({
                allUsers: data
            }); 
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myId: data
                
                });
            
                    this.refs.theDisplay.addEventListener("mousemove", (ev)=>{
                    if(this.state.myId === null){
                        //FAIL
                        return false;
                    }

                    this.refs["u"+this.state.myId].style.left = ev.pageX-270+"px";
                    this.refs["u"+this.state.myId].style.top = ev.pageY-140+"px";


                    this.socket.emit("mymove", {
                        x: ev.pageX,
                        y: ev.pageY,
                        id: this.state.myId,
                        src: this.refs["u"+this.state.myId].src
                    });
                }); 
            
                    this.refs.theDisplay.addEventListener("click", (ev)=>{
                        this.socket.emit("stick", {
                        x:ev.pageX-270+"px",
                        y:ev.pageY-140+"px",
                        src:this.refs["u"+this.state.myId].src
                        });
                    });
        });
        
        this.socket.on("newsticker", (data)=>{
            this.setState({
                stickers:data
            })
        })
        
        this.socket.on("newmove", (data)=>{
            this.refs["u"+data.id].style.left = data.x+"px"; 
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].src = data.src;
        });
        
  
        
    }
    
    handleImage(evt){
        this.refs["u"+this.state.myId].src = evt.target.src;        
    }
    
    handleDisplay(roomString){
        this.setState({
            showDisplay:true
        })
        
        this.socket.emit("joinroom", roomString);
    }
    
    
    
    render() {
        
        var allimgs = this.state.allUsers.map((obj, i)=>{
            return(
                <img ref={"u"+obj} className="allImgs" src={this.state.myImg} height={200} key={i} />  
                
            );
        });
        
        var allstickers = this.state.stickers.map((obj, i)=>{
            var mystyle = {left:obj.x, top:obj.y};
            return(
                <img style={mystyle} key={i} src={obj.src} height={200} className="allImgs"/>
            )
        })
        
        var comp = false;
            
            
       if(this.state.showDisplay == false){
              comp = (
              <RoomSticker handleDisplay={this.handleDisplay}/>
              )
        }else if (this.state.showDisplay == true){
            comp = (
              <div className="App">
                <div ref="theDisplay" className="display">
                    {allimgs}
                    {allstickers}
                </div>
                <div className="controls">
                    <img src={this.state.myImg} height={90} width={75} onClick={this.handleImage} />
                    <img src={this.state.myImg2} height={80} onClick={this.handleImage} />
                    <img src={this.state.myImg3} height={80} onClick={this.handleImage} />
                    <img src={this.state.myImg4} height={80} onClick={this.handleImage} />
                </div>
            </div>
              ) 
        }
            
        
        return (
            <div className="bg">{comp}</div>
        );
    }
}

export default Sticker;
