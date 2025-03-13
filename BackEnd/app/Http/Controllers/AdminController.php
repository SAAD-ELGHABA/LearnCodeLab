<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function index()
    {
        return view('index');
    }
    public function logout(){
        if(Auth::check() && Auth::user()->role === 'admin'){
            Auth::logout();
            return redirect()->route('login');
        }
    }
}
