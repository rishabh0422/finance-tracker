export const calculation = (transaction) => {
    let income=0;
    let expense=0;
    let balance=0;
    transaction.forEach((e)=> {
        if(e.type==="Income"){
            income+=e.amount;
        }
        if(e.type==="Expense"){
            expense+=e.amount
        }
        balance=income-expense;
        
    });
    return {income,expense,balance}

};