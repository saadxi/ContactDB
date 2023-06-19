// import "../Components/App.css";
import { useForm } from "react-hook-form";
import "./App.css";
import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";

function App() {
  const [numUpdates, setnumUpdates] = useState(0);
  const [contactList, setContactList] = useState([]);

  const { user, isLoading } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      company: "",
      phone: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getContacts() {
      const response = await fetch(`http://localhost:4000/contact`);
      if (!response.ok) {
        window.alert(`ERROR: ${response.statusText}`);
        return;
      }

      const contacts = await response.json();
      setContactList(contacts);
      // console.log(contactList);
    }
    getContacts();

    return;
  }, [numUpdates, contactList.length]);

  const onSubmit = async (data) => {
    await fetch("http://localhost:4000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .catch((err) => {
        window.alert(err);
        return;
      })
      .then(() => {
        reset();
        setnumUpdates(numUpdates + 1);
        return;
      });
  };

  function showList() {
    return contactList.map((contact) => {
      return (
        <tr>
          <td> {contact.firstname} </td>
          <td> {contact.lastname} </td>
          <td> {contact.email} </td>
          <td> {contact.company} </td>
          <td> {contact.phone} </td>
        </tr>
      );
    });
  }
  console.log("XXX");

  console.log(numUpdates);

  return (
    <div className="App">
      {/* Adding Bootstrap CDN */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossorigin="anonymous"
      ></link>

      <nav className="navbar navbar-light">
        <h2 className=" display-4 center" href="/">
          SECRET DATABASE
        </h2>
        {user ? (
          <button
            className="btn btn-outline-fail"
            onClick={() => {
              signOut(getAuth());
            }}
          >
            Log Out
          </button>
        ) : (
          <></>
        )}
      </nav>

      <div className="container">
        <div className="row">
          <form className="col p-3 left" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="firstname"> First Name </label>
              <input {...register("firstname", { required: true })} />
            </div>
            <div>
              <label htmlFor="lastname"> Last Name </label>
              <input {...register("lastname", { required: true })} />
            </div>
            <div>
              <label htmlFor="email"> Email </label>
              <input {...register("email")} />
            </div>
            <div>
              <label htmlFor="company"> Company </label>
              <input {...register("company")} />
            </div>
            <div>
              <label htmlFor="phone"> Phone Number </label>
              <input {...register("phone")} />
            </div>
            {errors.exampleRequired && <span>This field is required</span>}
            {/* ENSURE THAT USER IS LOGGED IN TO SUBMIT FORM */}
            {console.log(user)}
            {user ? (
              <input type="submit" />
            ) : (
              <button
                className="logInB"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in to Add Data
              </button>
            )}
          </form>

          <div className="col p-3 right">
            <h4 className="center"> DATA TABLE </h4>
            {user ? (
              <table className="table table-striped p-2">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Phone #</th>
                  </tr>
                </thead>
                <tbody>{showList()}</tbody>
              </table>
            ) : (
              <>
                <p className="center font-weight-bold">
                  DATA PROTECTED --- MUST LOGIN BELLOW
                </p>
                <button
                  className="logInB"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Log in to See Data
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
