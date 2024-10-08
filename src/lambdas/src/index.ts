import axios from "axios";
import { validatePhoneAndEmail, validateUIDS } from "./handler/validate";
import { mapResponse } from "./handler/dataMapper";
import { AdditionalData, Product, UIDS } from "./models/IUids";



exports.handler = async (event) => {
    try {
      const [phoneEmailResult, uidResult] = await Promise.all([
        validatePhoneAndEmail(event, "ValidatePhoneN"),
        validateUIDS(event)
      ]);
      console.log("results--", phoneEmailResult, uidResult);
  
      let { StatusCode, Data: { Products, Cases, Profiles }, StatusDescription } = phoneEmailResult;



      let UidsResult: UIDS = {
        utterance: uidResult.utterance,
        conversationId: uidResult.conversationId,
        predictedIntent: uidResult.predictedIntent,
        confidenceScore: uidResult.confidenceScore,
        languageCode: uidResult.languageCode,
      };
      

      console.log(`${UidsResult.utterance} ${UidsResult.confidenceScore}`)
  
      // Function to get matching products, add cases, and profiles
      const getMatchingProductsAndAddCasesAndProfiles = (productsArray, casesObject, profilesArray, category, name, limit) => {
        // Filter products by category or name
        const matchingProducts = productsArray.filter(product => {
          const productData: any = Object.values(product)[0];
          if (productData.Category === null || productData.Category === undefined) {
            return false;
          }
  
          // Match products based on category or name
          if (productData.Category) {
            return productData.Category === category;
          } else {
            return productData.Name === name;
          }
        });
        
        // Sort products and add cases
        const sortedProducts = sortProducts(matchingProducts, casesObject, limit);
  
        // Get the most recent profile from the profiles array
        const mostRecentProfile = getMostRecentProfile(profilesArray);
  
        // Return latest profile if no matching products found
        if (matchingProducts.length === 0) {
          return { matchingProducts: [], matchingProfile: mostRecentProfile };
        }
  
        // Add profiles to matching products
        const productsWithProfiles = addMatchingProfileToProduct(sortedProducts, profilesArray);
  
        // Return the final response with sorted products and the most recent profile
        return {
          matchingProducts: productsWithProfiles,
          matchingProfile: mostRecentProfile,
        };
      };
  
      const { matchingProducts, matchingProfile } = getMatchingProductsAndAddCasesAndProfiles(
        Products, Cases, Profiles, event.productType, event.productName,3
      );
     let response: AdditionalData={
        conversationId:UidsResult.conversationId,
        predictedIntent:UidsResult.predictedIntent,
        confidenceScore:UidsResult.confidenceScore,
        StatusCode:StatusCode,
        StatusDescription: StatusDescription
      }
     
      // Map the final response using the data mapper
      const result = mapResponse(matchingProducts, matchingProfile, response);
  
      console.log("Final result", JSON.stringify(result));
      return result;
  
    } catch (error) {
      console.error("Error:", error.message);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "An error occurred",
          error: error.message
        })
      };
    }
  };