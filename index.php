<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
require 'php/FincEntries.php';
require 'php/FincEntry.php';
require 'php/FincEntryMapper.php';
$config = include('php/settings.php');
$fincEntryDb = include('php/database.php');

$app = new \Slim\App(["settings" => $config]);
$container = $app->getContainer();

$container['logger'] = function($c) {
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler("./logs/app.log");
    $logger->pushHandler($file_handler);
    return $logger;
};

$container['db'] = function() {
    $fincEntryDb = include('php/database.php');
    return $fincEntryDb;
};

$container['fincEntryMapper'] = function ($container) {
	$fincEntryMapper = new FincEntryMapper($container->get('db'));
    return $fincEntryMapper;
};

// $container['db'] = function ($c) {
//     $db = $c['settings']['db'];
//     $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'],
//         $db['user'], $db['pass']);
//     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//     $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
//     return $pdo;
// };



// GET by id
$app->get('/fincEntry/{id}', function (Request $request, Response $response, $args) use ($app) {
   $idToFind = $args['id'];
   $this->logger->addInfo("GET entry with id " . $idToFind);
  
   $fincEntry = $this->fincEntryMapper->findById($idToFind);
   $newResponse = $response->withJson($fincEntry->toJSON());
});


// GET all
$app->get('/fincEntry', function (Request $request, Response $response, $args) use ($app) {
   $this->logger->addInfo("List all entries");
   $fincEntries = $this->fincEntryMapper->findAll();
   $newResponse = $response->withJson($fincEntries->toJSON());
});


// PUT route
$app->put('/fincEntry/:id', function () use ($app) {
    
    $request = (array) json_decode($app->request()->getBody());
    
    // use $request['id'] to update database based on id and create response...
     
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode($request);
     
});

$app->run();