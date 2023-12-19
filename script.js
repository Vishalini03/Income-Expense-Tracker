const balance=document.querySelector("#balance");
const description=document.querySelector("#des");
const amount=document.querySelector("#amt");
const incamt=document.querySelector("#inamt");
const expamt=document.querySelector("#expamt");
const trans=document.querySelector("#trans");
const form=document.querySelector(".form");


const localStorageTrans=JSON.parse(localStorage.getItem("trans"));
let transactions=localStorageTrans!==null?localStorageTrans:[];

function loadTransactionDetails(transaction){
   const sign=transaction.amount<0?"-":"+";
   const item=document.createElement("li");
   item.classList.add(transaction.amount<0?"exp":"inc");
   item.innerHTML=`
   ${transaction.description}
   <span>${sign}${Math.abs(transaction.amount)}</span>  
   <button class="del" 
   onclick="removetrans(${transaction.id})">x</button>`;
   trans.appendChild(item);
}
function removetrans(id){
    if(confirm("Are you sure you want to delete Transaction")){
         transactions=transactions.filter((transaction)=>
         transaction.id!=id);
         config();
         updateLocalStorage();
    }
    else{
        return;
    }
}
function updateamt(){
    const amounts=transactions.map((transaction)=>transaction.amount);
    const total=amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);
    balance.innerHTML=`Rs : ${total}`;
    const inm=amounts.filter((item)=>item>0).reduce((acc,item)=>(acc+=item),0);
    incamt.innerHTML = `Rs : ${inm}`;
    
    const exps=amounts.filter((item)=>item<0).reduce((acc,item)=>(acc+=item),0);
    expamt.innerHTML=`Rs : ${Math.abs(exps)}`;
}
function config(){
    trans.innerHTML=" ";
    transactions.forEach(loadTransactionDetails);
    updateamt();
}
function addTransaction(e){
    e.preventDefault();
    if(description.value.trim()=="" || amount.value.trim()==""){
        alert("Please enter the description and amount");
    }
    else{
        const transaction={
            id:uniqueId(),
            description:description.value,
            amount:Number(amount.value)
        };
        transactions.push(transaction);
        loadTransactionDetails(transaction);
        description.value="";
        amount.value="";
        updateamt();
        updateLocalStorage();
       
    }
}
function uniqueId(){
    return Math.floor(Math.random() * 10000000);
}
form.addEventListener("submit",addTransaction);
window.addEventListener("load", config);

function updateLocalStorage(){
    localStorage.setItem("trans",JSON.stringify(transactions));
}




