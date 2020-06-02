const loanForm = document.getElementById('loan-form');


loadEventListeners();

function loadEventListeners(){
    loanForm.addEventListener('submit', function(e){
        //show results
        document.getElementById('results').style.display = 'none';
        // show loader
        document.getElementById('loading').style.display = 'block';

        setTimeout(calculateResult, 3000)
        e.preventDefault();
    });
}

function calculateResult(){

    // UI vars
    const loanAmount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(loanAmount.value);
    const interestCalculated = parseFloat(interest.value) /100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    

    // monthlypayments
    const x = Math.pow(1 + interestCalculated, calculatedPayment);
    const monthly = (principal*x*interestCalculated)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment)-principal).toFixed(2);
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    }else{
        showError('please check your numbers');
    }

    // loanAmount.value = "";
    // interest.value = "";
    // years.value="";


   
}
function showError(error){

    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';

    // get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv,heading);

    // clear error after 3 seconds
    setTimeout(clearError, 3000);

}
// clear error
function clearError(){
    document.querySelector('.alert').remove();
}

// dark mode for loan calculator
const checkbox = document.getElementById('checkbox');


checkbox.addEventListener('click', function(){
   document.body.classList.toggle('dark');
   
});