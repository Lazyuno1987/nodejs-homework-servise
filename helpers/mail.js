const sgMail = require('@sendgrid/mail')
require("dotenv").config()
 
const { HW_GOIT } = process.env;

sgMail.setApiKey(HW_GOIT);

const sendEmail = async (data) => {
    const email = {...data, from:"lazyuno1987@gmail.com"}
    try {
        await sgMail.send(email) 
       return true  
    } catch (error) {
        throw error.message
    }
}



module.exports = sendEmail;


