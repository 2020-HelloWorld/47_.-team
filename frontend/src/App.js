


import React from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import "./App.css";
import Events from './Events';
import EventDetails from './EventDetails';
import Project from './Project';
import Home from './Home';
import ClubList from './ClubList';
import ClubEventList from './ClubEventList';
import AddEvent from './AddEvent';
import Load from './Load';
import Participants from './Participants';
import OrgCommittee from './OrgCommittee';
import Student from './Student';
import StudentDetails from './StudentDetails';
import FormDetails from './FormDetails';




const App = () => {

  const [showContent, setShowContent] = React.useState(false);
  
  const history = useHistory();


  

  return (
    
    <div>
 
    <div className="for-div2">
      <h1 className='for-h1' style={{ textAlign: 'center'}}>Welcome to Ed-cred</h1>
   
    <Router>
      <Switch>
        <Route exact path="/" component={Load} />

        <Route path="/Login" component={Login} />

        <Route path="/Home" component={Home} />
        
        <Route path="/Profile" component={Profile} />

        <Route path="/Events" component={Events} />

        <Route path="/EventDetails" component = {EventDetails} />

        <Route path="/Project" component = {Project} />

        <Route path="/ClubList" component = {ClubList} />

        <Route path="/ClubEventList" component = {ClubEventList} />

        <Route path="/AddEvent" component = {AddEvent} />

        <Route path="/Participants" component = {Participants}/>

        <Route path = "/OrgCommittee" component = {OrgCommittee}/>

        <Route path = "/Student" component = {Student}/>

        <Route path = "/StudentDetails" component= {StudentDetails}/>

        <Route path = "/FormDetails" component = {FormDetails}/>



      </Switch>
      
    </Router>    
    
    
    </div>


<div className="rotating-container">
      <img className="rotating-image" src=".\peslogo.jpeg" alt="Rotating Image" />
    </div>

    
    </div>
  );
};

export default App;
