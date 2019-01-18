import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Context from '../Context.js';



const Img=styled.img`

`

const styles = {
  root: {
    flexGrow: 1,
  },
};

const DivHeader=styled.div`
display:flex;
flex-direction:row;
align-items:center;
justify-content:between;
`

const H4Dash=styled.h4`
margin-left:10px;
`

const AccountDiv=styled.div`
position:absolute;
right:5px;
display:flex;
flex-direction:row;
align-items:center;

`

const FullNamePar=styled.p`
margin-right:10px;
`
const MyButton=styled.button`
border-radius:5px;
width:100px;
height:35px;
border:none;
margin-right:5px;
margin-left:10px;
color: #FFF;
font-size:18px;
background-color:#FF6767;
`



class SimpleAppBar extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {
       
          (ctx) => {
           
            return (
              <AppBar id="appBar" position="static" color="default">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                 <DivHeader>
                 <Img src={require('../assets/logo.png')} alt=""/>
                 <H4Dash>Dashboard</H4Dash>
                 <AccountDiv>
                  <FullNamePar>Fadi Ramzi Mohammed</FullNamePar>
                  <MyButton onClick={ctx.actions.signOut}>Sign out</MyButton>
                 </AccountDiv>
                 </DivHeader>
                </Typography>
              </Toolbar>
            </AppBar>
            )
        }
        }
        
      </Context.Consumer>
    )
  }
}
/*function SimpleAppBar(props) {
  //const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}*/
/*
SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
*/
export default withStyles(styles)(SimpleAppBar);