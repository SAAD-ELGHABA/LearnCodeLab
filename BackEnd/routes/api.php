<?php

use App\Http\Controllers\AuthentificationController;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthentificationController::class, 'register']);
Route::post('/login', [AuthentificationController::class, 'login'])->name('login');
Route::post('/logout', [AuthentificationController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/forgot-password', [AuthentificationController::class, 'ForgetPassword']);

Route::post('/reset-password', [AuthentificationController::class, 'ResetPassword'])->name('password.reset');




Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json([
        'message'=>'please check your email'
    ]);
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');


Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    if (!Auth::check()) {
        return response()->json(['message' => 'Unauthenticated !'], 401);
    }
    Log::info('Verifying email for ID: ' . $request->id);
    Log::info('Hash: ' . $request->hash);
    Log::info('Signature: ' . $request->query('signature'));
    $request->fulfill();
    return response()->json(['message' => 'Email verified successfully!']);
})->middleware(['auth:sanctum'])->name('verification.verify');




