"""Django's command-line utility for administrative tasks."""
import os
import sys
import subprocess
import atexit
import signal

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

    celery_process = None

    if 'runserver' in sys.argv:
        celery_command = [
            'celery',
            '-A', 'backend.celery',
            'worker',
            '--loglevel=info',
            '--pool=solo'
        ]
        try:
            celery_process = subprocess.Popen(celery_command)
        except Exception as e:
            print(f"Failed to start Celery worker: {e}")

        def cleanup():
            if celery_process and celery_process.poll() is None:
                print("Terminating Celery worker...")
                celery_process.terminate()
                try:
                    celery_process.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    celery_process.kill()

        atexit.register(cleanup)

        def signal_handler(signum, frame):
            cleanup()
            sys.exit(0)

        signal.signal(signal.SIGINT, signal_handler)
        signal.signal(signal.SIGTERM, signal_handler)

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
