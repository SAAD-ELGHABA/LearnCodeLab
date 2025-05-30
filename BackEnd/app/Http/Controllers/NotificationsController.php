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
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'sender_id' => 'required|exists:users,id',
            'title' => 'required|string',
            'message' => 'required|string',
        ]);

        $notification = Notification::create($data);

        return response()->json($notification, 201);
    }
}
