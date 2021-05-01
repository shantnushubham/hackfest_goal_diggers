var bankModel=require('../models/bank')
var helpers=require('../helpers/index')
var transactionModel=require('../models/transaction')
var phonePeBankModel=require('../models/phonepeBank')
var userModel=require('../models/user')
var shortid=require('shortid')
class bank{
    constructor(){

    }
    async getBankBalance(uid){
        try {
            var bankData = await bankModel.findOne({ uid: uid }, { amount: 1 })
            return ({success:true,bankData})            
        } catch (error) {
            return({success:false})
        }

    }
    async createTransaction(sender,receiver,data)
    {
        try {
            let transact=await transactionModel.create(data)
            return({success:true,transaction:transact})
        } catch (error) {
            return({success:false})
        }
    }
    async providePCash(uid,amount)
    {
        try {
            let transactionId=shortid.generate()
            let user=await userModel.findOne({uid})
            if(helpers.isEmpty(user))throw{message:'user not found'}
            let bankData=await this.getBankBalance(uid)
            if(helpers.isEmpty(bankData))throw{message:'user not found in home bank'}
            let updatedBankData=await bankModel.findOneAndUpdate({uid},{amount:bankData.bankData.amount-amount})
            let pBank=await phonePeBankModel.findOne({uid})
            console.log(pBank);
            if(helpers.isEmpty(user))throw{message:'user not found in phonepe bank'}
            let updatePBank=await phonePeBankModel.findOneAndUpdate({uid},{amount:pBank.amount+amount})
            let transaction={
                sender:user.upiId,
                receiver:user.upiId,
                amount:amount,
                transactionId,

            }
            let txn=await transactionModel.create(transaction)
            return({success:true,txn})
        } catch (error) {
            console.log(error);
            return({success:false,message:error.message})
        }
    }
}
module.exports=new bank()
