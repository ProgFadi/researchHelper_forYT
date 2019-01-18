import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Context from './Context.js'
import SimpleAppBar from './components/Header.js'
import Main from './components/Main'
import Fuse from 'fuse.js'

let token='';
class App extends Component {
    constructor(){
      super()
      this.state = {
        searchValue: '',
        list: [],
        
        backupList:[],
        userData: this.getUserData()
          
          
      }
     
     
    
      
  
    }
    
    getUserData()
    {
      try{
        var obj=JSON.parse(localStorage.getItem('youtube_ext_user_data'))
        return obj;
      }
      catch(e)
      {
        return {token:'',message:'',userId:''}
      }
    }
   componentDidMount()
   {
   
    
    let ref=this;
    
    if(this.state.userData.token!='' && this.state.userData.userId!='')
    {
      console.log('there is user data obj, fetch entries now')
      fetch('https://youtube-research-extension.herokuapp.com/api/entries', {
        method: 'get',
        headers: {'Content-Type':'application/json','Authorization':ref.state.userData.token},
        
      }).then(function(response) {
       
        return response.json();
      }).then(function(data) {
       console.log('data ', data);
       console.log(typeof(data))
       if(data.hasOwnProperty('message'))
       {
         alert(data.message);
         window.location="login.html";
         return;
       }

       ref.setState(
         {
           list:data,
           backupList:data
         }
       )
      
      });
    }
    else{
    
      window.location="login.html";
    }
  
      
     
   }
    render(){
      return (
        <Context.Provider value={{ 
          state: this.state,
          actions: {
          
            updateSearchValue: (value)=>{
             
              this.setState({
                searchValue: value
              })
                console.log('value is : '+value)
                var options = {
                  shouldSort: true,
                  tokenize: true,
                 
                  threshold: 0,
                  location: 0,
                  distance: 100,
                  maxPatternLength: 32,
                  minMatchCharLength: 1,
                  keys: [
                    "title",
                    "notes"
                ]
                };
  
                var fuse = new Fuse(this.state.list, options); // "list" is the item array
               if(value=='')
               {
                let backUpList=this.state.backupList;
                this.setState({
                  list:backUpList
                })
              
                return;
               }
                var resultList = fuse.search(value);
               
                let list2=this.state.list;
               
                list2=[];
              
                list2=resultList;
               
                this.setState({
                  list:list2
                })
              
               
              
              
            },
            signOut: ()=>{
              localStorage.setItem('youtube_ext_user_data',"{token:'',message:'',userId:''}")
              window.location="login.html";
            }
            ,
            clearSearch : ()=>{
              let backUpList=this.state.backupList;
              this.setState({
                list:backUpList
              })
             
              return;
            },
            remove : (filtered)=>{
              this.setState({
                list:filtered,
                backupList:filtered
              })
             
            },
          
          }
          }}>

          <SimpleAppBar></SimpleAppBar>
          <Main>
          
          </Main>
          
         
         
         
        </Context.Provider>
      )
    }
  }






ReactDOM.render(<App />, document.getElementById('root'))
