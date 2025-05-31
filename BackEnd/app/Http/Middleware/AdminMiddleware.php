<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Laravel\Sanctum\PersonalAccessToken;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $token = $request->cookie('admin_token');
            
            if (!$token) {
                return redirect('/login');
            }
            $tokenRecord = PersonalAccessToken::findToken($token);
            if ($tokenRecord) {
                $user = $tokenRecord->tokenable;
                Auth::login($user);
                if ($user->role === 'admin') {
                    return $next($request);
                }
            } else {
                return redirect()->route('login');
            }
        } catch (Error $error) {
            return redirect()->route('login');
        }
    }
}
