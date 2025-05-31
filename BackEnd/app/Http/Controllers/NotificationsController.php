<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationsController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();
            $myNotifications = Notification::where('user_id', $user->id)->get();
            return response()->json([
                'myNotifications' => $myNotifications
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Failed to make the activity!',
                'details' => $th->getMessage()
            ], 500);
        }
    }
    public function store(Request $request)
    {
        try {
            $notification = Notification::create($request->all());

            return response()->json($notification, 201);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Failed to make the activity!',
                'details' => $th->getMessage()
            ], 500);
        }
    }
}
