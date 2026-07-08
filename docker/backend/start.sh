#!/bin/sh

php /app/database/init-db.php

python3 /app/scripts/main.py

php -S 0.0.0.0:8000 -t /app/api
