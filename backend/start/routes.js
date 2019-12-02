
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
const Route = use('Route');

Route.get('/', () => ({ greeting: 'Hello world in JSON' }));
Route.get('/test', 'TestController.index');
Route.get('/master-data/:companyId/:page/:pageSize', 'MasterDataController.getAll')

Route.get('/user', 'UserController.index');
Route.get('/user/:id', 'UserController.get');

Route.get("/processedFile", "ProcessedFileController.get");
Route.post("/processedFile", "ProcessedFileController.store");

Route.get('/product', 'ProductController.index');
Route.get('/product/:companyA/:companyB', 'ProductController.getCorrespondence');

Route.get('/company', 'CompanyController.index');
