const {Loans}=require("../../models/models");

const {createLoansScheme}=require("../../utils/validations");

async function createLoan(loan){
    try{
        const validateLoan= await createLoansScheme.validateAsync(loan);
        console.log(validateLoan);
        const newLoan=await Loans.create(validateLoan);
        if(newLoan){
            return newLoan;
        }
        
        
    }
    catch(err){
        throw new Error(err);
    }
}
async function  updateloanById(LoanId,data){
    try{
        const loan=await Loans.findByPk(LoanId);
        if(loan){
            await loan.update(data);
            return "updated successfully";
        }
        return "loan not found";
    }
    catch(err){
        throw new Error(err);
    }
}
async function deleteLoanById(LoanId){
    try{
        const loan=await Loans.findByPk(LoanId);
        if(loan){
            await loan.destroy();
            return "deleted successfully";
        }
        return "loan not found";
    }
    catch(err){
        throw new Error(err);
    }
}
module.exports={
    createLoan,
    updateloanById,
    deleteLoanById,
    
}
    