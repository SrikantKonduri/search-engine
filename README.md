### Search Engine

---
* Please find working demo [here](https://youtu.be/s-EtxuIeYHk)
### API Overview

- Following is the JSON format in which the response is obtained on search.

```json
   {
      "data": [
          {
            "id": "65e940a8a8f0a31b0f79d115",
            "title": "What is Data Foundation?",
            "description": " The Data Foundation will host a library of dig
            ital data, and will encompass the technology-platform, infr
            astructure and manpower to collect, create, curate, annotate,
            secure and deploy it. It will be a major resource for the technology community",
         },
      ]
   }
```

---

### Instructions to run the application

---

#### Prerequisites

- Make sure solr is installed in your machine.
- Please visit [solr](https://solr.apache.org/downloads.html) for downloading solr into your machine.
  ==Download depends on which OS your machine is running==
- On successfully installing solr, solr executable file can be found in bin directory of the solr folder.
- Navigate to solr directory which was installed or downloaded from the web.
- Run solr by the using the command `bin/solr start`

##### Creating Core

- Open terminal and create core by using the following command
  For MAC: `bin/solr create_core -c {CORE-NAME}` CORE-NAME is the placeholder.
  ==For other OS: Please refer solr documentation==
- After creating core, set `CORE_NAME` variable in `.env` file present in server directory.
- By default node server runs at `8080`, If the port is not available please make sure to change the variable in `.env` file in server directory

##### Data Ingestion

- When node server runs successfully data is ingested into solr from `data.json`.
- This json file contains data in the format mentioned in the beginning.
- If custom data to be inserted, adhere to the json format mentioned above.

---

##### Running node server

- Open terminal and navigate to **server** directory.
- Run `npm install` to make sure all necessary modules in `package.json` are present.
- Run `node index.js` and it should show server running on the mentioned PORT.

##### Running client

- Open terminal and navigate to **client** directory.
- Run `npm install` to make sure all necessary modules in `package.json` are present.
- Run `npm run dev` and client runs at port `5173`.
- You can use the search bar in the client to search for datasets.
