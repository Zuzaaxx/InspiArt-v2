from rest_framework.views import exception_handler
import logging

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    logger.error(f"Exception occurred: {exc} in {context.get('view')}")

    if response is not None:
        response.data['status'] = response.status_code
        response.data['error'] = str(exc)

    return response
