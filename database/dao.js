
const projectInfo = require('../models/ProjectInfo')
const Response = require('../service/customResponse')

function validateRequest(data){

    let error = []
    
    if(!data.project_name || data.project_name === ''){
         error.push("Project Name")
    }

    if(!data.project_number || data.project_number === ''){
        error.push("Project Number")
    }

    if(!data.customer_name || data.customer_name === ''){
        error.push("Customer Name")
    }

    if(!data.start_date || data.start_date === ''){
        error.push("Start Date")
    }

    if(!data.end_date || data.end_date === ''){
        error.push("End Date")
    }

    if(!data.project_completion_date || data.project_completion_date === ''){
        error.push("Project Completion Date")
    }

    if(!data.reviewer || data.reviewer === ''){
        error.push("Reviewer")
    }

    if(!data.quote_number || data.quote_number === ''){
        error.push("Quote Number")
    }

    if(!data.po_number || data.po_number === ''){
        error.push("PO Number")
    }
    return error
}




async function saveProjectInfo(data){

let error = validateRequest(data)

if(error.length>0){
    return new Response(400,"FAILURE","Required : " + error.join(" , "))
}

try{
    const result =  await projectInfo.create({
        project_name : data.project_name,
        project_description : data.project_description,
        project_number : parseInt(data.project_number),
        products_covered : data.products_covered,
        models:data.models,
        assigned_to:data.assigned_to,
        customer_name:data.customer_name,
        client_recipient:data.client_recipient,
        start_date:new Date(data.start_date),
        end_date:new Date(data.end_date),
        project_completion_date:new Date(data.project_completion_date),
        reviewer:data.reviewer,
        business_unit:data.business_unit,
        quote_number:data.quote_number,
        po_number:data.po_number
    })
    
 return new Response(200,"SUCCESS",`Project created with id ${result.id}.`)

}catch(error){
    console.log(error)
    return new Response(500,"FAILURE",`Error is ${error.message}`)
}


}


async function getAllProjects(){
  
    try{
        const result = await projectInfo.findAll({raw:true})
        console.log("Data Captured")
        return result
    }catch(error){
        console.log(error)
        throw error
    }

}


module.exports = {saveProjectInfo,getAllProjects}

