<?php
require 'vendor/autoload.php';
require 'vendor/mustache/mustache/src/Mustache/Autoloader.php';
include('config.php');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


use Src\User\Exam;

Mustache_Autoloader::register();
$mustache = new Mustache_Engine;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$examcontent = new Exam($_SERVER, $_POST, $config, $mustache);
echo $examcontent->processRequest();
exit();