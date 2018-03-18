import React, { Component } from 'react';
import './Qna.css';
import mySocket from 'socket.io-client';

class Qna extends Component {
    constructor(props){
        super(props);

        this.state={
            screen:0,
            host:null,
            qobj:{q:null, o1:null, o2:null},

          
            sampleImg:[require("./img/img4.png"),require("./img/img5.png"),require("./img/img5.png"),require("./img/img6.png")],
            questionImg:""
        }
        this.showSampleImg = this.showSampleImg.bind(this);
    }
    
    componentDidMount(){

         var randomImg = Math.floor((Math.random()*(this.state.sampleImg.length)));
        this.setState({
            questionImg:this.state.sampleImg[randomImg]
        })
        this.socket = mySocket("http://localhost:10004");
        
        this.socket.on("newq", (data)=>{
            this.setState({
                qobj:data
            })
            
        });
        
        this.socket.on("result", (data)=>{
            alert(data);
        })
    }
    
    handleRoom=(roomStr)=>{
        this.setState({
            screen:1
        });
        
        this.socket.emit("joinroom", roomStr);
        
    }
    
    handleHost=(isHost)=>{
        this.setState({
            screen:2,
            host:isHost
        });
    }
    
    handleQ=()=>{
        var obj = {
            q:this.refs.q.value,
            o1:this.refs.o1.value,
            o2:this.refs.o2.value,
            a:this.refs.a.value
            };   
        this.socket.emit("qsubmit", obj);
        alert("Question Submited");
    }
    
    
    handleA=(optionNum)=>{
        
        this.socket.emit("answer", optionNum);
    }
    
    showSampleImg(){
        var randomImg = Math.floor((Math.random()*(this.state.sampleImg.length)));
        this.setState({
            questionImg:this.state.sampleImg[randomImg]
        })
        console.log(this.state.questionImg);
    }
    
    render() {
        
        
        
        
        var comp = null;
        
        if(this.state.screen === 0){
            comp=(
                
                
                <div className="joinButContainer">
                <div className="instructionDiv"><h1 className="instructionP">Dinosaur Trivia</h1><p>How to Play<br/><br/>
                There will be one host that will make questions. And there is a Player who will answer the question.
                </p></div>
                    <button className="but1" onClick={this.handleRoom.bind(this, "room1")}>Join</button>
                </div>
              
                )
            } 
        else if (this.state.screen === 1){
            comp=(
                <div className="choiceButs">
                    <button className="butHost" onClick={this.handleHost.bind(this,true)}>Host</button>
                    <button className="butPlayer"  onClick={this.handleHost.bind(this,false)}>Player</button>
                </div>
                )
            } 
        
         else if(this.state.screen === 2){
                if(this.state.host === true){
                comp=(    
                    <div className="qContainer">
                     <p className="hostDesc">You will describe the dinosaur and give two options to choose from </p>
                        <img  className="qImg" src={this.state.questionImg} height={80}/>
                        <input className="inputQ" ref="q" type="test" placeholder="Ask a Question"/>
                        <input className="inputO1" ref="o1" type="test" placeholder="Option 1"/>
                        <input className="inputO2" ref="o2" type="test" placeholder="Option 2"/>
                        <select className="inputO3" ref="a">
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                        </select>
                        <button className="subBut" onClick={this.handleQ}>Submit the Question</button>
                    </div>
                    )
                    
                    
                }
             
                  else if(this.state.host === false){
                    comp=(
                        <div className="aContainer">   
                            
                            <div className="questionDisplay">{this.state.qobj.q}</div>
                        <p className="playerDesc">You will guess what is the right answer </p>
                            <button className="answer1" onClick={this.handleA.bind(this, "1")}>"Option 1"{this.state.qobj.o1}</button>
                            <button className="answer2" onClick={this.handleA.bind(this, "2")}>"Option 2"{this.state.qobj.o2}</button>
                        </div>
                    )
                }
            }
            
    

     return(
     <div className="bg">
         <div className="containerQ">
            {comp}
         </div>
     </div>     
     )
        
    }
}

export default Qna;
