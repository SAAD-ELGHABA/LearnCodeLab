<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::get('/login', function () {
    return view('NotAuthorized');
})->name('login');

Route::get('sanctum-token',function(){
    return response()->json([
        'token'=>'test'
    ]);
});

Route::middleware(['admin'])->group(function () {
    Route::get('/index', [AdminController::class, 'index'])->name('admin.index');
    Route::post('/logout', [AdminController::class, 'logout'])->name('admin.logout');
});

Route::fallback(function () {
    return redirect()->route('login');
});
