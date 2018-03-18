import React, { Component } from 'react';
import './RoomSticker.css';
class RoomSticker extends Component {
    constructor(props){
        super(props);
                this.state={
            myImg: require("../img/img1.png"),
            myImg2: require("../img/img2.png"), 
            myImg3: require("../img/img3.png"), 
 
        }
        

    }
    

    
    render() {

     return(
        <div className="main">
            <p className="p">Be the Archaeolgist<br/><br/>Whoes bones are they? Match the bones and the dinosaur</p>
         <div className="containerSt">
         
            <button className="but1" onClick={this.props.handleDisplay.bind(this,"room1")}>Start Digging</button>

        </div>
            <div className="bg1">
            <img className="img1" src={this.state.myImg} height={80}/>
            <img className="img2" src={this.state.myImg2} height={80}/>
            </div> 
         </div>
     )
        
    }
}

export default RoomSticker;
