import React, { useContext, useEffect, useState } from "react";
import { expenseTracker } from "../ContextAPI/AuthContext";

const Profile = () => {
  const { profile, dashboard, cardvalue } = useContext(expenseTracker);

  const [showImgModal, setShowImgModal] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    dashboard();
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setShowImgModal(false);
    // Optionally, upload file or preview it
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Password change logic here
    setShowPwdModal(false);
  };

  return (
    <div className="container mt-4 ">
      <h2 className="text-capitalize fs-1">{profile.role}</h2>
      <hr />
      <div className="row ">
        {/* Left Column */}
        <div className="col-md-4 p-4 text-center border bounded border-2">
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : "https://bootdey.com/img/Content/avatar/avatar7.png"
            }
            alt="User Avatar"
            className="rounded-circle mb-3 border border-4 pt-1 rounder border-primary"
            width="150"
          />
          <h4>{profile.name}</h4>
          <p className="text-muted">{profile.role}</p>
          <ul className="list-unstyled text-start">
            <li
              className="d-flex align-items-center gap-2 py-2"
              style={{ cursor: "pointer" }}
              onClick={() => setShowImgModal(true)}
            >
              <i className="fas fa-camera fs-5 text-primary"></i>
              <span className="small fw-semibold">Edit Profile Image</span>
            </li>
            <li
              className="d-flex align-items-center gap-2 py-2"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPwdModal(true)}
            >
              <i className="fas fa-lock fs-5 text-danger"></i>
              <span className="small fw-semibold">Change Password</span>
            </li>
          </ul>

          <hr />
        </div>

        {/* Right Column */}
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title mb-3">Profile Details</h5>
                <button className="btn btn-success">Edit</button>
              </div>
              <p>
                <strong>Full Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <div className="row g-3 border-top mt-4">
                <div className="col-md-4">
                  <strong>Balance:</strong>{" "}
                  <span className="text-primary">{cardvalue.balance}</span>
                </div>
                <div className="col-md-4">
                  <strong>Income:</strong>{" "}
                  <span className="text-success">{cardvalue.income}</span>
                </div>
                <div className="col-md-4">
                  <strong>Expense:</strong>{" "}
                  <span className="text-danger">{cardvalue.expense}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Image Modal */}
      {showImgModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ background: "#00000088" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile Image</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowImgModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPwdModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ background: "#00000088" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handlePasswordChange}>
                <div className="modal-header">
                  <h5 className="modal-title">Change Password</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowPwdModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Current Password</label>
                    <input type="password" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label>New Password</label>
                    <input type="password" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label>Confirm New Password</label>
                    <input type="password" className="form-control" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
