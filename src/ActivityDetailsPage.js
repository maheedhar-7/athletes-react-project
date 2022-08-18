import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Service from "./Service";
import ActionButtons from "./ActionButtons";
import LogoutButton from "./LogoutButton";
// import "./ActivityDetailsPage.css";

const ActivityDetails = () => {
  const [athlete, setAthlete] = useState({});
  const [activities, setActivities] = useState([]);

  const history = useHistory();

  const params = useParams();
  console.log(params);

  useEffect(() => {
    if(params.athleteId === "undefined") {
      history.push("/")
    }
  }, [])


  useEffect(() => {
    if(localStorage.getItem("uuid") === "null") {
      history.push("/")
    } else if(params.athleteId <= 0) {
      history.push("/")
    } 
  }, [])

  useEffect(() => {
    Service.getAthlete(params.athleteId).then((athlete) => {
      console.log("Fetched Athlete", athlete);
      setAthlete(athlete);
    });
  }, []);

  useEffect(() => {
    Service.getActivities(params.athleteId).then((activities) => {
      console.log("Activities", activities);
      setActivities(activities);
    });
  }, []);

  const removeactivity = (id) => {
        const filteredactivities = [];
        for (let i = 0; i < activities.length; i++) {
          if (activities[i].id !== id) {
            // employees[i] = {status: "deleted"};
            filteredactivities.push(activities[i]);
          }
        }
        setActivities(filteredactivities);
        fetch(
          // "http://localhost:8080/AthletesInReact_war_exploded/athlete/deleteactivity?athleteId=" + params.athleteId +
          //   "&id=" + id,
          "http://localhost:8080/api/activities/" + params.athleteId,
          {
            method: "GET",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
  };

  const renderAvtivities = activities.map(function (activity) {
    return (
      <tr>
        <td>{activity.id}</td>
        <td>{activity.activity}</td>
        <td>{activity.startDate}</td>
        <td>{activity.startTime}</td>
        <td>{activity.endDate}</td>
        <td>{activity.endTime}</td>
        <td>{activity.pace}</td>
        <td>
          <ActionButtons>onDelete={removeactivity}</ActionButtons>
        </td>
      </tr>
    );
  });

  const athlete_render_Info = () => {
    console.log("athelete>>>>>", athlete);
    if (!athlete) {
      return <p>Loading...</p>;
    }
    return (
      <div class="container">
        <LogoutButton />
        <div class="row w-100 mt-5">
          <table class="table">
            <thead class="table-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th> E mail</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{athlete.firstName}</td>
                <td>{athlete.lastName}</td>
                <td>{athlete.email}</td>
                <td>{athlete.phonenumber}</td>
              </tr>
            </tbody>
          </table>
          <div class="row">
            <div class="col">
              <Link to={"/activityform/" + params.athleteId}>
                <button type="submit" class="btn btn-primary btn-block">
                  Add Activity
                </button>
              </Link>
            </div>
  
            <div class="col">
              <Link to="/">
                <button
                  type="submit"
                  class="btn btn-primary btn-block mb-4 bg-danger float-end"
                >
                  Main
                </button>
              </Link>
            </div>
          </div>
        </div>

        

        <div>
          <h2 class="text-center">Activities List</h2>
          <table class="table table-hover mt-4 table-bordered table-sm">
            <thead class="table-dark">
              <tr >
                <th>Activity Id</th>
                <th>Activity</th>
                <th>Start Date</th>
                <th>Start Time</th>
                <th>End Date</th>
                <th>End Time</th>
                <th>Pace</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                renderAvtivities
              ) : (
                <div>No Activities </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  console.log("athelete", athlete);
  return <div>{athlete_render_Info()}</div>;
};

export default ActivityDetails;
