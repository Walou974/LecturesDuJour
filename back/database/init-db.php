<?php

$dbFile = "/app/database/data.db";
$schemaFile = "/app/database/schema.sql";

echo "DB: $dbFile\n";
echo "SCHEMA: $schemaFile\n";

$db = new PDO("sqlite:$dbFile");

$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$schema = file_get_contents($schemaFile);

try {
    $db->exec($schema);
    echo "Schema exécuté\n";
} catch (Exception $e) {
    echo "ERREUR : " . $e->getMessage() . "\n";
}

# $schema = file_get_contents($schemaFile);

echo "Schema loaded: " . strlen($schema) . " chars\n";

# $db->exec($schema);

echo "Done\n";
