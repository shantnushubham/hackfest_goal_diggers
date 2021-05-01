var bankModel=require('../models/bank')
var helpers=require('../helpers/index')
var transactionModel=require('../models/transaction')
var phonePeBankModel=require('../models/phonepeBank')
var userModel=require('../models/user')
var shortid=require('shortid')
var ledgerModel=require('../models/ledger')
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
    async findPhonePeBalance(uid)
    {
        try {
            let user=await phonePeBankModel.findOne({uid},{amount:1})
            return({success:true,user})
        } catch (error) {
            return({success:false})
        }
    }
    async addTransactionsToLedger(transactions)
    {
        try {
            let txnList=await ledgerModel.insertMany(transactions)
            return({success:true})
        } catch (error) {
            return({success:false})
        }
    }
    async resolveLedger()
    {
        try {
            let ledgerResolve= await ledgerModel.aggregate([
                {$match:{resolved:false}},
                {$group:{
                    _id:{transactionId:"$transactionId"},
                    transactions:{$push:{transactionId:'$transactionId',receiver:'$receiver',amount:'$amount'}}
                }}
            ])  
            let resolved=[]
            ledgerResolve.forEach(el=>{
                if(el.transactions.length==2)
                {
                    resolved.push({transactionId:el.transactions[0].transactionId,
                        receiver:el.transactions[0].receiver,
                        amount:el.transactions[0].amount
                    })

                }
            })
            this.creditMoney(ledgerResolve)

        } catch (error) {
            console.log(error);
        }
    }
    async creditMoney(receiverList){
        try {
            receiverList.forEach(async (el)=>{
                await ledgerModel.updateMany({transactionId:el.transactionId},{resolved:true})
                let getData=await bankModel.findOne({upiId:el.receiver})
                let updateData=await bankModel.findOneAndUpdate({upiId:el.receiver},{amount:getData.amount+el.amount})
            })
            console.log("updated",receiverList);
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports=new bank()
