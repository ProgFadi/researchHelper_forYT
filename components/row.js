import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Context from '../Context.js'


const RowDiv=styled.div`
width:80%;
margin-left:10%;
margin-right:10%;
height:195px;

padding:5px;
margin:10px auto;
display:flex;
flex-direction:row;
border:1px solid #707070;
border-radius:5px;
box-shadow:0px 1px 1px #000000;
`

const VideImg=styled.img`
width:195px;
height:100%;

`

const RightDiv=styled.div`
flex-grow:1;
margin-left:10px;
margin-right:10px;

display:flex;
flex-direction:column;

`

const DivTitleRemove=styled.div`
width:100%;
margin:auto;
position:relative;
height:auto;

`

const PTitle=styled.p`
margin:3px;
margin-right:15px;
font-size:16px;
`
const RemoveIcon=styled.img`
position:absolute;
right:5px;
top:5px;
width:10px;
height:10px;
cursor:pointer;
`


const NoteTime=styled.div`
width:auto;
height:auto;
display:flex;
flex-direction:row;
justify-items:center;
align-items:center;
margin-left:5px;
margin-right:5px;
margin-top:15px;
margin-bottom:5px;
`
const SpanTime=styled.span`
color: #C1AA3D;
font-weight:bold;

`

const TextAreaNote=styled.textarea`
flex-grow:1;
resize:none;
margin:5px;
border:solid;
border-radius:5px;
border-width:1px;
border-color:#707070;
`


class Row extends Component{
    render()
    {
        return(
            <Context.Consumer>
              {
                (ctx) => {
                  return (
                  
                    <RowDiv>
                        <VideImg></VideImg>
                        <RightDiv>
                          <DivTitleRemove>
                            <PTitle>Title ("Broken Hearts" (Extended Orchestral Version) by Michael Ortega) {this.props.obj.title}</PTitle>
                            <RemoveIcon src={require('../assets/cross.png')}></RemoveIcon>
                          </DivTitleRemove>
                          <NoteTime>
                            <span>Note saved at : </span>
                            <SpanTime id="span-time"> 05:26 PM </SpanTime>
                          </NoteTime>
                          <TextAreaNote></TextAreaNote>
                        
                        </RightDiv>

                    </RowDiv>
              
                  )
              }
              }
              
            </Context.Consumer>
          )
    }
    
}

export default Row;