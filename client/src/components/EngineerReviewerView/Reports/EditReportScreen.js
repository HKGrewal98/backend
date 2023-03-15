import axios from "axios";
import React, {useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useFetcher, useNavigate } from "react-router-dom";
import { LoginDetails } from "../../Login/LoginReducer/LoginSlice";
import "./ViewReportScreen.css";
import Cookies from "universal-cookie";
import { DeliverablesDetails } from "../AssignedProjects/AssignedProjectsReducer/Deliverables";
import BACKEND_URL from "../../../backendUrl";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { LoaderStatus } from "../../Common/LoaderReducer/LoaderSlice";
import { ProjectNumber } from "../AssignedProjects/AssignedProjectsReducer/ProjectNumber";

const EditReportScreen = () => {
  const { register, handleSubmit, control , formState: { errors }} = useForm();
  
  const [showModalApprove, setShowModalApprove] = useState(false)
  const [showModalReject, setShowModalReject] = useState(false)
  const [showModalUpdateDoc, setShowModalUpdateDoc] = useState(false)
  const [showModalDeleteDoc, setShowModalDeleteDoc] = useState(false)
  const [showGreen, setShowGreen] = useState(false);
  const [alertValue, setAlertValue] = useState()


  const ReportsDetailsRedux = useSelector((state) => state.ReportDetails.value);
  const ULogged = useSelector((state) => state.Login.value);
  var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append(
                      "Access-Control-Allow-Origin",
                      "http://localhost:8081"
                    );
                    myHeaders.append("Access-Control-Allow-Credentials", true);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const navigate = useNavigate();

 const onSubmit = (data) => {
    let sub_type
    let sub_type_string = ReportsDetailsRedux?.report?.file_sub_type
    if(sub_type_string === "FINANCIAL"){
      sub_type = 2
    }
    if(sub_type_string === "SUPPORTING DOCUMENTS"){
      sub_type = 3
    }
    if(sub_type_string === "EQUIPMENT LOG"){
      sub_type=4
    }
    if(sub_type_string==="SAMPLES"){
      sub_type=5
    }
    if(sub_type_string==="OTHER"){
      sub_type=6
    }
    if(sub_type_string==="CORRESPONDENTS"){
      sub_type=12
    }
    let formData = new FormData()
    formData.append("file",data.file[0])
    formData.append("doc_id",ReportsDetailsRedux?.report?.file_id)
    formData.append("sub_type", sub_type)
    // console.log("file", data)
       axios({
                       method: 'put',
                       maxBodyLength: Infinity,
                       url: `${BACKEND_URL}/report/upload`,
                       headers:myHeaders,
                       credentials: "include",
                       withCredentials:true,
                         data :formData,

                     })
                     .then(function (response) {
                      //  console.log("Response From update doc",response.data)
                       if(response?.data?.statusCode === 200){
                         setShowModalUpdateDoc(false)
                         dispatch(LoaderStatus(true))
                         axios({
                          method: 'get',
                          maxBodyLength: Infinity,
                          url:`${BACKEND_URL}/report/${ReportsDetailsRedux?.report?.report_number}`,
                          headers:myHeaders,
                          credentials: "include",
                          withCredentials:true,
   
                        }).
                       then(
                          res=>{
                            if(res.data?.statusCode===200){
                              dispatch(LoaderStatus(false))
                              dispatch(ProjectNumber(res.data?.data))
                              setShowGreen(true)
                        setAlertValue("Update Success")
                            }
                          }
                         )  .catch(function (error) {
                          console.log("Error block update report", error);
                          if(error?.response?.status===401){
                            dispatch(LoginDetails({}));
                                cookies.remove('connect.sid');
                                localStorage.setItem("AlertMessage", JSON.stringify("Session Expired...Please Login Again"))
                              navigate('/')
                          }
   
                        });
                       }
                      //  getFinancialsData()

                     })
                     .catch(function (error) {
                       console.log("Error block update report", error);
                       if(error?.response?.status===401){
                         dispatch(LoginDetails({}));
                             cookies.remove('connect.sid');
                             localStorage.setItem("AlertMessage", JSON.stringify("Session Expired...Please Login Again"))
                           navigate('/')
                       }

                     });
  }
  return (
    <>
     {showGreen?<div className="d-flex justify-content-center" style={{position:"sticky",top:"0",zIndex:"9"}}>
      <Alert className="col-12 col-md-8 col-lg-6 p-1 d-flex align-items-center justify-content-between" show={showGreen} variant="success" >
        <p style={{marginBottom:"0"}}>{alertValue}</p>
        <Button style={{fontSize:"80%"}} onClick={() => 
          setShowGreen(false)
          } variant="outline-success">
            Close
            </Button>
      </Alert>
    </div>:""}
       {showModalApprove===true ? <>
      <div id="myCustomModal" class="customModal">
<div class="custom-modal-content">
  <div class="custom-modal-header">
   
    <h4 className='text-center'>Your Project is ready</h4>
  </div>
  <div class="custom-modal-body">
    <div className='customContent d-flex align-items-center'>
   
<div className='ml-2'>Depending on your project type, additional tabs will be displayed that will require you to fill out additional information</div>
</div>
   
  </div>
  <div class="custom-modal-footer d-flex justify-content-end ">
    <button className='btn m-2' style={{backgroundColor:"#60CD8A", color:"white"}} onClick={()=>{
      
      setShowModalApprove(false)}}>Cancel</button>
  </div>
</div>
</div>


    </>:""}
    {showModalReject === true ? <>
      <div id="myCustomModal" class="customModal">
<div class="custom-modal-content" >
  <div class="custom-modal-header"  style={{backgroundColor:"#ff4646"}}>
   
    <h4 className='text-center'>Error</h4>
  </div>
  <div class="custom-modal-body">
    <div className='customContent d-flex align-items-center'  style={{backgroundColor:"#ff4646" , border:"0", color:"white"}}>
  
<div className='ml-2'>Mesage</div>
</div>
   
  </div>
  <div class="custom-modal-footer d-flex justify-content-end ">
    <button className='btn m-2' style={{backgroundColor:"#ff4646", color:"white"}} onClick={()=>{
       
      setShowModalReject(false)}}>Cancel</button>
  </div>
</div>
</div>
    </>:""}
    {showModalUpdateDoc === true ? <>
      <div id="myCustomModal" class="customModal">
<div class="custom-modal-content" >
  <div class="custom-modal-header customDC-color pt-2" >
   
    <h4 className='text-center '>Update Document</h4>
  </div>
  <div class="custom-modal-body">
  <input className=''  type="file" {...register("file",{required: true})} placeholder="Upload"/>
   
  </div>
  <div class="custom-modal-footer d-flex justify-content-end ">
  <button className="btn customDC-color m-2"  onClick={
        handleSubmit(onSubmit)}>
            Update
          </button>
    <button className='btn customDC-color m-2' onClick={()=>{
       
      setShowModalUpdateDoc(false)}}>Close</button>
  </div>
</div>
</div>
    </>:""}
    {showModalDeleteDoc === true ? <>
      <div id="myCustomModal" class="customModal">
<div class="custom-modal-content" >
  <div class="custom-modal-header customDC-color pt-2" >
   
    <h4 className='text-center '>Are you sure you want to delete the document?</h4>
  </div>
  <div class="custom-modal-body">
    {ReportsDetailsRedux?.report?.original_file_name}
   
  </div>
 
  <div class="custom-modal-footer d-flex justify-content-end ">
  <button className="btn customDC-color m-2"  onClick={()=>{
          axios({
                       method: 'put',
                       maxBodyLength: Infinity,
                       url: `${BACKEND_URL}/report/delete`,
                       headers:myHeaders,
                       credentials: "include",
                       withCredentials:true,
                         data : {
                           doc_id:ReportsDetailsRedux?.report?.file_id,
                           report_id: ReportsDetailsRedux?.report?.report_number
                         },

                     })
                     .then(function (response) {
                       console.log("Response From Delete in report screen",response.data)
                       if(response?.data?.statusCode === 200){
                        // alert("Success")
                        setShowModalDeleteDoc(false)
                        dispatch(DeliverablesDetails({}));

                        navigate(-1)
                       }
                      //  getFinancialsData()

                     })
                     .catch(function (error) {
                       console.log("Error block delete teport", error);
                       if(error?.response?.status===401){
                         dispatch(LoginDetails({}));
                             cookies.remove('connect.sid');
                             localStorage.setItem("AlertMessage", JSON.stringify("Session Expired...Please Login Again"))
                           navigate('/')
                       }

                     });
  }}>
            Confirm
          </button>
    <button className='btn customDC-color m-2' onClick={()=>{
       
      setShowModalDeleteDoc(false)}}>Cancel</button>
  </div>
</div>
</div>
    </>:""}
    <div>
      <div className="ReviewReports py-2">
        <NavLink className="leftHBar" to="">
          <svg
            width="25"
            height="23"
            viewBox="0 0 25 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5625 21C1.5625 21.8789 2.24609 22.5625 3.125 22.5625H21.875C22.7051 22.5625 23.4375 21.8789 23.4375 21V6.9375H1.5625V21ZM9.375 10.6484C9.375 10.3555 9.61914 10.0625 9.96094 10.0625H15.0391C15.332 10.0625 15.625 10.3555 15.625 10.6484V11.0391C15.625 11.3809 15.332 11.625 15.0391 11.625H9.96094C9.61914 11.625 9.375 11.3809 9.375 11.0391V10.6484ZM23.4375 0.6875H1.5625C0.683594 0.6875 0 1.41992 0 2.25V4.59375C0 5.0332 0.341797 5.375 0.78125 5.375H24.2188C24.6094 5.375 25 5.0332 25 4.59375V2.25C25 1.41992 24.2676 0.6875 23.4375 0.6875Z"
              fill="white"
            />
          </svg>

          <div className="textHome mx-2 text-white">Review Reports</div>
        </NavLink>
      </div>

      {ULogged?.is_reviewer === true ? (
        <>
          <div className="colorbox">  
            <p>

            <button type="button" class="btn btn-success mx-1" style={{borderRadius:"23px"}} onClick={()=>setShowModalApprove(true)}>Submit Review 

            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2H2C1.44772 2 1 2.44772 1 3V3.5C1 4.05228 1.44772 4.5 2 4.5H10C10.5523 4.5 11 4.05228 11 3.5V3C11 2.44772 10.5523 2 10 2Z" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 4.5V9C2 9.26522 2.10536 9.51957 2.29289 9.70711C2.48043 9.89464 2.73478 10 3 10H9C9.26522 10 9.51957 9.89464 9.70711 9.70711C9.89464 9.51957 10 9.26522 10 9V4.5" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </button>


            <button type="button" class="btn btn-warning mx-1" style={{borderRadius:"23px"}}>Hold
            
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_94_11606)">
<path d="M9 5.5V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 5V2C7 1.73478 6.89464 1.48043 6.70711 1.29289C6.51957 1.10536 6.26522 1 6 1C5.73478 1 5.48043 1.10536 5.29289 1.29289C5.10536 1.48043 5 1.73478 5 2V3" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 5.25V3C5 2.73478 4.89464 2.48043 4.70711 2.29289C4.51957 2.10536 4.26522 2 4 2C3.73478 2 3.48043 2.10536 3.29289 2.29289C3.10536 2.48043 3 2.73478 3 3V7" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.00005 4C9.00005 3.73478 9.10541 3.48043 9.29294 3.29289C9.48048 3.10536 9.73483 3 10.0001 3C10.2653 3 10.5196 3.10536 10.7072 3.29289C10.8947 3.48043 11.0001 3.73478 11.0001 4V7C11.0001 8.06087 10.5786 9.07828 9.82848 9.82843C9.07833 10.5786 8.06092 11 7.00005 11H6.00005C4.60005 11 3.75005 10.57 3.00505 9.83L1.20505 8.03C1.03302 7.83947 0.940845 7.59008 0.947614 7.33347C0.954382 7.07686 1.05957 6.83267 1.24141 6.65148C1.42325 6.47029 1.6678 6.36596 1.92444 6.3601C2.18107 6.35424 2.43013 6.44729 2.62005 6.62L3.50005 7.5" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_94_11606">
<rect width="12" height="12" fill="white" />
</clipPath>
</defs>
</svg>



            </button>

            <button type="button" class="btn btn-danger mx-1" style={{borderRadius:"23px"}} onClick={()=>setShowModalReject(true)}>Cancel
            
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_94_11613)">
<path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.46484 2.46509L9.53484 9.53509" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_94_11613">
<rect width="12" height="12" fill="white"/>
</clipPath>
</defs>
</svg>

            
            </button>






           
            </p>
          </div>
        </>
      ) : (
        ""
      )}

      {ReportsDetailsRedux?.report ? (
        <>
          <div className="reviewparents">
            <div className="review">
              <div className="ProjectNumber">
                <section>Project Number</section>
                <input
                  type="text"
                  placeholder={ReportsDetailsRedux?.project?.project_number}
                 disabled
                ></input>
              </div>

              <div className="ReviewType">
                <section>Review Type</section>
                <input type="text"
                  disabled
                ></input>
              </div>

              <div className="ReportType">
                <section>Report Type</section>
                <input
                  type="text"
                  placeholder={ReportsDetailsRedux?.report?.file_sub_type}
                  disabled
                ></input>
              </div>

              <div className="RecievingContact">
                <section>Recieving Contact</section>
                <input
                  type="text"
                  placeholder={ReportsDetailsRedux?.project?.receiving_customer}
                  disabled
                ></input>
              </div>

              <div className="ResponsiblePerson">
                <section>Responsible Person /Date Created</section>
                <input
                  type="text"
                  placeholder={
                    ReportsDetailsRedux?.report?.reviewer_id +
                    "/" +
                    ReportsDetailsRedux?.report?.report_created_at?.slice(0, 10)
                  }
                  disabled
                ></input>
              </div>

              <div className="ReviewerDate">
                <section>Reviewer /Review Date</section>
                <input type="text" disabled></input>
              </div>
            </div>
            <div className="reportsreceivingcontainer">
              <div className="ReportRecieving">
                <section>Report Recieving Customer</section>
                <input
                  type="text"
                  placeholder={ReportsDetailsRedux?.report?.receiving_customer}
                  disabled
                ></input>
              </div>

              <div className="ReportReview">
                <section>Report Review Status:</section>
                <input
                  type="text"
                  placeholder={ReportsDetailsRedux?.report?.report_status}
                  disabled
                ></input>
              </div>

              <div className="ProductsCovered">
                <section>Products Covered</section>
                <input
                  type="text"
                  placeholder={ReportsDetailsRedux?.project?.product_covered}
                  disabled
                ></input>
              </div>

              <div className="Models">
                <section>Models</section>
                <input
                  type="text"
                  placeholder={ReportsDetailsRedux?.project?.modals}
                  disabled
                ></input>
              </div>

              <div className="Project">
                <section>Project</section>
                <input
                  type="text"
                  placeholder={ReportsDetailsRedux?.project?.project_name}
                  disabled
                ></input>
              </div>

              <div className="Comments">
                <section>Comments:</section>
                <input
                  type="text"
                  placeholder={ReportsDetailsRedux?.report?.report_comments}
                  disabled
                ></input>
              </div>
            </div>

            <div className="Reportsstandards">
              <section>Report Standards</section>
            </div>
          </div>
          <div className="DocumentsParents">
            <h4>
              <b>DOCUMENTS</b>
            </h4>
            {ULogged?.is_reviewer === true ? (
              <>
                <button type="button" className="btn btn-dark">
                  ADD REVIEW DOCUMENTS
                </button>
              </>
            ) : (
              ""
            )}
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Report</th>
                <th scope="col">Model</th>
                <th scope="col">Validation Status</th>
                <th scope="col">Review Status</th>
                <th scope="col"></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th scope="row">
                  {ReportsDetailsRedux?.report?.report_number}
                </th>
                <td>{ReportsDetailsRedux?.project?.modals}</td>
                {ReportsDetailsRedux?.report?.report_status ===
                "SENT TO REVIEWER" ? (
                  <>
                    <td>
                      <span className="badge badge-pill badge-primary">
                        IN PROGRESS
                      </span>
                    </td>
                  </>
                ) : (
                  ""
                )}
                {ReportsDetailsRedux?.report?.report_status ===
                "VALIDATION FAILED" ? (
                  <>
                    <td>
                      <span className="badge badge-pill badge-danger">
                        REJECTED
                      </span>
                    </td>
                  </>
                ) : (
                  ""
                )}
                <td>
                  <span className="badge badge-pill badge-secondary">
                    Pending
                  </span>
                </td>
                <div className="d-flex align-items-center m-2">
              
                {ULogged?.is_engineer === true ? <>
                  <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{cursor:"pointer"}}
                  onClick={()=>setShowModalUpdateDoc(true)}
                >
                  <path
                    d="M21 15.8438V19.8438C21 20.3742 20.7893 20.8829 20.4142 21.258C20.0391 21.633 19.5304 21.8438 19 21.8438H5C4.46957 21.8438 3.96086 21.633 3.58579 21.258C3.21071 20.8829 3 20.3742 3 19.8438V15.8438"
                    stroke="#007D99"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17 8.84375L12 3.84375L7 8.84375"
                    stroke="#007D99"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 3.84375V15.8438"
                    stroke="#007D99"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
            

                <svg
                  className="mx-1"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ cursor: "pointer" }}
                  onClick={() => {setShowModalDeleteDoc(true)}
                  }
                >
                  <path
                    d="M2.5 5H17.5"
                    stroke="#007D99"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.8337 5V16.6667C15.8337 17.5 15.0003 18.3333 14.167 18.3333H5.83366C5.00033 18.3333 4.16699 17.5 4.16699 16.6667V5"
                    stroke="#007D99"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66699 4.99984V3.33317C6.66699 2.49984 7.50033 1.6665 8.33366 1.6665H11.667C12.5003 1.6665 13.3337 2.49984 13.3337 3.33317V4.99984"
                    stroke="#007D99"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.33301 9.1665V14.1665"
                    stroke="#007D99"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.667 9.1665V14.1665"
                    stroke="#007D99"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <svg
                  className="mt-2"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.open(
                      `http://localhost:8081/report/download/${ReportsDetailsRedux?.report?.file_id}`
                    );
                  }}
                >
                  <path
                    d="M19 11V14.3333C19 14.7754 18.7893 15.1993 18.4142 15.5118C18.0391 15.8244 17.5304 16 17 16H3C2.46957 16 1.96086 15.8244 1.58579 15.5118C1.21071 15.1993 1 14.7754 1 14.3333V11"
                    stroke="#007D99"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 6.8335L10 11.0002L15 6.8335"
                    stroke="#007D99"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 11V1"
                    stroke="#007D99"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </>:""}
                {ULogged?.is_reviewer === true ? <>
                 
               <h5>Reviewer icons</h5>
                </>:""}
                
                </div>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        ""
      )}
    </div>
 </> );
};

export default EditReportScreen;
