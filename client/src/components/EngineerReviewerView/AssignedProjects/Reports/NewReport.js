import './NewReport.css'
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoaderStatus } from '../../../Common/LoaderReducer/LoaderSlice';
import { useEffect } from 'react';
import { LoginDetails } from '../../../Login/LoginReducer/LoginSlice';
import Cookies from "universal-cookie"
import debounce from 'debounce'


export const NewReport=()=>{

  const list ={
    ASSIGNED: ["Electrical Safety Standards","To help verify the functionality and safety of medical devices, electrical safety standards have been established in the United States, European countries, and other parts of the world.",
    "Medical Device Testing","The standard outlines a process for medical devicemanufacturers to identify hazards, evaluates the risks associated with them, and implement risk controls.",
    "Battery Testing Standards","Standards ensure interoperability and compatibility between the many elements of battery system.",
    "Environmental and Reliability Testing","Electrical Environmental tests, as part of reliability testing, are important for confirmation of tolerances of electronic devices and components to enviromental stress and are most effective means of finding design and manufacturing problems"],
    ADD_LAB_STANDARDS:  ["2Electrical Safety Standards","To help verify the functionality and safety of medical devices, electrical safety standards have been established in the United States, European countries, and other parts of the world.",
    "Medical Device Testing","The standard outlines a process for medical devicemanufacturers to identify hazards, evaluates the risks associated with them, and implement risk controls.",
    "Battery Testing Standards","Standards ensure interoperability and compatibility between the many elements of battery system.",
    "Environmental and Reliability Testing","Electrical Environmental tests, as part of reliability testing, are important for confirmation of tolerances of electronic devices and components to enviromental stress and are most effective means of finding design and manufacturing problems"],
    ADD_GLOBAL_STANDARDS:  ["3Electrical Safety Standards","To help verify the functionality and safety of medical devices, electrical safety standards have been established in the United States, European countries, and other parts of the world.",
    "Medical Device Testing","The standard outlines a process for medical devicemanufacturers to identify hazards, evaluates the risks associated with them, and implement risk controls.",
    "Battery Testing Standards","Standards ensure interoperability and compatibility between the many elements of battery system.",
    "Environmental and Reliability Testing","Electrical Environmental tests, as part of reliability testing, are important for confirmation of tolerances of electronic devices and components to enviromental stress and are most effective means of finding design and manufacturing problems"]
  }

  const [name,setName] = useState("")
  const [data,setdata] = useState(list["ASSIGNED"])
  const [close,setClose] = useState(false)
  const [count,setCount] = useState(0)

  const dataHandler=(name, e)=>{
    console.log(name)
    if(list.hasOwnProperty(name)){
      setName(name)
      setdata(list[name])

    }
  }

  function message(){
    
    if(count>0)
    {
      alert("Standards Submitted successfully!")
    }
    else{
      alert("please select standards!")
    }
  }

  function countHandler(e){
    console.log(count)
    if(e.target.checked){
      setCount((prev)=>prev+1)
      setClose(true)
    }
    else{
      const prev=count
      setCount((prev)=>prev-1)
      if(prev-1===0){
        setClose(false)
      }
      else{
        setClose(true)
      }
    }
  }
  const { register, handleSubmit, control , formState: { errors }} = useForm();
  const[searchResults, setSearchResults] = useState([])
  const[searchResults1, setSearchResults1] = useState([])
  const[searchResults2, setSearchResults2] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showGreen, setShowGreen] = useState(false);
  const [showRed, setShowRed] = useState(false)
  const [alertValue, setAlertValue] = useState()
  const cookies = new Cookies()
  const [optionValue, setOptionValue] = useState(null);
  let options = [
    { label: "FINANCIAL", value: "2" },
    { label: "SUPPORTING DOCUMENTS", value: "3" },
    { label: "EQUIPMENT LOG", value: "4" },
    { label: "SAMPLES", value: "5" },
    { label: "OTHER", value: "6" },
    { label: "CORRESPONDENTS", value: "12" },
   
  ];
  
  const onSubmit = ((data) => {
    let formData = new FormData()
    dispatch(LoaderStatus(true))
    formData.append('issued_at', data.issued_at);
    formData.append('tags', data.tags);
    formData.append('comments', data.comments);
    formData.append('products_covered', data.products_covered);
    formData.append('models', data.models);
    formData.append('receiving_customer', data.receiving_customer);
    formData.append('reviewer_id', data.reviewer_id);
    formData.append('project_number', data.project_number);;
    formData.append('report_type', data.report_type.value);
    formData.append('certificate_type', data.certificate_type.value);
    formData.append('report_name', data.report_name);
    formData.append('is_saved', 'true');
    formData.append("report",data.report[0])
    formData.append('hasReport', 'true');
    formData.append("certificate",data.certificate[0])
    formData.append('hasCertificate', 'true');
    console.log("form data",data, formData)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:8081')
    myHeaders.append('Access-Control-Allow-Credentials', true)
    
    
    axios({

      method: 'post',
      maxBodyLength: Infinity,
      url: '/report',
      
      headers:myHeaders,
        data : formData,
        credentials: "include", 
        withCredentials:true,
     
    }).then(res=>{
      console.log(res)
      dispatch(LoaderStatus(false))
      if(res?.data?.statusCode===200){
        setShowGreen(true)
        setAlertValue(res?.data?.message)
      }
      else{
        setShowRed(true)
        setAlertValue(res?.data?.message)
      }
       
      })
      .catch(error=>{
        console.log("Error block new reports", error);
        if(error?.code==="ERR_NETWORK"){
          dispatch(LoginDetails({}));
              cookies.remove('connect.sid');
              localStorage.setItem("AlertMessage", JSON.stringify("Session Expired...Please Login Again"))
            navigate('/')
        }
      })
    
  });
  useEffect(()=>{
    dispatch(LoaderStatus(false))
  },[])
return(
  <>
  <div className='d-flex justify-content-center' style={{position:"sticky", top:"0"}}>
   {showGreen?<>
      <Alert className="col-12 col-md-8 col-lg-6 p-1 d-flex align-items-center justify-content-between" show={showGreen} variant="success" >
        <p style={{marginBottom:"0"}}>{alertValue}</p>
        <Button style={{fontSize:"80%"}} onClick={() => 
          navigate('/view/assignedProjects')
          } variant="outline-success">
            Close
            </Button>
      </Alert>
    </>:<>
    <Alert className="col-12 col-md-8 col-lg-6 p-1 d-flex align-items-center justify-content-between mx-2" show={showRed} variant="danger" >
        <p style={{marginBottom:"0"}}>{alertValue}</p>
        <Button style={{fontSize:"80%"}} onClick={() => setShowRed(false)} variant="outline-danger">
            Close
            </Button>
      </Alert>
      </>
    
    }
    </div>
  <div className='custom-nrep-container'>

<div className="custom">
<div className='"leftSideNRep'>
<form className='custom_form' style={{
  display: "flex",
  flexDirection: "column"
}}
    >

<div className="mb-3 customColor">
  <label htmlFor="reportNumber" className="form-label"> *Report Name</label>
  <input type="reportNumber" className="form-control custom_txtbox" id="reportNumber" {...register("name",{ required: true})}/>
  {errors.name && <span style={{color:"red"}}>This field is required</span>}
</div>
<div className="mb-3 customColor">
  <label htmlFor="dateIssued" className="form-label"> *Date Issued</label>
  <input type="date" className="form-control custom_txtbox" id="dateIssued" placeholder="MM/YY/XXXX"  {...register("issued_at",{ required: true})} />
  {errors.issued_at && <span style={{color:"red"}}>This field is required</span>}
</div>
<div className="mb-3 customColor">
  <label htmlFor="tags" className="form-label">Tags</label>
  <input type="tags" className="form-control custom_txtbox" id="tags" placeholder="Select Report Tags"{...register("tags")}/>
</div>
<div className="mb-3 customColor">
  <label htmlFor="receivingContacts" className="form-label"> *Receiving Customer</label>
  <div className='parentSearchResult'>
  <input type="receivingContacts" className="form-control custom_txtbox" id="receiving_customer" placeholder="Choose a receiving contact" {...register("receiving_customer",{ required: true})} 
  
  onChange={debounce(async (e) => {
    let str = e.target.value
    console.log("str check", str)
    let data={
      name: str
    }
    axios({
      method: 'get',
      maxBodyLength: Infinity,
        url: '/user/search',
        params : data,
      
        credentials: "include", 
        withCredentials:true,
    })
    .then(function (response) {
      console.log(response.data);
      if(response.data?.data.length>0){

        setSearchResults(response.data?.data)
      }
      else{
        setSearchResults([])
      }
     
    })
    .catch(function (error) {
      console.log("Error block", error);
     
    });
  }, 800)}
  />
   {errors.receiving_customer && <span style={{color:"red"}}>This field is required</span>}
  <div className='searchResultsContainer'>
            {searchResults?.length>0? 
              <div className='searchResults'>
            {searchResults?.length>0? searchResults.map((result)=>{
             
                
                return <div key={result?.id} className='searchItem' onClick={()=>{
                  document.getElementById("receiving_customer").value = result.id;
                  document.getElementById("receiving_customer").focus();
                  setSearchResults([])
                }}>{result?.id}- {result?.name}</div>
                
              
            }):""
          }</div>:""}
          </div>

</div>
</div>
 
<div>
    <label className="custom_label d-flex">Report Standards <div className='reportStandardIcon'  data-bs-toggle="modal" data-bs-target="#exampleModal" >+</div></label>
   
    <br></br>
    <label className="custom_label1">*Click(+) to add some Standards</label>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header custom_title">
        <h6 class="modal-title fs-5 custom_title" id="exampleModalLabel">Assign Standards to Review</h6>
      </div>

      <div class="modal-body">
      

      {/* ------Navbar */}
      <div class="container">
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
     {
    
     Object.keys(list).map((v)=>{
      return <>
       <li style={{color:`${name===v?"blue":"Black"}`}}   onClick={dataHandler.bind(null,v)} class="navbar-brand report_navbar">{v}</li>
      <svg class ="bi bi-info-circle report_icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
         <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
      </svg>
      
      </>
     })}
      
    </div>
  </nav>
</div>
      <table>
          <tr>
            <th> </th>
            <th> Standard </th>
            <th> Description </th>
            </tr>
            <hr class="report_hr"></hr>
            <tr class="report_td">
            <td><input type="checkbox" id="standard1" name="standard1" onChange={countHandler}></input></td>
              <td> {data[0]}</td>
              <td> {data[1]} </td>
            </tr>
            <hr class="report_hr"></hr>
            <tr class="report_td">
            <td><input type="checkbox" id="standard2" name="standard2" onChange={countHandler}></input></td>
              <td> {data[2]}</td>
              <td> {data[3]} </td>
            </tr>
            <hr class="report_hr"></hr>
            <tr class="report_td">
            <td><input type="checkbox" id="standard3" name="standard3" onChange={countHandler}></input></td>
              <td> {data[4]}</td>
              <td> {data[5]} </td>
            </tr>
            <hr class="report_hr"></hr>
            <tr class="report_td">
            <td><input class ="report_checkbox" type="checkbox" id="standard4" name="standard4" onChange={countHandler}></input></td>
              <td> {data[6]}</td>
              <td> {data[7]} </td>
            </tr>
        
            {/* onClick={()=>alert("Standards added successfully!") */}
    </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary modal_btn" data-bs-dismiss={close?"modal":""} onClick={()=>message()}>ADD STANDARDS TO REVIEW</button>
        <button type="button" class="btn btn-secondary modal_btn" data-bs-dismiss="modal">CANCEL</button>
      </div>
    </div>
  </div>
</div>

<div className="mb-3 customColor">
  <label htmlFor="availableReviewers" className="form-label">*Available Reviewers</label>
  <div className='parentSearchResult'>
  <input type="availableReviewers" className="form-control custom_txtbox" id="reviewer_id" {...register("reviewer_id",{ required: true})}
   onChange={debounce(async (e) => {
    let str = e.target.value
    console.log("str check", str)
    let data={
      name: str
    }
    axios({
      method: 'get',
      maxBodyLength: Infinity,
        url: '/user/search',
        params : data,
      
        credentials: "include", 
        withCredentials:true,
    })
    .then(function (response) {
      console.log(response.data);
      if(response.data?.data.length>0){

        setSearchResults1(response.data?.data)
      }
      else{
        setSearchResults1([])
      }
     
    })
    .catch(function (error) {
      console.log("Error block", error);
     
    });
  }, 800)}
  />
   {errors.reviewer_id && <span style={{color:"red"}}>This field is required</span>}
   <div className='searchResultsContainer'>
            {searchResults1?.length>0? 
              <div className='searchResults'>
            {searchResults1?.length>0? searchResults1.map((result)=>{
             
                
                return <div key={result?.id} className='searchItem' onClick={()=>{
                  document.getElementById("reviewer_id").value = result.id;
                  document.getElementById("reviewer_id").focus();
                  setSearchResults1([])
                }}>{result?.id}- {result?.name}</div>
                
              
            }):""
          }</div>:""}
          </div>
          </div>
</div>
<div className="mb-3 customColor">
  <textarea className="form-control custom_txtbox" id="exampleFormControlTextarea1" placeholder="Review Comments" rows="3" {...register("comments")}></textarea>
</div>
</form>
 </div>
 <div className='rightsifeNrep'>
<form className='custom_form'>
<div className="mb-3 customColor">
  <label htmlFor="availableReviewers" className="form-label">*Project Number</label>
  <div className='parentSearchResult'>
  <input type="availableReviewers" className="form-control custom_txtbox" id="projectNumber" {...register("project_number",{ required: true})}
   onChange={debounce(async (e) => {
    let str = e.target.value
    console.log("str check", str)
    let data={
      name: str
    }
    axios({
      method: 'get',
      maxBodyLength: Infinity,
      url: '/project',
        params : data,
      
        credentials: "include", 
        withCredentials:true,
    })
    .then(function (response) {
      console.log(response.data);
      if(response.data?.data.length>0){

        setSearchResults2(response.data?.data)
      }
      else{
        setSearchResults2([])
      }
     
    })
    .catch(function (error) {
      console.log("Error block", error);
     
    });
  }, 800)}
  />
   {errors.project_number && <span style={{color:"red"}}>This field is required</span>}
   <div className='searchResultsContainer'>
            {searchResults2?.length>0? 
              <div className='searchResults'>
            {searchResults2?.length>0? searchResults2.map((result,index)=>{
             
                
                return <div key={index} className='searchItem' onClick={()=>{
                  document.getElementById("projectNumber").value = result.project_number;
                  document.getElementById("projectNumber").focus();
                  setSearchResults2([])
                }}>{result?.project_number}- {result?.project_name}</div>
                
              
            }):""
          }</div>:""}
          </div>
</div>
</div>
<div className="mb-3 customColor">
  <label htmlFor="productsCovered" className="form-label"> *Products Covered</label> 
  <textarea className="form-control custom_txtbox" id="productsCovered" rows="2"  {...register("products_covered",{ required: true})} ></textarea>
  {errors.products_covered && <span style={{color:"red"}}>This field is required</span>}
</div>
<div className="mb-3 customColor">
  <label htmlFor="models" className="form-label">Models</label>
  <textarea className="form-control custom_txtbox" id="models" rows="2" {...register("models")} ></textarea>
</div>


<div className="container">
    
    <label htmlFor="uploadReport" className="upload_label">
      <p className='mb-0'>Report</p>
      <div className='d-flex justify-content-center align-items-center'>
        <p className='m-0 mr-3'>Report Type</p>
      <Controller style={{width:"200px"}}
        name="report_type"
        control={control}
        render={({ field }) => (
        <Select  
            // defaultValue={options[0]}
            {...field}
            isClearable
            isSearchable={false}
            className="react-dropdown"
            classNamePrefix="dropdown"
            options={options}
        />
        )}
    />
    </div>
    <p>{errors.status?.message || errors.status?.label.message}</p>
      <input className='choose_file'  type="file" {...register("report",{required: true})} placeholder="Drag and Drop"/>
        <i className="fas fa-cloud-upload-alt"/>
        <p className="drag_text">Max File Size: 25MB: Max Files: 1/Type: .doc,.docx,.xls,.xlsx,.xlsm,.xlsb</p>
    </label>

</div>
<div className="container">
    
    <label htmlFor="uploadReport" className="upload_label">
    <p className='mb-0'>Certificate</p>
    <div className='d-flex justify-content-center align-items-center'>
        <p className='m-0 mr-3'>Certificate Type</p>
      <Controller  style={{width:"200px !important"}}
        name="certificate_type"
        control={control}
        render={({ field }) => (
        <Select 
            // defaultValue={options[0]}
            {...field}
            isClearable
            isSearchable={false}
            className="react-dropdown"
            classNamePrefix="dropdown"
            options={options}
        />
        )}
    />
    </div>
    <input  type="file" className='choose_file' {...register("certificate",{required: true})} />
    
        <i className="fas fa-cloud-upload-alt"/>
        <p className="drag_text">Max File Size: 25MB: Max Files: 1/Type: .doc,.docx,.xls,.xlsx,.xlsm,.xlsb</p>
    </label>

</div>

<div className='custom3btn'>
<button className="btn btn-primary btn_custom " type="submit">SAVE AS DRAFTS</button>
<button className="btn btn-primary btn_custom1 mx-2" type="submit" onClick={
        handleSubmit(onSubmit)}>SUBMIT REVIEW</button>
<button className="btn btn-primary btn_custom2" onClick={()=>{navigate('/view/assignedProjects')}}>CANCEL</button>
</div>
</form>
</div>
</div>
</div>

 </>   )
}



