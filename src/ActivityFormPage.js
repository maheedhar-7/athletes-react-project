import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
// import "./ActivityFormPage.css"

const ActivityForm = () => {
  const [activityDetails, setActivityDetails] = useState([{}]);

  const params = useParams();

  console.log(params);

  function onActivityModeChange(event) {
    const updactivity = { ...activityDetails };
    updactivity.activity = event.target.value;
    setActivityDetails(updactivity);
  }

  function onStartDateChange(event) {
    const updactivity = { ...activityDetails };
    updactivity.startDate = event.target.value;
    setActivityDetails(updactivity);
  }

  function onStartTimeChange(event) {
    const updactivity = { ...activityDetails };
    updactivity.startTime = event.target.value;
    setActivityDetails(updactivity);
  }

  function onEndDateChange(event) {
    const updactivity = { ...activityDetails };
    updactivity.endDate = event.target.value;
    setActivityDetails(updactivity);
  }

  function onEndTimeChange(event) {
    const updactivity = { ...activityDetails };
    updactivity.endTime = event.target.value;
    setActivityDetails(updactivity);
  }

  function onPaceChange(event) {
    const updactivity = { ...activityDetails };
    updactivity.pace = event.target.value;
    setActivityDetails(updactivity);
  }

  const twoCalls = (event) => {
    onActivityModeChange(event);
    // onActivityChange();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(activityDetails);
    // console.log(typeof athlete.activity[0].startDate);

    const onSave = () => {
      fetch(
        "http://localhost:8080/athleteapp/saveactivity?&activity=" +
          activityDetails.activity +
          "&start-date=" +
          activityDetails.startDate +
          "&start-time=" +
          activityDetails.startTime +
          "&end-date=" +
          activityDetails.endDate +
          "&end-time=" +
          activityDetails.endTime +
          "&pace=" +
          activityDetails.pace +
          "&athlete_Id=" +
          params.athleteId,
        {
          method: "POST",
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

    onSave(activityDetails);
    // console.log(activityDetails);
    setActivityDetails({
      activity: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      pace: "",
    });
  };

  return (
    <div class="container pt-3 w-25">
      <form onSubmit={submitHandler}>
        <div class="mb-4">
          <label htmlFor="activity" class="form-label">
            Choose activity:
          </label>
          <select
            name="activity"
            id="activity"
            class="form-select"
            aria-label="Default select example"
            onChange={twoCalls}
            value={activityDetails.task}
          >
            <option>-- select an option --</option>
            <option value="Ride">Ride</option>
            <option value="Run">Run</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="start-date" class="form-label">
            Start date:
          </label>
          <input
            type="date"
            id="start-date"
            name="start-date"
            min="2021-01-01"
            max="2021-12-31"
            class="form-control"
            onChange={onStartDateChange}
            value={activityDetails.startDate}
          ></input>
        </div>

        <div class="mb-4">
          <label class="form-label" for="start-time">
            Starting time of activity:
          </label>
          <input
            type="time"
            id="start-time"
            name="start-time"
            min="01:00"
            max="24:59"
            class="form-control"
            onChange={onStartTimeChange}
            value={activityDetails.startTime}
          ></input>
        </div>

        <div class="mb-4">
          <label for="end-date" class="form-label">
            End date:
          </label>
          <input
            type="date"
            id="end-date"
            name="end-date"
            min="2021-01-01"
            max="2021-12-31"
            class="form-control"
            onChange={onEndDateChange}
            value={activityDetails.endDate}
          ></input>
        </div>

        <div class="mb-4">
          <label class="form-label" for="end-time">
            Ending time of activity:
          </label>
          <input
            type="time"
            id="end-time"
            name="end-time"
            min="01:00"
            max="24:59"
            class="form-control"
            onChange={onEndTimeChange}
            value={activityDetails.endTime}
          ></input>
        </div>

        <div class="mb-4">
          <label for="pace" class="form-label">
            Enter the Pace:
          </label>
          <input
            type="text"
            id="pace"
            name="pace"
            class="form-control"
            onChange={onPaceChange}
            value={activityDetails.pace}
          ></input>
        </div>

        <div class="row mb-4">
          <div class="col">
            <button type="submit" class="btn btn-primary btn-block mb-4">
              Add Athlete
            </button>
          </div>
          <div class="col">
            <Link to={"/activitydetails/" + params.athleteId}>
              <button
                type="submit"
                class="btn btn-primary btn-block mb-4 bg-danger float-end"
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
