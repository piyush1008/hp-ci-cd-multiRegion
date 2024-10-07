
import axios from "axios";
import { getUIDSAuthToken, getValidatePhoneAuthToken } from "../utils/util";
import { CaseNumberSearchResponse, UIDS } from "../models/IUids";
const oauth = require('axios-oauth-client');

// const  { getValidatePhoneAuthToken, getUIDSAuthToken } = require('../utils/utils.auth');



export const validatePhoneAndEmail = async (event, type): Promise<any> => {
    try {
      let {CountryCode, PhoneNumber, LanguageCode} = event;
      const token:any = await getValidatePhoneAuthToken();
        let endpoint = "https://hpcs-crm-itg.hpcloud.hp.com/v1/telephony";
      let apiPath =
              '/' +
                endpoint
                  .split('/')
                  .slice(3)
                  .join('/');
      console.log("Token generated", token);
      let requestBody=
        {
          "ServiceName": "Routing3",
          "Operation": type,
            "Data": {
              "CountryCode": CountryCode,
              "PhoneNumber": PhoneNumber,
              "LanguageCode": LanguageCode
            }
        };
      let requestOptions = {
        host: endpoint.split('/')[2],     // "po1tnlcn76.execute-api.us-west-2.amazonaws.com",   ///replace with parameter - no hardcoded URLS!
        method: 'POST',
        url: endpoint,
        path: apiPath,
        data: requestBody,
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token.access_token
        },
        region: 'us-west-2'
      };
      console.log("request--:", requestOptions);
      const response = await axios(requestOptions);
      console.log("response 1", response);
      if (response.status === 200 && !response.data) {
        throw new Error("No matching phone or email found.");
      }

    //   const caseNumberSearchResponse: CaseNumberSearchResponse = {
    //     FaultItemList: response.data?.FaultItemList || [],
    //     ServiceName: response.data.ServiceName || requestBody.ServiceName,
    //     Operation: response.data.Operation || type,
    //     Status: response.data.Status || 'Success',
    //     StatusCode: response.status,
    //     StatusDescription: response.statusText || 'OK',
    //     Input: {
    //       PhoneNumber: PhoneNumber || '',
    //       CountryCode: CountryCode || '',
    //       LanguageCode: LanguageCode || '',
    //       SerialNumber: response.data.SerialNumber || '',
    //       ProductNumber: response.data.ProductNumber || '',
    //       CaseId: response.data.CaseId || ''
    //     },
    //     Data: {
    //       SessionId: response.data.Data?.SessionId || '',
    //       Cases: response.data.Data?.Cases || {},
    //       Products: response.data.Data?.Products || {},
    //       Profiles: response.data.Data?.Profiles || [],
    //       WarrantyStatus: response.data.Data?.WarrantyStatus || '',
    //       ServiceNames: response.data.Data?.ServiceNames || {}
    //     }
    //   };
  
      return response.data;
    } catch (error) {
      throw new Error(`Phone and Email validation failed: ${error.message}`);
    }
  };
  
export  const validateUIDS = async (event) : Promise<UIDS> => {
    try {
      const token:any = await getUIDSAuthToken();
     let endpoint = "https://uids.hpcloud.hp.com/uids/V1/inference";
      let apiPath =
              '/' +
                endpoint
                  .split('/')
                  .slice(3)
                  .join('/');
      console.log("Token generated2", token);
      let {inputTranscript} = event;
      let requestOptions = {
        host: endpoint.split('/')[2],     // "po1tnlcn76.execute-api.us-west-2.amazonaws.com",   ///replace with parameter - no hardcoded URLS!
        method: 'GET',
        url: endpoint,
        path: apiPath,
        headers: {
            'Authorization': 'bearer ' + token.access_token
        },
        params: {
            'utterance': inputTranscript
            // 'languageCode': language,
        },
        region: 'us-west-2',
      };
      console.log("request2--:", requestOptions);
      const response = await axios(requestOptions);
      console.log("response 2", response);

      if(!response || response.data)
      {
        throw new Error("No response from UIDS API.");
      }

       // Cast response.data to the expected UIDS type
    const { utterance, conversationId, predictedIntent, confidenceScore, languageCode } = response.data as UIDS;

      
      let result={
        utterance: utterance,
        conversationId: conversationId,
        predictedIntent: predictedIntent,
        confidenceScore: confidenceScore,
        languageCode: languageCode
        }
      return result;
    } catch (error) {
      throw new Error(`UIDS validation failed: ${error.message}`);
    }
  };

