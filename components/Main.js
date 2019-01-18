import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Context from '../Context.js'

import Row from './row.js'

const MainDiv=styled.div`
margin-right:25%;
margin-left:25%;
background-color:white;
max-height:calc(100vh - 200px);
min-height:calc(100vh - 200px);
border:solid;
border-width:1px;
border-radius:10px;
border-color:rgba(145,145,145,0.3);
margin-top:25px;

overflow:auto;

`
const ContSearchDiv=styled.div`
margin-right:25%;
margin-left:25%;
background-color:white;
border:none;
border-width:1px;
border-radius:10px;
border-color:rgba(145,145,145,0.3);
margin-top:30px;

overflow:auto;

`

const SearchDiv=styled.div`
width:80%;
margin:auto;
margin-top:15px;
background-color:rgba(205,205,205,0.5);
border-radius:10px;
border:none;
height:50px;
padding-left:5px;
padding-right:5px;
display:flex;
flex-direction:row;
align-items:center;

`
const  IconSearch=styled.img`

width:25px;
height:25px;
opacity:0.3;


`
const SearchBox=styled.input`
width:100%;
height:35px;
border-radius:5px;
border-color:rgba(205,205,205,0.5);
outline:none;
border:none;
margin:auto;
margin-left:5px;
margin-right:10px;
padding-left:10px;
padding-right:5px;
font-size:18px;

`

const ListTitle=styled.p`
font-size:16px;
color: #34A5B8;
margin-left:10%;
`

const ListDiv=styled.div`
width:100%;
height:100%;
padding-top:15px;
padding-bottom:15px;
margin-top:15px;
margin-bottom:25px;

margin:auto;
border:none;


`
const MyButton=styled.button`
border-radius:5px;
width:100px;
height:35px;
border:none;
margin-right:5px;
margin-left:10px;
color:white;
font-size:18px;
background-color:#E8D77F;
`


// for row design
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
font-weight:bold;
&:hover { text-decoration: underline; cursor:pointer; }
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



class Main extends Component{
   
     youtube_parser(url){
        
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    openVideo(url,time)
    {
      
      window.open(url+"&t="+time);

    }

    removeNote(id,ctx)
    {
     
      fetch('https://youtube-research-extension.herokuapp.com/api/entries/'+id, {
        method: 'delete',
        headers: {'Content-Type':'application/json','Authorization':ctx.state.userData.token},
        
      }).then(function(response) {
       
        return response.json();
      }).then(function(data) {
       
       if(data.hasOwnProperty('message'))
       {
         if(data.message=="deleted_successfully")
         {
          toaster.success(
            'Note deleted successfully'
          )
         

         }
         if(data.message=="deleted_error")
         {
          toaster.danger(
            'Failed deleted'
          )
           return;
         }
         
        
       }
      
    
       var filtered = ctx.state.list.filter(function(value, index, arr){

        return value._id!=id;
    
    });
  
    ctx.actions.remove(filtered);

    
      });
    }
    render()
    {
        return(
            <Context.Consumer>
              {
                (ctx) => {
                    
                  return (
                      <div>
                          <ContSearchDiv>
                          <SearchDiv>
                    <IconSearch src={require('../assets/searchicon.png')}>

                    </IconSearch>
                    <SearchBox placeholder="Search by title, notes" value={ctx.state.searchValue} onChange={(event)=>{
                        ctx.actions.updateSearchValue(event.target.value);
                    }}></SearchBox>
                    <MyButton onClick={ctx.actions.clearSearch}>Clear</MyButton>
                   </SearchDiv>
                   <ListTitle>All Your Notes ({ctx.state.list.length})</ListTitle>
                          </ContSearchDiv>
                    
                    <MainDiv>
                    
                       <ListDiv>
                       
                           
              
                         {
   ctx.state.list.map((obj, i)=>{
       
       let videID=this.youtube_parser(obj.url);
                                return (
                             <RowDiv key={i} >
                              <VideImg src={"http://img.youtube.com/vi/"+videID+"/default.jpg"}></VideImg>
                              <RightDiv>
                                <DivTitleRemove>
                                  <PTitle onClick={()=> this.openVideo(obj.url,obj.time)}>{obj.title}</PTitle>
                                  <RemoveIcon onClick={()=> this.removeNote(obj._id,ctx)} src={require('../assets/cross.png')}></RemoveIcon>
                                </DivTitleRemove>
                                <NoteTime>
                                  <span>Note saved at : </span>
                                  <SpanTime id="span-time"> {obj.time +" s" } </SpanTime>
                                </NoteTime>
                                <TextAreaNote value={obj.notes}></TextAreaNote>
                              
                              </RightDiv>
      
                          </RowDiv>
                                )
                              
                                })
                         }
                            
                        
                      
                       

                       </ListDiv>
                    </MainDiv>
                      </div>
                    
                  )
              }
            }
              
            </Context.Consumer>
          )
    }
}
export default Main;