import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';
import RunIcon from '@material-ui/icons/DirectionsRun';
import SwimIcon from '@material-ui/icons/Pool';
import BikeIcon from '@material-ui/icons/DirectionsBike';
import WorkoutIcon from '@material-ui/icons/FitnessCenter';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import checkSession from './CheckSession.js'
import { withRouter } from 'react-router'

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      width: '100%',
      marginTop: 20
    },
    inputLabelFocused: {
      color: 'blue',
    },
    inputInkbar: {
      '&:after': {
        backgroundColor: 'blue',
      },
    },
    textFieldRoot: {
      padding: 0,
      'label + &': {
        marginTop: theme.spacing.unit * 3,
      },
    },
    textFieldInput: {
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 12px',
      width: 'calc(100% - 24px)',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    textFieldFormLabel: {
      fontSize: 18,
    }
  });

class Login extends React.Component {
    state = {
        showPassword: false,
        usernameError: false,
        passwordError: false,
        username: '',
        password: ''
      }

      componentWillMount = () => {
        let props = this.props;
        checkSession(function(result){
          if(result){
            props.history.push('/Dashboard');
          }
        })
          
      }

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPasssword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    
    handleLogin = (event) => {
        event.preventDefault();
        var data = this.validation();
    
        if(data == false){
          return;
        }

        fetch('/api/login', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data=>{
            if(data === "Correct"){
                //sessionStorage.setItem('username', data['username']);
                //this.handleLoggedIn();
                alert("Logged In!");
                this.props.handleLogin();
                this.props.history.push('/Dashboard');
              }
              else {
                alert("Incorrect Credentials!");
              }
        })
      }
    
      validation = () => {
        let missingFields = false;
        this.setState({passwordError: false, usernameError: false})
    
        if(this.state.username === ''){
          missingFields = true;
          this.setState({usernameError: true})
        }
    
        if(this.state.password === ''){
          missingFields = true;
          this.setState({passwordError: true})
        }
    
        if(missingFields){
          return false;
        }
    
        var data = {password: this.state.password, username: this.state.username};
    
        return data;
      }

    render() {
        const { classes } = this.props;
        
        return(
            <div style={{textAlign: 'center'}}>
                <Card style={{width: '25%', margin: 'auto'}}>
                    <CardHeader title="Login"/>
                    <form style={{marginLeft: 10, marginBottom: 10, marginRight: 10}}className="form" onSubmit={this.handleLogin}>
                        <FormControl className={classes.formControl} error={this.state.usernameError}>
                            <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}} htmlFor="custom-color-input">
                            User Name
                            </InputLabel>
                            <Input 
                                classes={{inkbar: classes.inputInkbar}} 
                                id="user" 
                                value={this.state.username}
                                onChange={this.handleChange('username')}
                                />
                        </FormControl>

                        <FormControl className={classes.formControl} error={this.state.passwordError}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="loginPassword"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={this.handleClickShowPasssword}
                                    onMouseDown={this.handleMouseDownPassword}
                                    >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <div style={{textAlign: "center"}}>
                                <Button id='login' className={classes.button} type="submit" style={{width: '25%',color: 'white', backgroundColor: '#3f51b5'}}>
                                Login
                                </Button>
                            </div>
                        </FormControl>
                    </form>
                </Card>
            </div>
        )
    }
}
  
const LoginWrapped = withStyles(styles)(Login);
const loginWrappedWithRouter = withRouter(LoginWrapped)
export default loginWrappedWithRouter;