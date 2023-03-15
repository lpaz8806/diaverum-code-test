# Diaverum Code Test

* API (.NET `v6.0`)
* Client (React `v18.2`)

## Getting started

### Requirements ###
* dotnet 6 cdk / runtime
* dotnet cli tools (for entity framework)
* npm


### Setup project ###
1. Clone the project. Let `<project-dir>` to be the location
2. Set up the project
   * Open a terminal
   * Run `cd <project-dir>`
   * Run `npm run setup`

### Run project ###
1. Start the server
   * Open a terminal
   * Run `cd <project-dir>`
   * Run `npm run start-server`

2. To get started with client development:
   * Open a new terminal
   * Run `cd <project-dir>`
   * Run `npm run start-server`


## API ##

`GET /api/v1/labresults`

**Example Output**
```
[
  {
    "id": 0,
    "clinicNo": "string",
    "barcode": "string",
    "patientId": "string",
    "patientName": "string",
    "dateOfBirth": "string",
    "gender": "string",
    "collectionDate": "string",
    "collectionTime": "string",
    "testCode": "string",
    "testName": "string",
    "result": "string",
    "unit": "string",
    "refRangeLow": "string",
    "refRangeHigh": "string",
    "note": "string",
    "nonSpecRefs": "string"
  }
]
```

---

`GET /api/v1/labresults/{id}`

```
{
   "id": 0,
   "clinicNo": "string",
   "barcode": "string",
   "patientId": "string",
   "patientName": "string",
   "dateOfBirth": "string",
   "gender": "string",
   "collectionDate": "string",
   "collectionTime": "string",
   "testCode": "string",
   "testName": "string",
   "result": "string",
   "unit": "string",
   "refRangeLow": "string",
   "refRangeHigh": "string",
   "note": "string",
   "nonSpecRefs": "string"
}
```

---

`POST /api/v1/labresults`

The expected body is the content of lab results file like `Appendix to Question 8`