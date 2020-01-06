<?php

namespace App\Services\User;


use Illuminate\Http\Request;

class UserService implements UserServiceInterface
{
    public function getId()
    {
        return app(Request::class)->header('X-USER-ID');
    }
}
