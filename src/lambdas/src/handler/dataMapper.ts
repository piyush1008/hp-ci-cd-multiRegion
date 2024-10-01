import { AdditionalData } from "../models/IUids";

export const mapResponse = (matchingProducts, matchingProfile, additionalData: AdditionalData) => {
    const { conversationId, predictedIntent, confidenceScore, StatusCode, StatusDescription } = additionalData;
  
    // Set Products to null and productsCount to 0 if matchingProducts is empty
    const productsData = matchingProducts.length > 0 ? matchingProducts : null;
  
    return {
      message: "Validations successful",
      Products: productsData,
      productsCount: matchingProducts.length,
      conversationId: conversationId,
      UIDSIntent: predictedIntent,
      confidenceScore: confidenceScore,
      StatusCode: StatusCode,
      StatusDescription: StatusDescription,
      Profiles: matchingProfile
        ? {
            latest_FirstName: matchingProfile.FirstName,
            latest_LastName: matchingProfile.LastName,
            latest_Email: matchingProfile.Email,
            latest_Country: matchingProfile.Country,
            PhoneNumbers: matchingProfile.PhoneNumbers,
            latest_PersonId: matchingProfile.PersonId,
            latest_ProfileId: matchingProfile.ProfileId,
            latest_Type: matchingProfile.Type,
            latest_LastModifiedDate: matchingProfile.LastModifiedDate,
          }
        : null,
    };
  };
  
  