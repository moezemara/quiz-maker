<?php
//error_reporting(0);
include('../config.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$url = $config['API_LOGIN'];
$curl = curl_init($url);

$postdata = json_encode(array(
  "username" => $_POST['username'],
  "password" => $_POST['password'],
  "g-recaptcha-response" => $_POST['g-recaptcha-response']
));

curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
  "accept:application/json",
  "Content-Type:application/json",
  "Access-Control-Allow-Origin:*"
));

curl_setopt($curl, CURLOPT_POSTFIELDS, $postdata);

curl_setopt($curl, CURLOPT_TIMEOUT, 25);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $results = curl_exec($curl);
  curl_close($curl);

  if (!$results){
    $response = array('success' => 0, 'message' => 'Connection time out');
    return $response;
  }

  $json_array = json_decode($results);

  if ($json_array->success){
    session_start();
    $_SESSION['Authorization']='Bearer '.$json_array->message;
    echo json_encode(array('success' => 1));
  }else{
    echo json_encode($json_array);
  }  
}

exit();

?>
