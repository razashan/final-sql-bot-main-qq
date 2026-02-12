import React, { useEffect, useState } from "react";
import "./bugInsight.scss";
import { Table, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { ClipLoader } from "react-spinners";
function BugInsight() {
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlGetBugs = isProduction
    ? process.env.REACT_APP_API_URL_GET_BUGS_PROD
    : process.env.REACT_APP_API_URL_GET_BUGS;

  const [bugData, setBugData] = useState([]);
  const [selectedBug, setSelectedBug] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrlGetBugs);

        // Convert bugImage to base64 string
        const bugsWithBase64Image = response.data.bugs.map((bug) => {
          const base64String = arrayBufferToBase64(bug?.bugImage?.data);
          return {
            ...bug,
            bugImageString: base64String,
          };
        });

        setBugData(bugsWithBase64Image);
      } catch (error) {
        console.error(error, "Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const openImageInNewTab = (imageString) => {
    const newTab = window.open();
    newTab.document.write(`<img src="data:image/jpeg;base64, ${imageString}" alt="Bug Image"/>`);
  };


  const BugTable = () => {
    const openImageInNewTab = (imageString) => {
      const newTab = window.open();
      newTab.document.write(`<img src="data:image/jpeg;base64, ${imageString}" alt="Bug Image"/>`);
    };
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bug ID</th>
            <th>Submitted by</th>
            <th>Bug Description</th>
            <th>Bug Image</th>
          </tr>
        </thead>
        <tbody>
          {bugData.map((bug) => (
            <tr key={bug.id} onClick={() => setSelectedBug(bug)}>
              <td>{bug.id}</td>
              <td>{bug.name}</td>
              <td>{bug.bugDescription}</td>

              <td>
                {bug?.bugImageString ? (
                  <>
                  

                    <img
                      src={`data:image/jpeg;base64, ${bug.bugImageString}`}
                      alt={`Bug ${bug.id}`}
                      height="100"
                      width="100"
                      style={{ cursor: 'pointer' }}
                       onClick={() => openImageInNewTab(bug?.bugImageString)}/>
                   {/* <a target="_blank" href={`data:image/jpeg;base64, ${bug?.bugImageString}`}>testing</a> */}


                  </>
                ) : (
                  <p>No image</p>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const BugModal = () => {
    return (
      <Modal
        show={selectedBug !== null}
        onHide={() => setSelectedBug(null)}
        className="bugs_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Bug Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="modalBugHeadings">Bug Description</span>
          <p>{selectedBug?.bugDescription}</p>
          {selectedBug?.bugImageString ? (
            <>
              <span className="modalBugHeadings">Bug Image</span>
              <img
                style={{ width: "100%" }}
                src={`data:image/jpeg;base64, ${selectedBug.bugImageString}`}
                alt={`Bug ${selectedBug.id}`}
                onClick={() => openImageInNewTab(selectedBug?.bugImageString)}/>
            
            </>
          ) : (
            <p>No image</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedBug(null)}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    );
  };



  return (
    <div className="containerAdmin">
      <section className="admin-profile">
        <div className="top">
          <div>
            <h2>Bug Reports</h2>
          </div>
        </div>
        <div className="detail">
          {loading&&
           <div style={{ position:'absolute', top:'50%', left:'50%' }}>
           <ClipLoader color="black" size={25} />
         </div>
          }
          {bugData?.length > 0 ? <BugTable /> : <p>No bug data available.</p>}
        </div>
        <BugModal />
      </section>
    </div>
  );
}

export default BugInsight;
