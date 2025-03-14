<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Error;
use GuzzleHttp\Psr7\Request as Psr7Request;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Request as HttpFoundationRequest;
use Illuminate\Support\Str;
use function Laravel\Prompts\error;

class AuthentificationController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validation = $request->validate([
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:3',
                'group' => 'required',
            ]);
            if ($validation) {
                $user = User::create($validation);
                if ($user) {
                    return response()->json([
                        'message' => 'success',
                    ]);
                }
            }
        } catch (Error $error) {
            return response()->json([
                'message' => '$error',
            ]);
        }
    }

    public function login(Request $request)
    {
        $validation = $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);
        $credentials = $request->only('email', 'password');
        if ($validation && Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
            // Session::put('auth_token', $token);
            if ($request->input('remember')) {
                return response()->json([
                    'user' => $user,
                    'token' => $token
                ])->cookie('remember_token', $token, 60 * 24 * 7);
            }
            return response()->json([
                'user' => $user,
                'token' => $token
            ]);
        } else {
            return response()->json([
                'data' => 'invalid credentials !'
            ]);
        }
    }

    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->tokens()->delete();
            return response()->json([
                'message' => 'logged out successfully'
            ])->withCookie(cookie('XSRF-TOKEN', null, -1))->withCookie(cookie('remember_token', null, -1));
        } else {
            return response()->json([
                'message' => 'you are not authenticated'
            ]);
        }
    }

    public function ForgetPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->email)->first();
        $email = $request->input('email');
        if ($user) {
            $user->notify(new ResetPasswordNotification($user));
        }
        return response()->json([
            'message' => "we sent an email to $email"
        ]);
    }

    public function ResetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PasswordReset
            ? response()->json([
                'message' => trans($status),
                'success' => 'yes',
            ])
            : response()->json([
                'message' => trans($status)
            ], 400);
    }
}
