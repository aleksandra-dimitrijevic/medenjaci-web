import React from "react";
import {  BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LogIn from "./components/LogIn/LogIn";
//import Register from "./components/LogInReg/Register/Register";
import HomeCustomer from './components/Customer/Home/HomeCustomer';
import HomeSeller from './components/Seller/Home/HomeSeller'
import UserInfoSeller from "./components/Seller/UserInfo/UserInfo";
import AddProduct from "./components/Seller/AddProduct/AddProduct";
import UserInfoCustomer from "./components/Customer/Home/UserInfo/UserInfo";
import Register from "./components/Register/Register";


class App extends React.PureComponent {
  state = {
    loggedIn: false,
  }

  componentDidMount() {
    this.checkLogin();
  }

  handleLogIn = () => {
    this.setState({
      loggedIn: true
    })
  }

  handleLogOut = () => {
    this.setState({
      loggedIn: false
    })
  }

  checkLogin = () => {
    if(localStorage.getItem('user')== null ) this.setState({loggedIn: false});
    else this.setState({loggedIn: true});
}

  render(){
    return (
        <Router>
          <Switch>
            {this.state.loggedIn && (
                <>
                  <Route exact path="/homecustomer" render={(props) => <HomeCustomer {...props} onLogOut={this.handleLogOut}/>}/>
                  <Route exact path="/homeseller" render={(props) => <HomeSeller {...props} onLogOut={this.handleLogOut}/>}/>
                  <Route exact path="/userinfo-seller" render={(props) => <UserInfoSeller {...props} onLogOut={this.handleLogOut}/>}/>
                  <Route exact path="/userinfo-customer" render={(props) => <UserInfoCustomer {...props} onLogOut={this.handleLogOut}/>}/>
                  <Route exact path="/add-product" render={(props) => <AddProduct {...props} onLogOut={this.handleLogOut}/>}/>
                </>
            )}

            {!this.state.loggedIn && (
                <>
                  {<Route exact path="/register" render={(props) => <Register {...props} onLogin={this.handleLogIn}/>}/>}
                  <Route   path="/" render={(props) => <LogIn {...props} onLogin={this.handleLogIn}/>}/>
                </>
            )}
          </Switch>
        </Router>
    );
  }
}

export default App;
