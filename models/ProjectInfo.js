const {DataTypes} = require('sequelize');
const db = require('../database/DBConnection')


const projectInfo = db.define('project_info',{
    id: {
        type: DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey: true
    },
    project_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    project_description:{
        type:DataTypes.TEXT('tiny')
    },
    project_number:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    products_covered:{
        type:DataTypes.STRING
    },
    models:{
        type:DataTypes.STRING
    },
    assigned_to:{
        type:DataTypes.STRING
    },
    customer_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    client_recipient:{
        type:DataTypes.TEXT('tiny')
    },
    start_date:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    end_date:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    project_completion_date:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    reviewer:{
        type:DataTypes.STRING,
        allowNull:false
    },
    business_unit:{
        type:DataTypes.TEXT('tiny')
    },
    quote_number:{
        type:DataTypes.STRING,
        allowNull:false  
    },
    po_number:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'project_info',
    timestamps:false
})


module.exports = projectInfo