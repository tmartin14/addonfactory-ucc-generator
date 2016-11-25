"""
Error Handling.
"""

from __future__ import absolute_import

__all__ = ['STATUS_CODES', 'RestError']


# HTTP status codes
STATUS_CODES = {
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    500: 'Internal Server Error',
}


class RestError(Exception):
    """
    REST Error.
    """

    def __init__(self, status, message):
        self.status = status
        self.reason = STATUS_CODES[status]
        self.message = message
        template = 'REST Error[{status}]: {reason} -- {message}'
        err_msg = template.format(
            status=self.status,
            reason=self.reason,
            message=self.message,
        )
        super(RestError, self).__init__(err_msg)
