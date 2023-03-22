import React from 'react'
import { useSelector } from 'react-redux';

export const EditReportChildContent = () => {
  const ReportsDetailsRedux = useSelector((state) => state.ReportDetails.value);

  return (
    <div className="reviewparents">
    <div className="review">
      <div className="ProjectNumber">
        <section>Project Number</section>
        <input
          type="text"
          placeholder={ReportsDetailsRedux?.project?.project_number || ReportsDetailsRedux?.report?.project_number}
          disabled
        ></input>
      </div>

      <div className="ReviewType">
        <section>Review Type</section>
        
        {ReportsDetailsRedux?.documents && ReportsDetailsRedux?.documents[0]?.type === "certificate" ? <>
        <input type="text" disabled placeholder="Certificate"></input>
        </>:<input type="text" disabled placeholder="Report"></input> }
       
      </div>

      <div className="ReportType">
        <section>Report Type</section>
        {ReportsDetailsRedux?.documents && ReportsDetailsRedux?.documents[0]?.sub_type ===3 ? <>
          <input
          type="text"
          placeholder="Supporting Documents"
          disabled
        ></input>
        </>:""}
        {ReportsDetailsRedux?.documents && ReportsDetailsRedux?.documents[0]?.sub_type ===2 ? <>
          <input
          type="text"
          placeholder="Financial"
          disabled
        ></input>
        </>:""}
        {ReportsDetailsRedux?.documents && ReportsDetailsRedux?.documents[0]?.sub_type ===4 ? <>
          <input
          type="text"
          placeholder="Equipment Log"
          disabled
        ></input>
        </>:""}
        {ReportsDetailsRedux?.documents && ReportsDetailsRedux?.documents[0]?.sub_type ===6 ? <>
          <input
          type="text"
          placeholder="Other"
          disabled
        ></input>
        </>:""}
        {ReportsDetailsRedux?.documents && ReportsDetailsRedux?.documents[0]?.sub_type ===12 ? <>
          <input
          type="text"
          placeholder="Correspondents"
          disabled
        ></input>
        </>:""}
       
    
      </div>

      <div className="RecievingContact">
        <section>Recieving Contact</section>
        <input
          type="text"
          placeholder={
            ReportsDetailsRedux?.report?.receiving_customer 
          }
          disabled
        ></input>
      </div>

      <div className="ResponsiblePerson">
        <section>Responsible Person</section>
        <input
          type="text"
          placeholder={
            ReportsDetailsRedux?.report?.reviewer_id 
          
          
          }
          disabled
        ></input>
      </div>

      <div className="ReviewerDate">
        <section>Reviewer</section>
        <input type="text" disabled placeholder= {
            ReportsDetailsRedux?.report?.reviewer_id 
           
          }></input>
      </div>
    </div>
    <div className="reportsreceivingcontainer">
      <div className="ReportRecieving">
        <section>Report Recieving Customer</section>
        <input
          type="text"
          placeholder={
            ReportsDetailsRedux?.report?.receiving_customer
          }
          disabled
        ></input>
      </div>

      <div className="ReportReview">
        <section>Report Review Status:</section>
        {ReportsDetailsRedux?.report?.status_id === 4 ? <>
        <span className="badge badge-primary m-1">
                              Sent to Reviewer
                              </span></>:""}
        {ReportsDetailsRedux?.report?.status_id === 3 ? <>
        <span className="badge badge-danger m-1">
                              Declined
                              </span></>:""}
      {ReportsDetailsRedux?.report?.status_id === 8 ? <>
        <span className="badge badge-danger m-1">
                              Rejected
                              </span></>:""}
                              {ReportsDetailsRedux?.report?.status_id === 7 ? <>
        <span className="badge badge-success m-1">
                              Approved
                              </span></>:""}
                              {ReportsDetailsRedux?.report?.status_id === 1 ? <>
        <span className="badge badge-warning m-1">
                              Hold
                              </span></>:""}
      </div>

      <div className="ProductsCovered">
        <section>Products Covered</section>
        <input
          type="text"
          placeholder={ReportsDetailsRedux?.report?.products_covered || ReportsDetailsRedux?.project?.product_covered}
          disabled
        ></input>
      </div>

      <div className="Models">
        <section>Models</section>
        <input
          type="text"
          placeholder={ReportsDetailsRedux?.report?.models || ReportsDetailsRedux?.project?.modals}
          disabled
        ></input>
      </div>

      <div className="Project">
        <section>Project</section>
        <input
          type="text"
          placeholder={ReportsDetailsRedux?.report?.['project_number_fk.project_name']}
          disabled
        ></input>
      </div>

      <div className="Comments">
        <section>Comments:</section>
        <input
          type="text"
          placeholder={ReportsDetailsRedux?.report?.report_comments ||  ReportsDetailsRedux?.report?.comments}
          disabled
        ></input>
      </div>
    </div>

    <div className="Reportsstandards">
      <section>Report Standards</section>
    </div>
  </div>
  )
}
