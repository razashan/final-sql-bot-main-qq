import React from "react";
import "./editprofile.scss";
// import userprofile from "";
function EditProfile({ setOpen }) {
  const saveChanges = () => {
    setOpen(false);
  };
  return (
    <div className="edit-profile">
      <div className="heading">
        <h1>Edit profile</h1>
        <img src="/images/userprofile.svg" alt="..." />
      </div>

      <form>
        <div className="inputs">
          <div className="full-name">
            <div className="half-width">
              <label>First Name</label>
              <input type="text" placeholder="Danielle" />
            </div>

            <div className="half-width">
              <label>last Name</label>
              <input type="text" placeholder="Campbell" />
            </div>
          </div>

          <div className="full-width">
            <label>Email</label>
            <div className="check-inputs">
              <input
                type="email"
                placeholder="daniellebell.business@gmail.com"
              />
              <input type="checkbox" />
            </div>
          </div>

          <div className="full-width">
            <label>Address </label>
            <input type="text" placeholder="33062 Zboncak isle" />
          </div>

          <div className="full-width">
            <label>Contact Number</label>
            <input type="number" placeholder="58077.79" />
          </div>

          <div className="location">
            <div className="half-width">
              <label>City</label>
              <select type="text" placeholder="Bozorgi">
                <option>Mehrab</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>

            <div className="half-width">
              <label>State</label>
              <select type="text" placeholder="Bozorgi">
                <option>Bozorgi</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>

          <div className="full-width">
            <label>Password</label>
            <div className="check-inputs">
              <input
                type="password"
                placeholder="daniellebell.business@gmail.com"
              />
              <input type="checkbox" />
            </div>
          </div>
        </div>
        <div className="buttons">
          {" "}
          <button className="cancel">Cancel</button>
          <button className="save" onClick={saveChanges}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
