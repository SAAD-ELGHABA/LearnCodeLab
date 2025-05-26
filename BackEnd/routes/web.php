<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\RessourceController;
use App\Http\Controllers\stagiairesController;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/login', function () {
    return view('NotAuthorized');
})->name('login');

Route::get('sanctum-token', function () {
    return response()->json([
        'token' => 'test'
    ]);
});

Route::get('/set-token', [TokenController::class, 'validToken']);

Route::middleware(['admin'])->group(function () {
    Route::get('/index', [AdminController::class, 'index'])->name('admin.index');
    Route::post('/logout', [AdminController::class, 'logout'])->name('admin.logout');
    Route::resource('stagiaires', stagiairesController::class);
    Route::resource('formateurs', FormateurController::class);
    Route::resource('resources', RessourceController::class);
    Route::get('/collections', [AdminController::class, 'collections'])->name('admin.collections');
    Route::delete('/delete-collection/{id}', [AdminController::class, 'destroyCollection'])->name('collections.delete');
    Route::get('/groups',[AdminController::class, 'groups'])->name('admin.groups');
    Route::get('/languages',[AdminController::class, 'languages'])->name('admin.languages');
});

Route::fallback(function () {
    return redirect()->route('login');
});


Route::get('/get-image/{filename}', function ($filename) {
    $path = "UsersImages/$filename";

    if (!Storage::exists($path)) {
        abort(404);
    }
    return response(Storage::get($path), 200)->header("Content-Type", Storage::mimeType($path));
})->name('get-image');
