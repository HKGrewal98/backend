import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from '../components/Login/LoginReducer/LoginSlice'
import DeliverablesReducer from '../components/EngineerReviewerView/AssignedProjects/AssignedProjectsReducer/Deliverables'
import AllProjectsDetails from '../components/EngineerReviewerView/AssignedProjects/AssignedProjectsReducer/AllProjects'
import LoaderSliceReducer from '../components/Common/LoaderReducer/LoaderSlice'
import ProjectNumber from '../components/EngineerReviewerView/AssignedProjects/AssignedProjectsReducer/ProjectNumber'
import ReportDetails from '../components/EngineerReviewerView/AssignedProjects/AssignedProjectsReducer/ReportDetails'


export const store = configureStore({
  reducer: {
    
    Login:LoginReducer,
    Deliverables: DeliverablesReducer,
    AllProjectsDetails: AllProjectsDetails,
    ProjectNumberDetails: ProjectNumber,
    ReportDetails : ReportDetails,
    LoaderSlice: LoaderSliceReducer,
  
  },
})