import React from 'react';
import styled from 'styled-components';
import Context from '../Context.js';

const MainDiv = styled.div`
display:flex;
flex-direction:column;
align-items:center;
margin-top:10px;

`
const LogoImg=styled.img`
margin-top:10px;
`
const H1=styled.h1`
margin-top:10px;
`

const MyButton=styled.button`
border-radius:5px;
width:200px;
height:45px;
border:none;
margin-right:5px;
margin-left:10px;
color: #FFF;
font-size:18px;
background-color:#FF6767;
margin-top:10px;

`

class LogoWithName extends React.Component{

    goToExtension()
    {
        alert('Go');
    }
    render()
    {
        return(
            <Context.Consumer>

                {
                    (ctx)=>{
                        return(
                            <MainDiv>
                            <LogoImg src={require('../assets/logo2.png')}></LogoImg>
                            <H1>Research Helper Extension</H1>
                            <MyButton onClick={this.goToExtension}>INSTALL THE EXTENSION</MyButton>
                         </MainDiv>
                        )
                    }
                }
            </Context.Consumer>
       
        
        )
    }
}


export default LogoWithName;