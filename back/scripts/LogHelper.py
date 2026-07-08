import logging
from pathlib import Path


class LogHelper:
    _initialized = False

    @classmethod
    def initialize(cls):
        if cls._initialized:
            return

        log_dir = Path("/app/logs")
        log_dir.mkdir(exist_ok=True)

        logging.basicConfig(
            filename=log_dir / "app.log",
            level=logging.INFO,
            format="%(asctime)s [%(levelname)s] %(message)s",
        )

        cls._initialized = True

    @classmethod
    def info(cls, message):
        cls.initialize()
        logging.info(message)

    @classmethod
    def warning(cls, message):
        cls.initialize()
        logging.warning(message)

    @classmethod
    def error(cls, message):
        cls.initialize()
        logging.error(message)