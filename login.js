import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Context from './Context.js'
import {toaster,Spinner} from 'evergreen-ui'
import LoginHeader from './components/loginHeader'
import LogoWithName from './components/LogoWithName'

const LoginRegDiv=styled.div`
display:flex;
flex-direction:row;
justify-content:center;
margin-left:15%;
margin-right:15%;
margin-top:50px;
padding-top:50px;

`

const DivSpinner=styled.div`
display:flex;
justify-content:center;
align-items:center;

`
class LoginContent extends Component {
  
    goToExtension()
    {
        alert('Go To Extension');
       
    }


    login(e){
        e.preventDefault();
        let email=document.getElementById('email').value;
        let password=document.getElementById('password').value
        if(email=="" || password=="")
        {
          
          toaster.warning(
            'please enter your email and password to sign in',
            
          )
          return;
        }

       // alert(document.getElementById('email').value+document.getElementById('password').value);
       fetch('https://youtube-research-extension.herokuapp.com/api/users/login', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            "email":email,
            "password":password
        })
      }).then(function(response) {
       
        return response.json();
      }).then(function(data) {
       if(data.hasOwnProperty('token'))
       {
        
      
     
        localStorage.setItem('youtube_ext_user_data',JSON.stringify(data));
        var obj =JSON.parse(localStorage.getItem('youtube_ext_user_data'));
       
        window.location = 'index.html';
        

       }
       else 
       {
        
         if(data.message=="login_error")
         {
          toaster.danger(
            'Invalid email or password',
            {
              duration: 10
            }
          )
          // alert('Invalid email or password');
         }
         if(data.message=="validation_error")
         {
          toaster.danger(
            'please enter valid email and password',
            {
              duration: 10
            }
          )
         
         }
         
         return;
       }
     
     
     
     
      });
    }
    
    register(e){
        e.preventDefault();
        let email=document.getElementById('email').value;
        let password=document.getElementById('password').value
      
   
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(re.test(String(email).toLowerCase())==true)
     {
      fetch('https://youtube-research-extension.herokuapp.com/api/users/register', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            "email":email,
            "password":password
        })
      }).then(function(response) {
       
        return response.json();
      }).then(function(data) {
        if(data.hasOwnProperty('token'))
        {
         
          toaster.success(
            'Thanks, resgistration completed'
          )
        }
        if(data.hasOwnProperty('message'))
        {
          if(data.message=="email_already_exists")
          {
            toaster.danger(
              'Email is already exist'
            )
            
          }
         
        }
      
      });
       

     }
     else{
      toaster.danger(
        'please enter a valid email and password'
      )
      
       
     }
       
      
       
    }
  
   
    render(){
      return (

        <Context.Consumer>
              {
                (ctx) => {
                 
                  return (
                  
                    <div>
                   
                    <LoginHeader></LoginHeader>
                 <LogoWithName></LogoWithName>
                
        
        <LoginRegDiv>
                 <div id="div-login">
                <div id="topdiv-login">
                    <h3 id="heading-login">Login</h3>
                </div>
                <div id="div-formContainer">
                    <form  id="form-login">
                    <input id="email" className="input-class" type="email" name="email"  placeholder="Email" minLength="5" required/>
                    <input id="password"  className="form-control input-class" type="password" name="password"  placeholder="Password" minLength="6" required/>
                        <button
                            className="btn btn-primary" type="submit" onClick={this.login} id="btn-login">Sign in</button>
                             <button
                            className="btn btn-primary" type="submit" onClick={this.register} id="btn-reg">Register</button>

                    </form>
                    <DivSpinner> 
                  
                    </DivSpinner>

                    
                    
                   
                   
                </div>
            </div> 
           
        
            
            </LoginRegDiv>
            
                </div>
                  
               
              
                  )
              }
              }
              
            </Context.Consumer>
      
       
      
      )
    }
  }






ReactDOM.render(<LoginContent />, document.getElementById('loginRoot'))
