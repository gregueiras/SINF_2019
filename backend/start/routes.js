/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get('/', () => ({ greeting: 'Hello world in JSON' }));
Route.post('/login','UserController.login');
Route.post('/register','UserController.register');
Route.get('/test/create/:id?', 'TestController.index');
Route.get("/test/reset", "TestController.reset");
Route.get("/test/salesInvoices", "TestController.getSalesInvoicesTest");
Route.get("/test/purchasesInvoices", "TestController.getPurchasesInvoicesTest");


Route.get('/master-data/:companyId/:page/:pageSize', 'MasterDataController.getAllItems');
Route.get('/master-data/:companyId/sellerParties', 'MasterDataController.getAllSellerParties');
Route.get('/master-data/:companyId/purchaserParties', 'MasterDataController.getAllPurchaserParties');
Route.get('/new-process',"ProcTypeController.index");
Route.post('/new-process',"ProcessController.addProcess");

Route.get('/proc-type/:name', 'ProcTypeController.getByName');
Route.get('/proc-type', 'ProcTypeController.index');
Route.post('/proc-type', 'ProcTypeController.createProcType');

Route.get('/step', 'StepController.index');
Route.get('/step/getByProcType/:process_type_id', 'StepController.getAllFromProcessType')
Route.get('/step/check/:step/:action_id/:trigger_id', 'StepController.checkForCopy');
Route.post('/step', 'StepController.createStep');

Route.get('/process-step','ProcessStepController.index');
Route.post('/process-step', 'ProcessStepController.createProcessStep');

Route.get("/user", "UserController.index");
Route.get("/user/:id", "UserController.get");

Route.get("/processedFile", "ProcessedFileController.get");
Route.post("/processedFile", "ProcessedFileController.store");
  
Route.get("/product", "ProductController.index");
Route.put("/product", "ProductController.updateCorrespondence");
Route.get(
  "/product/:companyA/:companyB",
  "ProductController.getAllCorrespondences"
);
Route.get(
  "/product/:companyA/:companyB/:idCompanyA",
  "ProductController.getCorrespondence"
);
Route.get(
  "/product/B/:companyA/:companyB/:idCompanyB",
  "ProductController.getCorrespondenceB"
);

Route.get("/company", "CompanyController.index");
Route.get("/company/:id", "CompanyController.get");
Route.get("/company/:id/token", "CompanyController.getToken");
Route.post("/company/token", "CompanyController.setToken");

Route.get("/process", "ProcessController.get");
Route.post("/process/series", "ProcessController.getSeries");
Route.post("/process", "ProcessController.store");
Route.post("/process/steps/current", "ProcessController.canRun");
Route.post("/process/steps/next", "ProcessController.nextStep");


Route.get('/log', 'LogController.index');
Route.get('/log/byId/:id', 'LogController.getById');
Route.get('/log/byState/:state', 'LogController.getByState');
Route.get('/log/byProcId/:process_id', 'LogController.getByProcId');
Route.get('/log/byDate/:begin_date/:end_date', 'LogController.getByDate');
Route.post('/log', 'LogController.createLog');
Route.post('/log/update', 'LogController.updateState');
Route.get("/log/:companyA/:companyB", "LogController.getProcesses");

Route.get("/log/get", "LogController.get");
Route.post("/log/store", "LogController.store");

Route.get('/settings', "CompanyController.index");
Route.put('/settings', "CompanyController.editCompany");
Route.post('/settings', "CompanyController.addCompany");
Route.delete('/settings', "CompanyController.deleteCompany");

Route.get('/trigger', 'TriggerController.index');
Route.get('/trigger/getId/:description', 'TriggerController.getIdByDescription');

Route.get('/action', 'ActionController.index');
Route.get('/action/getId/:description', 'ActionController.getIdByDescription');


Route.get("/entity", "EntityController.index");
Route.get("/entity/:companyA/:companyB/all", "EntityController.getAllCorrespondences");
Route.get("/entity/:companyA/:companyB", "EntityController.getCorrespondence");
Route.put("/entity", "EntityController.updateCorrespondence");
Route.get(
  "/entity/:companyA/:companyB",
  "EntityController.getAllCorrespondences"
);

