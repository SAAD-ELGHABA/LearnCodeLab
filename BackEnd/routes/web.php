<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (session('user')) {
        return response()->json([
            'success' => 'yes'
        ]);
    } else {
        return response()->json([
            'success' => 'no'
        ]);
    }
});


Route::get('/', function () {
    $user = session('user');
    return view('welcome',compact('user'));
});
