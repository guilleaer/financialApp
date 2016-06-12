<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
require 'php/FincEntries.php';
require 'php/FincEntry.php';
require 'php/FincEntryMapper.php';
$config = include('php/settings.php');



$app = new \Slim\App(["settings" => $config]);
$container = $app->getContainer();

$container['logger'] = function($c) {
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler("./logs/app.log");
    $logger->pushHandler($file_handler);
    return $logger;
};

/*$container['db'] = function($c) {
    return $c
};*/

$container['fincEntryMapper'] = function ($container) {
  $fincEntryMapper = new FincEntryMapper($container);
  return $fincEntryMapper;
};

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO("pgsql:host=" . $db['host'] . ";dbname=" . $db['dbname'],
        $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};



// GET by id
$app->get('/index', function (Request $request, Response $response, $args) use ($app) {
  $body = $response->getBody();
  $fichero = file_get_contents(parse_url($_SERVER['PHP_SELF']) . '/../index.html', true);
  $body->write($fichero);
});

// GET by id
$app->get('/fincEntry/{id}', function (Request $request, Response $response, $args) use ($app) {
   $idToFind = $args['id'];
   $this->logger->addInfo("GET entry with id " . $idToFind);
   $fincEntry = $this->fincEntryMapper->findById($idToFind);
   $newResponse = $response->withJson($fincEntry->toJSON());
});

// REMOVE by id
$app->delete('/fincEntry/{id}', function (Request $request, Response $response, $args) use ($app) {
   $idToFind = $args['id'];
   $this->logger->addInfo("DELETE entry with id " . $idToFind);
   $fincEntry = $this->fincEntryMapper->removeById($idToFind);
   $newResponse = $response->withJson($fincEntry->toJSON());
});


// GET all
$app->get('/fincEntry', function (Request $request, Response $response, $args) use ($app) {
   $this->logger->addInfo("List all entries");
   $fincEntries = $this->fincEntryMapper->findAll();
   $newResponse = $response->withJson($fincEntries->toJSON());
});


// POST route
$app->post('/fincEntry', function (Request $request, Response $response, $args) use ($app) {
    $this->logger->addInfo("POST new fincEntry");
    $data = $request->getParsedBody();
    
    $id = uniqid();
    $amount = filter_var($data['amount'], FILTER_SANITIZE_STRING);
    $description = filter_var($data['description'], FILTER_SANITIZE_STRING);
    $currency = filter_var($data['currency'], FILTER_SANITIZE_STRING);
    $date = filter_var($data['date'], FILTER_SANITIZE_STRING);

    $obj = new FincEntry($id, $description, $amount, $currency, $date);
    $isOk = $this->fincEntryMapper->add($obj);
    if ($isOk) {
      $newResponse = $response->withHeader('Content-type', 'application/json');
      $body = $newResponse->getBody();
      $body->write(json_encode($obj->toJSON()));
    } else {
      //TODO return JSON error
    }
});

// PUT route
$app->put('/fincEntry/{id}', function (Request $request, Response $response, $args) use ($app) {
    $idToUpdate = $args['id'];
    $this->logger->addInfo("PUT fincEntry " . $idToUpdate);
    $data = $request->getParsedBody();
    
    $id = $idToUpdate;
    $amount = filter_var($data['amount'], FILTER_SANITIZE_STRING);
    $description = filter_var($data['description'], FILTER_SANITIZE_STRING);
    $currency = filter_var($data['currency'], FILTER_SANITIZE_STRING);
    $date = filter_var($data['date'], FILTER_SANITIZE_STRING);

    $obj = new FincEntry($id, $description, $amount, $currency, $date);
    $isOk = $this->fincEntryMapper->update($obj);
    if ($isOk) {
      $newResponse = $response->withHeader('Content-type', 'application/json');
      $body = $newResponse->getBody();
      $body->write(json_encode($obj->toJSON()));
    } else {
      //TODO return JSON error
    }
});

$app->run();