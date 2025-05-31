<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Redirect;
use Laravel\Sanctum\PersonalAccessToken;

class TokenController extends Controller
{
    public function validToken(Request $request)
    {
        $token = $request->query('token');
        Cookie::queue(cookie('admin_token', $request->query('token'), 1440, '/', null, false, true));
        if (!$token) {
            return Redirect::to('/login');
        }
        $tokenRecord = PersonalAccessToken::findToken($token);
        if ($tokenRecord) {
            $user = $tokenRecord->tokenable;
            Auth::login($user);
            if ($user->role === 'admin') {
                return Redirect::to('/index')->withCookie(cookie('admin_token', $token, 1440, '/', null, false, true));
            }
        } else {
            return redirect()->route('login');
        }
    }
}
