import React from "react";
import AddOption from "./AddOption";
import Action  from  "./Action";
import Header from './Header';
import Options from "./Options";
import OptionModal from "./OptionModal"




export default class IndecisionApp extends React.Component {
    state = {
        options : [],
        selectedOption : undefined

    };
    
    handleDeleteOptions = () => {
        this.setState(()=>({options:[] } ));
    }
    handleDeleteOption = (optionToRemove) => { 
    this.setState((prevState)=>({
        options : prevState.options.filter((option)=>{
            return optionToRemove !== option
        }) // in filter methord if optiontoremove string is not equal to individual array it will not remove else it will remove it from an array
    }))
    }
    handlePick = () => {
        this.setState(()=>{  
          const  randomElement = Math.floor(Math.random()*this.state.options.length)
            const option = this.state.options[randomElement]
            this.setState(() => ({
                selectedOption : option
            }))
        })
    }
    handleOption = (option) => {
        if(!option){
           return 'Enter valid value to add item.'
        }else if(this.state.options.indexOf(option)>-1 ){
            return 'This option already exist.'
        }
  

       this.setState((prevState)=> ({options: prevState.options.concat([option])}))
    }
    handleDeleteSelectedOption = () =>{
        this.setState(()=>({
          
            selectedOption : undefined
            
        }))
    } 
    componentDidMount(){
    // in this methord we will be fetching data 
    try {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
        if(options){
        this.setState(()=>({ options : options}))
        
        }    
    } catch (e) {
        // do nothing 
    }
    
    }
    componentDidUpdate( prevProps , prevState){
  // in this methord we will be saving data into our loccal storage
    if(prevState.options.length != this.state.options.length){
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json)

    }    
}
    componentWillUnmount(){

    }
    
     render(){
         
         const subTitle ='Put your life in the hands of computer'; 
         return(
             <div>
             <Header  subTitle={subTitle}/>
             <div className='container'>
             <Action 
             hasOptions = {this.state.options.length > 0}
             handlePick={this.handlePick}
             />
             <div className = 'widget'>
             <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}   
              handleDeleteOption=  {this.handleDeleteOption}
             />
             <AddOption
                 handleOption={this.handleOption}
             />
             </div>
             
             </div>
            
             <OptionModal
               selectedOption = {this.state.selectedOption}
               handleDeleteSelectedOption = {this.handleDeleteSelectedOption}
             />
             </div>
         );
     }
}
