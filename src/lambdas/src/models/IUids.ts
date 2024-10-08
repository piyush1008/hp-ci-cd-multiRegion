export interface UIDS{
    utterance: string;
    conversationId: string;
    predictedIntent: string;
    confidenceScore: number;
    languageCode: string;
}


export interface AdditionalData{
    conversationId: string,
        predictedIntent: string,
        confidenceScore: number,
        StatusCode: string,
        StatusDescription:string
}

export interface CasesData {
    [caseNumber: string]: {
        SerialNumber: string;
        WarrantyStatus: string;
    }
}

export interface ProductsData {
    [ProductNumber: string]: {
        ProductNumber: string,
        SerialNumber: string,
        Name: string,
        Category: string,
        WarrantyStatus: string,
        DeviceId?: string,
        ProfileId?: string
    }
}

export interface Product {
    ProductNumber: string,
    SerialNumber: string,
    Name: string,
    Category: string,
    WarrantyStatus: string,
    DeviceId?: string,
    ProfileId?: string
}

export interface phonenumber {
    Primary?: boolean,
    PhoneNumber?: string,
    Verified?: boolean,
    capabilities?: string[]
}


export interface ProfileData {
    FirstName?: string,
    LastName?: string,
    Email?: string,
    Country?: string,
    Language?: string,
    PersonId?: string,
    ProfileId?: string,
    Type?: string,
    PhoneNumbers?: phonenumber[],
    LastModifiedDate?: string
}

export interface ServicesData {
    [ServiceNumber: string]: string[];
}


export interface CaseNumberSearchResponse {
    SourceMatch?: string,
    FaultItemList?: any[];
    ServiceName: string;
    Operation: string;
    Status: string;
    StatusCode: number;
    StatusDescription: string;
    Input:{
        PhoneNumber: string,
        CountryCode : string,
        LanguageCode: string,
        SerialNumber: string,
        ProductNumber: string,
        CaseId: string
    }
    Data?: {
        SessionId?: string,
        Cases?: CasesData[],
        Products?: ProductsData[],
        Profiles?: ProfileData[],
        WarrantyStatus?: string,
        ServiceNames?: ServicesData[]
    };

}