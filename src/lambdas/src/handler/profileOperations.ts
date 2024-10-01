// Helper function to get the most recent profile based on LastModifiedDate
const getMostRecentProfile = (profiles) => {
    return profiles.reduce((latestProfile, currentProfile) => {
        const latestDate = new Date(latestProfile.LastModifiedDate);
        const currentDateProfile = new Date(currentProfile.LastModifiedDate);

        // Check if current profile date is more recent than the latest profile
        return currentDateProfile > latestDate ? currentProfile : latestProfile;
    });
};

// Helper function to match ProfileId and add profile to a product
const addMatchingProfileToProduct = (products, profiles) => {
    // assuming products to profile has 1:1 mapping
    let ProfileId = profiles[0].ProfileId;
    let arr = [];
    let matchingProfile = products.map(product => {
       
        if(ProfileId === product.ProfileId){
            product.Profile = profiles[0];
        } else {
            product.Profile = null;
        }
        arr.push(product);
        // const matchedProfile = profiles.find(profile => profile.ProfileId === product.ProfileId);
        // product.Profile = matchedProfile ? matchedProfile : null;
        // return product;
    });
    return arr;
}
// Function to handle all profile-related operations on products
const handleProfilesForProducts = (products, profiles) => {
    return products.map(product => {
        const productData = Object.values(product)[0];

        // Add matching profile to product
        addMatchingProfileToProduct(productData, profiles);

        return productData;
    });
};

module.exports = {
    getMostRecentProfile,
    addMatchingProfileToProduct
};
