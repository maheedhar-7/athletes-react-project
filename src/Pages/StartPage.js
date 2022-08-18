import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ActionButtons from "../ActionButtons";
import AddButton from "../AddButton";
import Service from "../Service";
// import "./StartPage.css";

const StartPage = () => {
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    Service.getAll().then((athletes) => {
      console.log("Athletes", athletes);
      setAthletes(athletes);
    });
  }, []);

  const id = "ID";
  const firstName = "First Name";
  const lastName = "Last Name";
  const email = "Email";
  const phoneNumber = "Phone Number";
  const actions = "Actions";

  const removeathlete = (id) => {
    const filteredAthletes = [];
    for (let i = 0; i < athletes.length; i++) {
      if (athletes[i].id !== id) {
        // employees[i] = {status: "deleted"};
        filteredAthletes.push(athletes[i]);
      }
    }
    setAthletes(filteredAthletes);

    fetch(
      "http://localhost:8080/AthletesInReact_war_exploded/athlete/delete?id=" +
        id,
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

    alert("the record with id" + id + " is deleted");
  };

  const renderAthleteList = athletes.map(function (athlete) {
    return (
      <tr key={athlete.id}>
        <td>{athlete.id}</td>

        <Link to={"/activitydetails/" + athlete.id} class="text-muted">
          <td>{athlete.firstName}</td>
        </Link>
        <td>{athlete.lastName}</td>
        <td>{athlete.email}</td>
        <td>{athlete.phonenumber}</td>
        <td>
          <ActionButtons
            onDelete={removeathlete}
            // onEdit={props.onEdit}
            id={athlete.id}
          />
        </td>
      </tr>
    );
  });

  return (
    <div class="container">
      <div>
        <AddButton />
      </div>
      <div>
        <table class="table mt-4 table-hover table-bordered table-sm">
          <thead class="table-dark">
            <tr>
              <th>{id}</th>
              <th>{firstName}</th>
              <th>{lastName}</th>
              <th>{email}</th>
              <th>{phoneNumber}</th>
              <th>{actions}</th>
            </tr>
          </thead>
          <tbody>
            {athletes.length > 0 ? renderAthleteList : <div>No Athletes</div>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StartPage;
