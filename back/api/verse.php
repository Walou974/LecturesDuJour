<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$db = new PDO(
    "sqlite:../database/data.db"
);

$result = $db
    ->query("select * from Texts where Type = 'verse' Limit 1 ")
    ->fetch(PDO::FETCH_ASSOC);

if (isset($_GET["date"])) {
    $date = $_GET["date"];
    $sql = "select * from Texts where Type = 'verse' and TextDate = '$date'";
    $tmp = $db
        ->query($sql)
        ->fetch(PDO::FETCH_ASSOC);
    if ($tmp) {
        $result = $tmp;
    }
}

$json_results = json_encode($result);

echo $json_results;
