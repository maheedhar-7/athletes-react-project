import { Route, Switch } from "react-router-dom";
import ActivityDetails from "./ActivityDetailsPage";
import AthleteForm from "./AthleteFormPage";
import StartPage from "./Pages/StartPage";
import ActivityForm from "./ActivityFormPage";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import LoginPage from "./LoginPage";

function App() {
  return (
    <BrowserRouter>
      <h1>Athlete Manager</h1>
      <Switch>
        {/* <Route path="/" exact>
          <StartPage />
        </Route> */}
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/activitydetails/:athleteId" exact>
          <ActivityDetails />
        </Route>
        <Route path="/athleteform">
          <AthleteForm />
        </Route>
        <Route path="/activityform/:athleteId" exact>
          <ActivityForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
