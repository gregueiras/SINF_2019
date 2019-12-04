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
Route.get('/test', 'TestController.index');
Route.get('/master-data/:companyId/:page/:pageSize', 'MasterDataController.getAll');

Route.get('/proc-type/:name', 'ProcTypeController.getByName');
Route.get('/proc-type', 'ProcTypeController.index');

Route.get("/user", "UserController.index");
Route.get("/user/:id", "UserController.get");

Route.get("/processedFile", "ProcessedFileController.get");
Route.post("/processedFile", "ProcessedFileController.store");

Route.get("/product", "ProductController.index");
Route.put("/product", "ProductController.updateCorrespondence");
Route.get(
  "/product/:companyA/:companyB",
  "ProductController.getCorrespondence"
);

Route.get("/company", "CompanyController.index");

Route.get("/process", "ProcessController.get");
Route.post("/process", "ProcessController.store");

Route.get('/company', 'CompanyController.index');

Route.get('/log', 'LogController.index');
Route.get('/log/byId/:id', 'LogController.getById');
Route.get('/log/byState/:state', 'LogController.getByState');
Route.get('/log/byProcId/:process_id', 'LogController.getByProcId');
Route.get('/log/byDate/:begin_date/:end_date', 'LogController.getByDate');
Route.post('/log', 'LogController.createLog');
Route.post('/log/update', 'LogController.updateState');

Route.get("/log/get", "LogController.get");
Route.post("/log/store", "LogController.store");

Route.get('/settings', "CompanyController.index");
Route.put('/settings', "CompanyController.editCompany");
