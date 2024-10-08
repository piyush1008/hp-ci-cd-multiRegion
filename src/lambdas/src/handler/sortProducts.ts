// Sorting functions
const sortCasesByNumber = (casesObject, serialNumber) => {
    return Object.keys(casesObject)
        .filter(caseId => casesObject[caseId].SerialNumber === serialNumber)
        .sort((a:any, b:any) => b - a);  // Sort by case number in descending order
};

const addCasesToProduct = (product, casesObject) => {
    const sortedCases = sortCasesByNumber(casesObject, product.SerialNumber);

    // Add the first matching case as an object
    if (sortedCases.length > 0) {
        const firstCaseId = sortedCases[0];
        product.Cases = {
            SerialNumber: casesObject[firstCaseId].SerialNumber,
            WarrantyStatus: casesObject[firstCaseId].WarrantyStatus,
            CaseId: firstCaseId, // Add the CaseId key
        };
    } else {
        product.Cases = null; // Set Cases to null if no matching cases are found
    }

    // Uncomment the code below to add multiple cases as an array
    /*
    if (sortedCases.length > 0) {
      product.Cases = sortedCases.map(caseId => ({
        SerialNumber: casesObject[caseId].SerialNumber,
        WarrantyStatus: casesObject[caseId].WarrantyStatus,
        CaseId: caseId, // Add the CaseId key for each case
      }));
    } else {
      product.Cases = null; // Set Cases to null if no matching cases are found
    }
    */

    return product;
};

const sortByDeviceAddedDate = (a:any, b:any) => {
    const dateA:any = a.DeviceAddedDate ? new Date(a.DeviceAddedDate) : new Date(0);
    const dateB:any= b.DeviceAddedDate ? new Date(b.DeviceAddedDate) : new Date(0);
    return dateB - dateA;
};

const sortByLargestCaseNumber = (a, b) => {
    const largestCaseA = a.Cases ? Math.max(...Object.keys(a.Cases).map(Number)) : 0;
    const largestCaseB = b.Cases ? Math.max(...Object.keys(b.Cases).map(Number)) : 0;
    return largestCaseB - largestCaseA;
};

// Main sorting function


// proile matching and case matching 
// return eg muliple product no profileID (CDAX) any case and mathcing Case Lenght > 0
//  return latest profile matchingProducts.length == 0
// return eg muliple product muliple profile any case and mathcing Case Lenght > 0
// return all
// return eg muliple product muliple profile  and mathcing Case Lenght == 0
// return all

// No to all products 
// return latest profiles


const sortProducts = (products, casesObject, limit) => {
    // Add sorted cases and sort products
    const sortedProducts = products.map(product => {
        const productData = Object.values(product)[0];

        // Add cases to product
        addCasesToProduct(productData, casesObject);

        return productData;
    }).sort((a, b) => {
        const caseSortResult = sortByLargestCaseNumber(a, b);
        if (caseSortResult !== 0) {
            return caseSortResult;
        }
        return sortByDeviceAddedDate(a, b); // Sort by date if case numbers are equal
    });

    // Return only the first 'limit' products or less
    return sortedProducts.slice(0, limit);
};

module.exports = { sortProducts };
