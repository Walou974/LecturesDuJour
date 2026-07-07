<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$db = new PDO(
    "sqlite:../database/data.db"
);

$date = date("Y-m-d");

# provide all resutts for today
$result = $db
    ->query("select * from Texts where TextDate = '$date' and Type <> 'verse'")
    ->fetchAll(PDO::FETCH_ASSOC);

if (isset($_GET["date"])) {
    $date = $_GET["date"];
    $sql = "select * from Texts where TextDate = '$date' and Type <> 'verse'";
    $tmp = $db
        ->query($sql)
        ->fetchAll(PDO::FETCH_ASSOC);
    if ($tmp) {
        $result = $tmp;
    }
}

$json_results = json_encode($result);

echo $json_results;
