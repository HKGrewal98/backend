import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import BACKEND_URL from "../../../backendUrl";
import { LoaderStatus } from "../../Common/LoaderReducer/LoaderSlice";
import { Reports } from "../AssignedProjects/AssignedProjectsReducer/ReportDetails";
import { ReviewerAllReports } from "./ReviewerReducers/ReviewerAllReportsSlice";
import "./ReviewMain.css";

const ReviewMainPage = () => {
  const ULogged = useSelector((state) => state.Login.value);
  const reviewData = useSelector((state) => state.ReviewerData.value);
  const [arrayPageState, setArrayPageState] = useState(1);
  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nextPage = () => {
    let max = Math.ceil(reviewData?.length / 4);
    // console.log("Next page clicked Max", max)
    if (arrayPageState < max) {
      setArrayPageState(arrayPageState + 1);
    }
  };
  const prevPage = () => {
    if (arrayPageState > 1) {
      setArrayPageState(arrayPageState - 1);
    }
  };
  let activeClassName = "underline";
  let passiveClassame = "text-dark";
  useEffect(() => {
    dispatch(LoaderStatus(true));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "http://localhost:8081");
    myHeaders.append("Access-Control-Allow-Credentials", true);
    axios({
      method: "get",
      maxBodyLength: Infinity,
      url: `${BACKEND_URL}/project/notifications`,
      credentials: "include",
      withCredentials: true,
      headers: myHeaders,
    })
      .then((res) => {
        dispatch(LoaderStatus(false));
        //  console.log("response form ReviewMainPage ", res.data)
        if (res?.data?.data?.length > 0) {
          dispatch(ReviewerAllReports(res?.data?.data));
          //  setReviewData(res?.data?.data)
        }
      })
      .catch((err) => {
        console.log("error mynotification box  ", err);
      });
  }, []);
  return (
    <div>
      <div className="containerbox" style={{ padding: "0.5rem" }}>
        <NavLink
          to="pending"
          className={({ isActive }) =>
            isActive ? activeClassName : passiveClassame
          }
          style={{"display": "flex",
            alignItems: "center",
            fontSize:"0.8rem"}}
        >
          PENDING
          <svg
            width="12"
            height="12"
            viewBox="-5 -3 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_73_16003)">
              <path
                d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 5V7.5"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 10H7.50625"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </NavLink>

        <NavLink
          to="pendingWErrors"
          className={({ isActive }) =>
            isActive ? activeClassName : passiveClassame
          }
          style={{"display": "flex",
            alignItems: "center",
            fontSize:"0.8rem"}}
        >
          PENDING W/ERRORS
          <svg
            width="12"
            height="12"
            viewBox="-5 -3 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_73_16003)">
              <path
                d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 5V7.5"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 10H7.50625"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </NavLink>

        <NavLink
          to="declined"
          className={({ isActive }) =>
            isActive ? activeClassName : passiveClassame
          }
          style={{"display": "flex",
            alignItems: "center",
            fontSize:"0.8rem"}}
        >
          Declined
          <svg
            width="12"
            height="12"
            viewBox="-5 -3 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_73_16003)">
              <path
                d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 5V7.5"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 10H7.50625"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </NavLink>

        <NavLink
          to=""
          className={({ isActive }) =>
            isActive ? activeClassName : passiveClassame
          }
          style={{"display": "flex",
            alignItems: "center",
            fontSize:"0.8rem"}}
        >
          SENT TO REVIEWER
          <svg
            width="12"
            height="12"
            viewBox="-5 -3 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_73_16003)">
              <path
                d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 5V7.5"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 10H7.50625"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </NavLink>

        <NavLink
          to="rejectedByCertification"
          className={({ isActive }) =>
            isActive ? activeClassName : passiveClassame
          }
          style={{"display": "flex",
            alignItems: "center",
            fontSize:"0.8rem"}}
        >
          REJECTED BY CERTIFICATION
          <svg
            width="12"
            height="12"
            viewBox="-5 -3 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_73_16003)">
              <path
                d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 5V7.5"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 10H7.50625"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </NavLink>

        <NavLink
          to="approved"
          className={({ isActive }) =>
            isActive ? activeClassName : passiveClassame
          }
          style={{"display": "flex",
            alignItems: "center",
            fontSize:"0.8rem"}}
        >
          APPROVED
          <svg
            width="12"
            height="12"
            viewBox="-5 -3 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_73_16003)">
              <path
                d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 5V7.5"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 10H7.50625"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </NavLink>

        <NavLink
          to="pendingCertification"
          className={({ isActive }) =>
            isActive ? activeClassName : passiveClassame
          }
          style={{"display": "flex",
            alignItems: "center",
            fontSize:"0.8rem"}}
        >
          PENDING CERTIFICATION
          <svg
            width="12"
            height="12"
            viewBox="-5 -3 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_73_16003)">
              <path
                d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 5V7.5"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 10H7.50625"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </NavLink>

        <NavLink
          to="hold"
          className={({ isActive }) =>
            isActive ? activeClassName : passiveClassame
          }
          style={{"display": "flex",
            alignItems: "center",
            fontSize:"0.8rem"}}
        >
          HOLD
          <svg
            width="12"
            height="12"
            viewBox="-5 -3 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_73_16003)">
              <path
                d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 5V7.5"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 10H7.50625"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </NavLink>

        <NavLink
          to="cancelled"
          className={({ isActive }) =>
            isActive ? activeClassName : passiveClassame
          }
          style={{"display": "flex",
            alignItems: "center",
            fontSize:"0.8rem"}}
        >
          CANCELED
          <svg
            width="12"
            height="12"
            viewBox="-5 -3 20 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_73_16003)">
              <path
                d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 5V7.5"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 10H7.50625"
                stroke="black"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </NavLink>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date Created</th>
            <th scope="col">Report</th>
            <th scope="col">Type</th>
            <th scope="col">Project Number</th>
            <th scope="col">Project Name</th>
            <th scope="col">Report Receiving Customer</th>
            <th scope="col">Engineer</th>
            <th scope="col">Reviewer</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {ULogged?.is_reviewer === true && reviewData?.length > 0 ? (
            <>
              {reviewData
                ?.slice((arrayPageState - 1) * 4, arrayPageState * 4)
                ?.map((data) => {
                  return (
                    <tr>
                      <th>{data?.report_created_at}</th>
                      <td>{data?.report_number}</td>
                      <td>{data?.report_name}</td>
                      <td>12345</td>
                      <td>Project 1</td>
                      <td>DC [214117]</td>
                      <td>{data?.report_created_by}</td>
                      <td>DC</td>
                      {data?.report_status === "SENT TO REVIEWER" ? (
                        <>
                          {" "}
                          <td>
                            <span className="badge badge-secondary">
                              Sent to Reviewer
                            </span>
                          </td>
                        </>
                      ) : (
                        "No badge made"
                      )}

                      <td>
                        <span
                          className=" stretched-link"
                          style={{ cursor: "pointer", color: "#007bff" }}
                          onClick={() => {
                            dispatch(Reports({ report: data }));
                            navigate("/view/editReport");
                          }}
                        >
                          View
                        </span>
                        <svg
                          width="15"
                          height="15"
                          viewBox="-2 -3 20 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.25 10.9583V15.9583C15.25 16.4004 15.0744 16.8243 14.7618 17.1368C14.4493 17.4494 14.0254 17.625 13.5833 17.625H4.41667C3.97464 17.625 3.55072 17.4494 3.23816 17.1368C2.92559 16.8243 2.75 16.4004 2.75 15.9583V6.79167C2.75 6.34964 2.92559 5.92572 3.23816 5.61316C3.55072 5.30059 3.97464 5.125 4.41667 5.125H9.41667"
                            stroke="#007D99"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.75 2.625H17.75V7.625"
                            stroke="#007D99"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.58301 11.7917L17.7497 2.625"
                            stroke="#007D99"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </td>
                    </tr>
                  );
                })}
            </>
          ) : (
            ""
          )}

          {/* <tr>
    <th scope="row"></th>
      <td>Report 02</td>
      <td>ELT Certification</td>
      <td>123456</td>
      <td>Project 2</td>
      <td>DC [214117]</td>
      <td>Engineer Name</td>
      <td>DC</td>
      <td><a href="#" className="badge badge-secondary">Sent to Reviewer</a></td>
      <td><a href="#" className="stretched-link">View</a>
        <svg  width="15" height="15" viewBox="-2 -3 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.25 10.9583V15.9583C15.25 16.4004 15.0744 16.8243 14.7618 17.1368C14.4493 17.4494 14.0254 17.625 13.5833 17.625H4.41667C3.97464 17.625 3.55072 17.4494 3.23816 17.1368C2.92559 16.8243 2.75 16.4004 2.75 15.9583V6.79167C2.75 6.34964 2.92559 5.92572 3.23816 5.61316C3.55072 5.30059 3.97464 5.125 4.41667 5.125H9.41667" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.75 2.625H17.75V7.625" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.58301 11.7917L17.7497 2.625" stroke="#007D99" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </td>
    </tr>
    <tr>
    <th scope="row"></th>
      <td>Report 03</td>
      <td>ELT Certification</td>
      <td>1234567</td>
      <td>Project 3</td>
      <td>DC [214117]</td>
      <td>Engineer Name</td>
      <td>DC</td>
      <td><a href="#" className="badge badge-secondary">Sent to Reviewer</a></td>
      <td><a href="#" className="stretched-link">View</a>
        <svg  width="15" height="15" viewBox="-2 -3 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.25 10.9583V15.9583C15.25 16.4004 15.0744 16.8243 14.7618 17.1368C14.4493 17.4494 14.0254 17.625 13.5833 17.625H4.41667C3.97464 17.625 3.55072 17.4494 3.23816 17.1368C2.92559 16.8243 2.75 16.4004 2.75 15.9583V6.79167C2.75 6.34964 2.92559 5.92572 3.23816 5.61316C3.55072 5.30059 3.97464 5.125 4.41667 5.125H9.41667" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.75 2.625H17.75V7.625" stroke="#007D99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.58301 11.7917L17.7497 2.625" stroke="#007D99" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </td>
    </tr> */}
        </tbody>
      </table>
      {reviewData?.length > 4 ? (
        <div className="d-flex justify-content-center">
          <button className="btn customDC-color m-2" onClick={prevPage}>
            Previous Page
          </button>
          <button className="btn customDC-color m-2" onClick={nextPage}>
            Next Page
          </button>
        </div>
      ) : (
        ""
      )}

      {/* <div className='sam'>
    <p>Showing 1 of 6 results</p>
    </div>  


  <div className='sahil'>
 <button type="button" className="btn btn-primary">LOAD MORE</button>
 </div> */}
    </div>
  );
};

export default ReviewMainPage;
