
const test = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [7, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [2, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:


function validateCred(array) {
    let checkedArray = [];
    
        // Use 'for' loop for every digit at even position from right to left and double the digit folloing the Luhn algorithm. 
        // Then add the value to the new array at the same position
        for (let i = (array.length - 2); i >= 0; i -= 2) {
            checkedArray[i] = array[i] * 2;
            if(checkedArray[i] > 9) {
                checkedArray[i] -= 9;
            };
        };
        
        // Use second 'for' loop for every digit at odd position from right to left and add the unmodified value to the new array.
        // Then add the value to the new array at the same position to fill in the empty item in the new array.
        for (let j = (array.length - 1); j >= 0; j -= 2) {
            checkedArray[j] = array[j];
        }

    // calculate the sum of all digits in the card number
    let sum = checkedArray.reduce((a,b) => a + b);
    
    // if the remainder of the sum divided by ten is 0, the card is valid
    return sum % 10 === 0;
};

// test
// console.log(validateCred(valid1));

function findInvalidCards (array) {
    let invalidCards = [];
    
    // Iterate through the array of cards and use previous funciton to test each card.
    // If the card is invalid , it's added to the new array of invalid cards
    for(let i = 0; i < array.length; i++) {
        
        let card = validateCred(array[i]);
        
        if(!card) {
            invalidCards.push(array[i]); 
        };
    }

    return invalidCards;
}


// Save the actual list of invalid cards as a variable to use later and print it
let listOfInvalidCards = findInvalidCards(batch);
console.log(listOfInvalidCards);

// Check which companies have issued invalid cards
function idInvalidCardCompanies (array) {
    // Use an array containing recognisable companies by ID which is the first digit of card numbers
    const companyIDNumbers = [3, 4, 5, 6]
    // Sse newArray to add the recognised companies after the check
    let companies = [];


    // Iterate through the list of invalid cards and check if a company is recognised by first digit in the cards.
    // Also in parallel, check if the company is already added to the array of companies.
    // If company is not recognised, print alert message and the credit card number.
    for (i = 0; i < array.length; i++) {

        // Use local variable to compare first digit of each card to the list company ID numbers.
        let firstDigit = array[i][0];

        if (firstDigit === 3 && !companies.includes('Amex')) {
            companies.push('Amex');
        } else if (firstDigit === 4 && !companies.includes('Visa')) {
            companies.push('Visa');
        } else if (firstDigit === 5 && !companies.includes('Mastercard')) {
            companies.push('Mastercard');
        } else if (firstDigit === 6 && !companies.includes('Discover')) {
            companies.push('Discover');
        } else if (!companyIDNumbers.includes(firstDigit)){
            companies.push(`Company not found for card ${array[i].join(' ')}`);
        }

    }

    return companies;

};


console.log(idInvalidCardCompanies(listOfInvalidCards))


