# FORM EDITOR

The project has 2 services and 2 front-end applications.
 
### Project Data
The data project has an API for interacting with a front-end application. To create a form and get answers. As well as an API for interacting with another service by json-rpc.

##### Front-end: React
##### Back-end: FastAPI
##### Database MongoDB

#### API

* POST host/api/form/ - Create a form
* GET host/api/form/answers/ - Getting answers

#### JSON-RPC

POST host/api/v1 - Route

* method get_form - Getting form
* method send_answer - Submit responses to a form
* get_form_fields - Get form responses

### Project Site

Site interacts with Data using json-rpc. To send json-rpc, the Worker class was developed, which sends HTTP requests using the HTTPX asynchronous library.

##### Front-end: React
##### Back-end: FastAPI

### API

* GET host/api/form/ - Getting a form by its id
* POST host/api/form/answer/ - Sending responses to the form
* GET host/api/form/answer/ - Getting answers to the form