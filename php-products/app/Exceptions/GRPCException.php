<?php

namespace App\Exceptions;


use Exception;
use Illuminate\Http\Response;

class GRPCException extends Exception
{
    public function __construct($responseStatus)
    {
        $message = $responseStatus->details;
        $code = Response::HTTP_BAD_REQUEST;

        parent::__construct($message, $code);
    }

    public function toJsonResponse()
    {
        return [
            'status' => $this->code,
            'message' => $this->message
        ];
    }
}
