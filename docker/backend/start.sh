#!/bin/sh

php /app/database/init-db.php

python3 /app/scripts/main.py init

CRON_JOB="0 8 * * * python3 /app/scripts/main.py"

if ! crontab -l 2>/dev/null | grep -Fq "$CRON_JOB"; then
    (
        crontab -l 2>/dev/null
        echo "$CRON_JOB"
    ) | crontab -; echo "Crontab installed"
    else echo "Crontab already installed"
fi

php -S 0.0.0.0:8000 -t /app/api
