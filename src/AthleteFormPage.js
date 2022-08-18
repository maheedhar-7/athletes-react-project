import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import ActionButtons from "./ActionButtons";
// import "./AthleteFormPage.css";

const AthleteForm = (props) => {
  const [athlete, setAthlete] = useState([{}]);
  // const [activityDetails, setActivityDetails] = useState([
  //   {
  //     // task: "",
  //     // startDate: "",
  //     // startTime: "",
  //     // endDate: "",
  //     // endTime: "",
  //     // pace: ""
  //   },
  // ]
  // );

  useEffect(() => {
    setAthlete(
      { ...props.athlete } || {
        firstName: "",
        lastName: "",
        email: "",
        phonenumber: "",
      }
    );
  }, [props.athlete, setAthlete]);

  function onFirstNameChange(event) {
    const updathlete = { ...athlete };
    updathlete.firstName = event.target.value;
    setAthlete(updathlete);
  }

  function onLastNameChange(event) {
    const updathlete = { ...athlete };
    updathlete.lastName = event.target.value;
    setAthlete(updathlete);
  }

  function onPhoneNumberChange(event) {
    const updathlete = { ...athlete };
    updathlete.phoneNumber = event.target.value;
    setAthlete(updathlete);
  }

  function onEmailChange(event) {
    const updathlete = { ...athlete };
    updathlete.email = event.target.value;
    setAthlete(updathlete);
  }

  const onSave = () => {
    fetch(
      "http://localhost:8080/athleteapp/save?&fname=" +
        athlete.firstName +
        "&lname=" +
        athlete.lastName +
        "&email=" +
        athlete.email +
        "&phonenumber=" +
        athlete.phoneNumber,
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
        alert("record added")
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(athlete);
    // console.log(typeof athlete.activity[0].startDate);

    onSave(athlete);
    // console.log(activityDetails);
    setAthlete({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    });
  };

  return (
    <div class="container w-25 mt-5">
      <form onSubmit={submitHandler}>
        <div class="mb-4">
          <label class="form-label" for="fname">
            First Name
          </label>
          <input
            type="text"
            id="fname"
            class="form-control"
            onChange={onFirstNameChange}
            value={athlete.firstName}
          />
        </div>

        <div class="mb-4">
          <label class="form-label" for="lname">
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            class="form-control"
            onChange={onLastNameChange}
            value={athlete.lastName}
          />
        </div>

        <div class="mb-4">
          <label class="form-label" for="phonenumber">
            Phone Number
          </label>
          <input
            type="text"
            id="phonenumber"
            class="form-control"
            onChange={onPhoneNumberChange}
            value={athlete.phoneNumber}
          />
        </div>

        <div class="mb-4">
          <label class="form-label" for="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            class="form-control"
            onChange={onEmailChange}
            value={athlete.email}
          />
        </div>

      <div class="row">
        <div class="col">
          <button type="submit" class="btn btn-primary btn-block">
            Add Athlete
          </button>
        </div>
        <div class="col">        
          <Link to="/">
            <button type="submit" class="btn btn-danger">
              Main
            </button>
          </Link>
        </div>  
      </div>
      </form>
    </div>
  );
};

export default AthleteForm;
