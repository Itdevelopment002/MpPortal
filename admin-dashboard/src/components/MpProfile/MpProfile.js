import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api, { baseURL } from "../api";

const MpProfile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [mpProfile, setMpProfile] = useState([]);
  const [editData, setEditData] = useState({
    name: "",
    designation: "",
    info: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const lightbox = GLightbox({ selector: ".glightbox" });
    return () => {
      lightbox.destroy();
    };
  }, [mpProfile]);

  const fetchMpProfile = () => {
    api
      .get("/mp-profile")
      .then((response) => setMpProfile(response.data))
      .catch((error) => {
        console.error("Error fetching mp profile!", error);
        toast.error("Failed to load mp profile.");
      });
  };

  useEffect(() => {
    fetchMpProfile();
  }, []);

  const handleEditModalOpen = (mpprofile) => {
    setEditData(mpprofile);
    setImagePreview(`${baseURL}${mpprofile.image_path}`);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("designation", editData.designation);
    formData.append("info", editData.info);
    if (editData.image) {
      formData.append("image", editData.image);
    }

    try {
      await api.put(`/mp-profile/${editData.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchMpProfile();
      setShowEditModal(false);
      toast.success("Mp Profile updated successfully!");
    } catch (error) {
      console.error("Error updating mp profile!", error);
      toast.error("Failed to update mp profile.");
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditData({ name: "", designation: "", info: "", image: null });
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditData({ ...editData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/home">Home</Link>{" "}
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Mp Profile
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Mp Profile</h4>
                    </div>
                  </div>
                  <div className="table-responsive m-t-10">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width='7%'>Sr. No.</th>
                          <th>Name</th>
                          <th>Designation</th>
                          <th>Description</th>
                          <th width='11%'>Profile Image</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mpProfile.map((profile, index) => (
                          <tr key={profile.id}>
                            <td>{index + 1}</td>
                            <td className="mpprofile-items">{profile.name}</td>
                            <td className="mpprofile-items">{profile.designation}</td>
                            <td className="mpprofile-items">{profile.info}</td>
                            <td>
                              <Link
                                to={`http://localhost:5000${profile.image_path}`}
                                className="glightbox"
                                data-gallery="slider-images"
                              >
                                <img
                                  width="50px"
                                  src={`http://localhost:5000${profile.image_path}`}
                                  alt={`profile-img${profile.image_path}`}
                                />
                              </Link>
                            </td>
                            <td>
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleEditModalOpen(profile)}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showEditModal && (
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Profile</h5>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Designation</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editData.designation}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              designation: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editData.info}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              info: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Image</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleImageChange}
                        />
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="preview"
                            width="100"
                            className="mt-2"
                          />
                        )}
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={handleCloseEditModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={handleEditSubmit}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MpProfile;
