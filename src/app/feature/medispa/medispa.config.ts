import { JsonConfigRoot } from '../../shared/models/json-form.model';

export const MEDISPA_CONFIG: JsonConfigRoot = {
  "useStepper": true,
  "quoteFlow": [
    { "id": "1", "name": "Customer Information", "endpoint": "/customerInformationModel", "icon": "User" },
    { "id": "2", "name": "Quote Information", "endpoint": "/quoteInformationModel", "icon": "FileText" },
    { "id": "3", "name": "Quick Quote Summary", "endpoint": "/quickQuoteSummaryModel", "icon": "ClipboardList" },
    { "id": "4", "name": "Prior Claims Questions/Underwriting Questions", "endpoint": "/priorClaimsModel", "icon": "HelpCircle" },
    { "id": "5", "name": "General Liability", "endpoint": "/generalLiabilityModel", "icon": "Briefcase" },
    { "id": "6", "name": "HNOA", "endpoint": "/hnoaModel", "icon": "Car" },
    { "id": "7", "name": "Employee Benefit Liability", "endpoint": "/eblModel", "icon": "Users" },
    { "id": "8", "name": "Abuse Molestation", "endpoint": "/abuseModel", "icon": "AlertTriangle" },
    { "id": "9", "name": "Business Personal Property", "endpoint": "/bppModel", "icon": "Box" },
    { "id": "10", "name": "Employee Theft", "endpoint": "/theftModel", "icon": "Lock" },
    { "id": "11", "name": "Full Quote Summary", "endpoint": "/fullQuoteSummaryModel", "icon": "FileCheck" }
  ],
  "customerInformationModel": {
    "fields": [
      {"label":"Type of Insured","name":"typeOfInsured","component":"Radio","fullRow":true,"options":[{"label":"Corporation","value":"corporation"},{"label":"Individual","value":"individual"}],"value":"corporation","validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Business Name","name":"businessName","component":"TextInput","type":"text","value":"","isValid":true,"placeholder":"Enter business name","dependsOn":[{"elementId":"typeOfInsured","equals":"corporation"}],"hideWhenDepNotMet":true,"prefillFromStep":1,"validationRules":{"required":{"value":true,"errMessage":"Business name is required"}}},
      {"label":"Business Mailing Address","name":"businessMailingAddress","component":"TextInput","type":"text","value":"","isValid":true,"placeholder":"Enter business mailing address","dependsOn":[{"elementId":"typeOfInsured","equals":"corporation"}],"hideWhenDepNotMet":true,"prefillFromStep":1,"validationRules":{"required":{"value":true,"errMessage":"Business mailing address is required"}}},
      {"label":"First Name","name":"firstName","component":"TextInput","type":"text","value":"","isValid":true,"placeholder":"Enter first name","dependsOn":[{"elementId":"typeOfInsured","equals":"individual"}],"hideWhenDepNotMet":true,"prefillFromStep":1,"validationRules":{"required":{"value":true,"errMessage":"First name is required"}}},
      {"label":"Last Name","name":"lastName","component":"TextInput","type":"text","value":"","isValid":true,"placeholder":"Enter last name","dependsOn":[{"elementId":"typeOfInsured","equals":"individual"}],"hideWhenDepNotMet":true,"prefillFromStep":1,"validationRules":{"required":{"value":true,"errMessage":"Last name is required"}}},
      {"label":"Do you secure a signed medical history from each patient?","name":"signedMedicalHistory","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Any clients under 18?","name":"clientsUnder18","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Do you require parent/guardian consent?","name":"parentalConsent","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"dependsOn":[{"elementId":"clientsUnder18","equals":"yes"}],"hideWhenDepNotMet":true,"validationRules":{"required":{"value":true,"errMessage":"Parental consent is required for clients under 18"}}},
      {"label":"Do patients receive anesthetic agents/drugs?","name":"anestheticAgents","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Do you prescribe weight loss medication?","name":"weightLossMedication","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Is the medication compounded?","name":"compoundedMedication","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"dependsOn":[{"elementId":"weightLossMedication","equals":"yes"}],"hideWhenDepNotMet":true,"validationRules":{"required":{"value":true,"errMessage":"This information is required"}}},
      {"label":"Who is your Medical Director?","name":"medicalDirector","component":"TextInput","type":"text","value":"","isValid":true,"placeholder":"Enter Medical Director's name","validationRules":{"required":{"value":true,"errMessage":"Medical Director information is required"}}},
      {"label":"Does Medical Director provide direct patient care?","name":"directPatientCare","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Weekly hours of direct patient care","name":"weeklyHours","component":"Select","options":[{"label":"0-10 hours","value":"0-10"},{"label":"11-20 hours","value":"11-20"},{"label":"21-30 hours","value":"21-30"},{"label":"31-40 hours","value":"31-40"},{"label":"40+ hours","value":"40+"}],"dependsOn":[{"elementId":"directPatientCare","equals":"yes"}],"hideWhenDepNotMet":true,"validationRules":{"required":{"value":true,"errMessage":"Please select weekly hours"}}}
    ],
    "buttons": [ { "label": "Next", "type": "submit", "onClickHandler": "handleNext" } ]
  },
  "quoteInformationModel": {
    "fields": [
      {"label":"Business Name","name":"businessName","component":"TextInput","type":"text","value":"","isValid":true,"placeholder":"Enter business name","dependsOn":[{"elementId":"typeOfInsured","equals":"corporation"}],"hideWhenDepNotMet":true,"prefillFromStep":1,"validationRules":{"required":{"value":true,"errMessage":"Business name is required"}}},
      {"label":"Contact Name","name":"contactName","component":"TextInput","type":"text","value":"","isValid":true,"placeholder":"Enter contact name","dependsOn":[{"elementId":"typeOfInsured","equals":"corporation"}],"hideWhenDepNotMet":true,"prefillFromStep":1,"validationRules":{"required":{"value":true,"errMessage":"Business name is required"}}},
      {"label":"ZIP Code","name":"zipCode","component":"TextInput","type":"text","value":"","isValid":true,"placeholder":"Enter ZIP Code","dependsOn":[{"elementId":"typeOfInsured","equals":"corporation"}],"hideWhenDepNotMet":true,"prefillFromStep":1,"validationRules":{"required":{"value":true,"errMessage":"Business mailing address is required"}}},
      {"label":"Business Name","name":"businessName","component":"TextInput","type":"text","value":"","isValid":true,"placeholder":"Enter business name","dependsOn":[{"elementId":"typeOfInsured","equals":"corporation"}],"hideWhenDepNotMet":true,"prefillFromStep":1,"validationRules":{"required":{"value":true,"errMessage":"Business name is required"}}},
      {"label":"First Name","name":"firstName","component":"TextInput","type":"text","value":"","isValid":true,"placeholder":"Enter first name","dependsOn":[{"elementId":"typeOfInsured","equals":"individual"}],"hideWhenDepNotMet":true,"prefillFromStep":1,"validationRules":{"required":{"value":true,"errMessage":"First name is required"}}},
      {"label":"Last Name","name":"lastName","component":"TextInput","type":"text","value":"","isValid":true,"placeholder":"Enter last name","dependsOn":[{"elementId":"typeOfInsured","equals":"individual"}],"hideWhenDepNotMet":true,"prefillFromStep":1,"validationRules":{"required":{"value":true,"errMessage":"Last name is required"}}},
      {"label":"Effective Date","name":"effectiveDate","component":"DatePicker","type":"date","value":"","isValid":true,"validationRules":{"required":{"value":true,"errMessage":"Effective date is required"}}},
      {"label":"Retro Date","name":"retroDate","component":"DatePicker","type":"date","value":"","isValid":true,"validationRules":{"required":{"value":true,"errMessage":"Retro date is required"},"customValidation":{"type":"dateLessThanOrEqual","compareWith":"effectiveDate","errMessage":"Retro date must be less than or equal to Effective date"}}},
      {"label":"Per Claim/ Aggregate","name":"abusePerClaimAggregate","component":"Select","options":[{"label":"25k/25k","value":"25k/25k"},{"label":"100k/100k","value":"100k/100k"},{"label":"100k/300k","value":"100k/300k"},{"label":"250k/250k","value":"250k/250k"},{"label":"250k/750k","value":"250k/750k"},{"label":"500k/500k","value":"500k/500k"},{"label":"500k/1.5M","value":"500k/1.5M"},{"label":"750k/750k","value":"750k/750k"},{"label":"1M/1M","value":"1M/1M"},{"label":"1M/3M","value":"1M/3M"}],"placeholder":"Select Per Claim/Aggregate","value":"100k/300k","validationRules":{"required":{"value":true,"errMessage":"Please select Per Claim/Aggregate limit"}}},
      {"label":"Projected Gross Revenue","name":"grossRevenue","component":"CurrencySlider","min":0,"max":500000,"step":100000,"value":"0","validationRules":{"required":{"value":true,"errMessage":"Please select projected gross revenue"}}}
    ],
    "buttons": [
      { "label": "Back", "type": "button", "onClickHandler": "handlePrev" },
      { "label": "Next", "type": "button", "onClickHandler": "handleNext" }
    ]
  },
  "quickQuoteSummaryModel": {
    "fields": [ { "component": "QuoteSummary", "quoteNumber": "258022", "price": "$8,900.00", "coverages": ["Professional Liability"], "details": ["$1,000,000 Per Occurrence Limit","$3,000,000 Aggregate Limit","$0 Retention","12 Month Coverage Period"], "retroDate": "Policy Inception", "additionalCoverages": [{"label":"Professional Liability","value":"pl","defaultChecked":true,"disabled":true},{"label":"General Liability","value":"gl","defaultChecked":false},{"label":"Hired and Non-Owned Automobiles","value":"hnoa","defaultChecked":false},{"label":"Employee Benefits Liability","value":"ebl","defaultChecked":false},{"label":"Abuse and Molestation","value":"abuse","defaultChecked":false},{"label":"Business Personal Property","value":"bpp","defaultChecked":false},{"label":"Employee Theft","value":"theft","defaultChecked":false}], "selectedAdditional": ["pl"] } ],
    "buttons": [
      { "label": "Back", "type": "button", "onClickHandler": "handlePrev" },
      { "label": "Next", "type": "button", "onClickHandler": "handleNext" }
    ]
  },
  "priorClaimsModel": {
    "fields": [
      {"label":"Have you, your organization or any health care professional rendering services on your behalf ever been notified of an involvement in a malpractice claim, suit, or incident, either directly or indirectly?","name":"malpracticeClaimNotified","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This information is required"}}},
      {"label":"Are you or any health care professional rendering services on your organization's behalf aware of any conduct, circumstance, occurrence, incident or accident that is likely to or reasonably could be expected to give rise to a claim?","name":"potentialClaimAwareness","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This information is required"}}},
      {"label":"Policy Effective Date","name":"policyEffectiveDate","component":"DatePicker","type":"date","value":"","isValid":true,"validationRules":{"required":{"value":true,"errMessage":"Policy Effective Date is required"}}}
    ],
    "buttons": [
      { "label": "Back", "type": "button", "onClickHandler": "handlePrev" },
      { "label": "Next", "type": "button", "onClickHandler": "handleNext" }
    ]
  },
  "generalLiabilityModel": {
    "fields": [
      {"label":"Are any services provided on the insured's premises?","name":"servicesOnPremises","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Does the insured own or operate any bed/board facilities?","name":"bedBoardFacilities","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Has the applicant sold, acquired, or discontinued any operations in the past five years?","name":"operationsChange5Years","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Retro Date","name":"glRetroDate","component":"DatePicker","type":"date","value":"","isValid":true,"validationRules":{"required":{"value":false}}}
    ],
    "buttons": [
      { "label": "Back", "type": "button", "onClickHandler": "handlePrev" },
      { "label": "Next", "type": "button", "onClickHandler": "handleNext" }
    ]
  },
  "hnoaModel": {
    "fields": [
      {"label":"Does the insured annually check MVRs (motor vehicle records)?","name":"checksMvr","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"Please select whether MVRs are checked annually"}}},
      {"label":"Require all drivers to carry the state mandated personal auto liability limits?","name":"stateMandatedLimits","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"Please indicate if drivers must carry state mandated limits"}}},
      {"label":"Restrict or exclude any driver with either moving violations or accidents totaling more than two in the past 3 years, or more than three in the past 5 years?","name":"restrictDrivers","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"Please indicate if drivers are restricted based on violations"}}},
      {"label":"Require all drivers to carry a \"business use endorsement\" on their auto liability policies?","name":"businessUseEndorsement","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"Please indicate if business use endorsement is required"}}},
      {"label":"Transport any clients?","name":"transportClients","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"Please indicate if clients are transported"}}},
      {"label":"What is the percentage?","name":"transportPercentage","component":"TextInput","type":"number","placeholder":"Enter percentage (0-100)","dependsOn":[{"elementId":"transportClients","equals":"yes"}],"hideWhenDepNotMet":true,"validationRules":{"required":{"value":true,"errMessage":"Please enter the transport percentage"},"min":{"value":0,"errMessage":"Percentage cannot be less than 0"},"max":{"value":100,"errMessage":"Percentage cannot be more than 100"}}},
      {"label":"Make any deliveries?","name":"makeDeliveries","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"Please indicate if deliveries are made"}}},
      {"label":"Confirm all drivers are at least 21 years of age?","name":"driversAge21Plus","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"Please confirm driver age requirement"}}},
      {"label":"Annual reimbursable miles driven for all personal vehicles on behalf of the company?","name":"annualMiles","component":"TextInput","type":"number","placeholder":"Enter miles","validationRules":{"required":{"value":true,"errMessage":"Please enter annual reimbursable miles"},"min":{"value":0,"errMessage":"Annual miles cannot be negative"},"max":{"value":100000,"errMessage":"Annual miles seems unusually high. Please verify the value"}}}
    ],
    "buttons": [
      { "label": "Back", "type": "button", "onClickHandler": "handlePrev" },
      { "label": "Next", "type": "button", "onClickHandler": "handleNext" }
    ]
  },
  "eblModel": {
    "fields": [
      {"label":"How frequently does the Insured offer open enrollment periods?","name":"openEnrollmentFrequency","component":"Radio","options":[{"label":"On Hire only","value":"onHire"},{"label":"Semi Annually","value":"semiAnnually"},{"label":"Annually","value":"annually"}],"validationRules":{"required":{"value":true,"errMessage":"Please select an option"}}},
      {"label":"Does open enrollment require the Insured to actively elect coverage enrollment?","name":"activeElectionRequired","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Is a signed acceptance or rejection of benefit programs required each open enrollment?","name":"signedAcceptanceRequired","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Is a physical exam required prior to enrollment in a Group Health/Life Insurance Program?","name":"physicalExamRequired","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Does the insured allow for enrollment changes due to life changing events?","name":"enrollmentChangeAllowed","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Does the Insured use an outsourced provider to manage their benefit plans?","name":"outsourcedProvider","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Retro Date","name":"eblRetroDate","component":"DatePicker","type":"date","value":"","isValid":true,"validationRules":{"required":{"value":true,"errMessage":"Retro date is required"},"customValidation":{"type":"dateLessThanOrEqual","compareWith":"effectiveDate","errMessage":"Retro Date cannot be greater than Policy Effective Date"}}}
    ],
    "buttons": [
      { "label": "Back", "type": "button", "onClickHandler": "handlePrev" },
      { "label": "Next", "type": "button", "onClickHandler": "handleNext" }
    ]
  },
  "abuseModel": {
    "fields": [
      {"label":"Does the insured have a zero tolerance policy for sexual and physical abuse?","name":"zeroTolerancePolicy","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Require all staff to undergo an abuse registry check?","name":"abuseRegistryCheck","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Require all staff to undergo a criminal background check?","name":"criminalBackgroundCheck","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"This is a required field"}}},
      {"label":"Percentage of the patients served that are disabled, handicapped or at risk? (%)","name":"atRiskPercentage","component":"TextInput","type":"number","placeholder":"Enter Percentage","validationRules":{"required":{"value":true,"errMessage":"This is a required field"},"min":{"value":0,"errMessage":"Percentage cannot be less than 0"},"max":{"value":100,"errMessage":"Percentage cannot be more than 100"}}},
      {"label":"Retro Date","name":"abuseRetroDate","component":"DatePicker","type":"date","value":"","isValid":true,"validationRules":{"required":{"value":true,"errMessage":"Retro date is required"},"customValidation":{"type":"dateLessThanOrEqual","compareWith":"effectiveDate","errMessage":"Retro Date cannot be greater than Policy Effective Date"}}}
    ],
    "buttons": [
      { "label": "Back", "type": "button", "onClickHandler": "handlePrev" },
      { "label": "Next", "type": "button", "onClickHandler": "handleNext" }
    ]
  },
  "bppModel": {
    "fields": [
      {"label":"Limit of Insurance","name":"bppLimitOfInsurance","component":"Select","options":[{"label":"5,000","value":"5000"},{"label":"10,000","value":"10000"},{"label":"25,000","value":"25000"},{"label":"50,000","value":"50000"},{"label":"75,000","value":"75000"},{"label":"100,000","value":"100000"}],"placeholder":"Select Limit of Insurance","value":"25000","validationRules":{"required":{"value":true,"errMessage":"Please select a limit of insurance"}}},
      {"label":"Retention Per Claim","name":"bppRetentionPerClaim","component":"Select","options":[{"label":"500","value":"500"},{"label":"1,000","value":"1000"},{"label":"2,500","value":"2500"}],"placeholder":"Select Retention Per Claim","value":"500","validationRules":{"required":{"value":true,"errMessage":"Please select a retention per claim"}}}
    ],
    "buttons": [
      { "label": "Back", "type": "button", "onClickHandler": "handlePrev" },
      { "label": "Next", "type": "button", "onClickHandler": "handleNext" }
    ]
  },
  "theftModel": {
    "fields": [ {"label":"Would you like to add Employee Theft Coverage?","name":"addTheftCoverage","component":"Radio","options":[{"label":"Yes","value":"yes"},{"label":"No","value":"no"}],"validationRules":{"required":{"value":true,"errMessage":"Please indicate if you want to add theft coverage"}}} ],
    "buttons": [
      { "label": "Back", "type": "button", "onClickHandler": "handlePrev" },
      { "label": "Next", "type": "button", "onClickHandler": "handleNext" }
    ]
  },
  "fullQuoteSummaryModel": {
    "fields": [ {"component":"FullQuoteSummary","isSummary":true,"status":"Quoted","summaryFields":[{"label":"Business Name","value":"Test Abc"},{"label":"Business Mailing Address","value":"Saint Clair Forest Road, Moody, AL 35004, USA"},{"label":"Effective Date","value":"10/01/2023"},{"label":"Projected Gross Revenues","value":"$5,000,000"},{"label":"Quote Number","value":"257995"},{"label":"Commission","value":"10%"}],"coverages":[{"coverage":"Professional Liability","retroDate":"Policy Inception"},{"coverage":"General Liability","retroDate":"Policy Inception"},{"coverage":"Hired And Non Owned Automobiles","retroDate":"NA"},{"coverage":"Employee Benefits Liability (EBL)","retroDate":"Policy Inception"},{"coverage":"Abuse and Molestation","retroDate":"Policy Inception"},{"coverage":"Business Personal Property","retroDate":"NA"}],"coverageColumns":[{"label":"Coverage","key":"coverage"},{"label":"Retro Date","key":"retroDate"}],"premiumFields":[{"label":"Total Premium","value":"$12,882.00 Per Policy Period"}] } ],
    "buttons": [
      { "label": "Back", "type": "button", "onClickHandler": "handlePrev" },
      { "label": "Submit", "type": "submit", "onClickHandler": "onSubmit" }
    ]
  }
};
