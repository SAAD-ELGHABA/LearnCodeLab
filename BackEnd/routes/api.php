<?php

use App\Http\Controllers\AuthentificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthentificationController::class, 'register']);
Route::post('/login', [AuthentificationController::class, 'login'])->name('login');
Route::post('/logout', [AuthentificationController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/forgot-password', [AuthentificationController::class, 'ForgetPassword']);

Route::post('/reset-password', [AuthentificationController::class, 'ResetPassword'])->name('password.reset');





