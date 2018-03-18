import React, { Component } from 'react';
import mySocket from 'socket.io-client';
import Sticker from './comp/Sticker';
import Maze from './comp/Maze';
import Qna from './comp/Qna';
import './App.css';

const styles = {
    transition: 'all 1s ease-out'
};

class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            myname: "",
            users: [],
            mode: 0,
            msgs: [],
            mymsg: "",

            benNum:0,
            benArr: [require("./comp/img/benegg0.png"), require("./comp/img/benegg1.png"), require("./comp/img/benegg2.png"), require("./comp/img/benegg3.png"), require("./comp/img/benegg4.png"),require("./comp/img/ben.png"),],
            benImg: require("./comp/img/benegg.png"), 

            alexNum:0,
            alexArr: [require("./comp/img/alexegg0.png"), require("./comp/img/alexegg1.png"), require("./comp/img/alexegg2.png"), require("./comp/img/alexegg3.png"), require("./comp/img/alexegg4.png"),require("./comp/img/alex.png"),],
            alexImg: require("./comp/img/alexegg.png"), 
          
            changePages:"",
            showUser:true,
            size:0
          
        }
        this.changePage = this.changePage.bind(this);
        this.showPanel= this.showPanel.bind(this);
        this.changeColor= this.changeColor.bind(this);
        this.changeSize= this.changeSize.bind(this);
        this.clickBen = this.clickBen.bind(this);
        this.clickAlex = this.clickAlex.bind(this);
    }
    
    
clickBen() {
    
 this.setState({
        benNum: this.state.benNum+1
    });  
    
 this.setState({
        benImg: this.state.benArr[this.state.benNum]
    });  
    
if(this.state.benNum > 5){
   this.setState({
        benImg: require("./comp/img/ben.png")
    });  
} 
       
if(this.state.benNum == 5){
   document.getElementById("ben").className = "ben2";
    document.getElementById("benP").style.opacity = 1;
    document.getElementById("benP").style.transition = "opacity 3s" 
} 
    
}    
    
clickAlex(){
 this.setState({
        alexNum: this.state.alexNum+1
    });  
 this.setState({
        alexImg: this.state.alexArr[this.state.alexNum]
    });  
    
if(this.state.alexNum > 5){
   this.setState({
        alexImg: require("./comp/img/alex.png")
    });  
}   

    if(this.state.alexNum == 5){
   document.getElementById("alex").className = "alex2"  
  document.getElementById("alexP").style.opacity = 1;
    document.getElementById("alexP").style.transition = "opacity 3s" 
} 
    
}        
    
 changeSize() {  
     this.state.size++;
     var displaySize = document.getElementById("chattingBox");
      var sizeSet = document.getElementById("chattingMsgSet");
     if(this.state.size === 1){
        displaySize.style.height="40%"; 
     } else if (this.state.size === 2){
        displaySize.style.height="60%"; 
     } else if (this.state.size === 3){
        displaySize.style.height="80%"; 
     } else if (this.state.size === 4){
        displaySize.style.height="100%"; 
        sizeSet.innerHTML = "-"
     } else if (this.state.size === 5){
        displaySize.style.height="20%"; 
        this.state.size = 0;
        sizeSet.innerHTML = "+"
         
     } 
      console.log(this.state.size)
 
 }       
    
componentDidUpdate() {
    if (this.state.mode == 1) {
//       this.newInput.focus(); 
        this.changeColor();
          document.getElementById("chattingMsg").scrollTop = document.getElementById("chattingMsg").scrollHeight;
    }
}    

  showPanel() {
     if(this.state.showUser == true){
        this.setState({
        showUser:false
    });  
        document.getElementById("panel").style.right=0;
        document.getElementById("panel").style.transition = "right 1s"; 
        document.getElementById("chattingBox").style.width="80%";
        document.getElementById("chattingBox").style.transition = "width 1s";  
     } else {
        this.setState({
        showUser:true
        });  
        document.getElementById("panel").style.right="-20%";
        document.getElementById("panel").style.transition = "right 1s"; 
        document.getElementById("chattingBox").style.width="100%";
        document.getElementById("chattingBox").style.transition = "width 1s"; 
         
     }
    
    
    } 
    
changeColor(){
    // change header color 
var rgb = 10;
var r = 0;
var g = 0;
var b = 0;

rgb = Math.round(Math.random()*255);
r = Math.round(Math.random()*255);
g = Math.round(Math.random()*255);
b = Math.round(Math.random()*255);
document.getElementById("showUser").style.backgroundColor = "rgb("+r+","+g+","+b+")";  

 
function doChange() {
  rgb = Math.round(Math.random()*255);
  r = Math.round(Math.random()*255);
  g = Math.round(Math.random()*255);
  b = Math.round(Math.random()*255);    
  document.getElementById("showUser").style.backgroundColor = "rgb("+r+","+g+","+b+")"; 
  document.getElementById("showUser").style.transition = "background-color 3s";
}

var changeBg = setInterval(doChange, 3000); 
    
    
    
}    
    
    
changePage(bool){
    
        var arg = bool;
        this.setState({changePages:arg})
    }
    
    joinChat1 = ()=>{
       
        this.setState({
            mode: 1,
            changePages:"maze"
        })
        this.socket = mySocket("https://dinoland-chat-socket.herokuapp.com/"); 
        var obj = {
            room: "room1",
            user: this.state.myname
        }
        
        this.socket.emit("joinRoom", obj);
        
        this.socket.on("userjoined", (data)=>{
            this.setState({
                users: data
            });    
        });
        this.socket.on("msgs", (data)=>{
            this.setState({
                msgs: data
            });
        });
        
   
    }
    
        joinChat2 = ()=>{
       console.log(this.state.mode);
        this.setState({
            mode: 1,
            changePages:"sticker"
        })
        this.socket = mySocket("http://localhost:10001"); 
        var obj = {
            room: "room2",
            user: this.state.myname
        }
        
        this.socket.emit("joinRoom", obj);
        
        this.socket.on("userjoined", (data)=>{
            this.setState({
                users: data
            });    
        });
        this.socket.on("msgs", (data)=>{
            this.setState({
                msgs: data
            });
        });
        
   
    }
        
        joinChat3 = ()=>{
       console.log(this.state.mode);
        this.setState({
            mode: 1,
            changePages:"qna"
        })
        this.socket = mySocket("http://localhost:10001"); 
        var obj = {
            room: "room3",
            user: this.state.myname
        }
        
        this.socket.emit("joinRoom", obj);
        
        this.socket.on("userjoined", (data)=>{
            this.setState({
                users: data
            });    
        });
        this.socket.on("msgs", (data)=>{
            this.setState({
                msgs: data
            });
        });
        
   
    }
    
   
    
    handleName = (evt)=>{
        this.setState({
            myname: evt.target.value
        })
    }
    
    handleMyMsg = (evt)=>{
        this.setState({
            mymsg: evt.target.value
        })
    }
    
    sendMsg = ()=>{
        var msg = this.state.myname + ": " + this.state.mymsg;     
        
        this.socket.emit("sendmsg", msg);
    }
    
    render() {   
        
        var allmsgs = null;
         var pageDisplay = null;
        var userList = null;
        var loginPage = null;
        
        if(this.state.changePages == "maze"){
              pageDisplay = (
              <Maze/>
              )
        } else if(this.state.changePages == "sticker"){
                pageDisplay = (
              <Sticker/>
              )  
                  
              }
          else if(this.state.changePages == "qna"){
                    pageDisplay = (
                <Qna/>    
                )
                }
        if(this.state.mode == 0){
            loginPage = (
                <div className="loginBox">         
            <div className="loginBox_inside">
                    <input className="loginInp" type="text" placeholder="enter username" onChange={this.handleName} />
                    <button className="loginBut1" onClick={this.joinChat1.bind(this, "room1")}>Room 1</button>
                    <button className="loginBut2" onClick={this.joinChat2.bind(this, "room2")}>Room 2</button>
                    <button className="loginBut3" onClick={this.joinChat3.bind(this, "room3")}>Room 3</button>
                   </div>
               </div>  
            
            );
        }else if(this.state.mode == 1){
            
            var msgs = this.state.msgs.map((obj, i)=>{
                return(
                     <div className="speech-box">  
              <div className="speech-img">
            </div> 
            <div key={i} className="speech-bubble">
               {obj}
            </div>
        </div>
                )
            })
            
            allmsgs = (
                 <div className="chattingBox" id="chattingBox">
                    <div className="chattingBox_display"> 
                          <div className="chattingMsg" id="chattingMsg">
                          {msgs} 
                          </div>  
                    </div> 
                
                    <div className="chattingBox_sending">
                         <div className="chattingBox_sendingMsg">
                            <input className="chattingMsgInp" type="text" placeholder="type message here" onChange={this.handleMyMsg}/>
                           <button className="chattingMsgBut" onClick={this.sendMsg}>Send</button>
                            <button className="chattingMsgSet" id="chattingMsgSet" onClick={this.changeSize}>+</button>
                         </div>
                    </div>
                  </div>
               
            );
            
                var users = this.state.users.map((obj, i)=>{
            return(
                <div key={i}>
                    {obj}
                </div>
            )
            
            
        })
        
          userList = (
            <div className="userListPanel" id="panel">
              <div className="panelList_username">
                 <p className="panelList_text">People who are online</p> 
              </div>
              <div className="allusersDisplay">   
              {users}
              </div>

              <div className="showUser" id="showUser" onClick={this.showPanel}>
              </div>
            </div>  
         ) 
            
            
        }
        
   
        console.log(users);
        
        
        return (
            
             
            <div className="container" id="container">
                {loginPage}
                {allmsgs}
                {userList} 
                {pageDisplay}
            
              <p className="benInfo" id="benP">Ben is a happy herbivore triceratops who enjoys sleeping all day. His favourite food is broad-leaved plants that hangs low on the ground. However, because of his carnivorous friend Alex the T-rex, he likes to meat fresh meat. He often eats more than his friend.</p>
              <p className="alexInfo" id="alexP">Alex is a peaceful T-rex who grew up around the herbivore friends. He can speak both herbivore and carnivore language. He likes to roam around the forest to seek new adventure. Alex and Ben walk the forests to find new challenges and enjoy their lives.</p>
              <img className="ben" id="ben" onClick={this.clickBen} src={this.state.benImg}/>
              <img className="alex" id="alex" onClick={this.clickAlex} src={this.state.alexImg}/>
           
            </div>
        );
    }
}

export default App;