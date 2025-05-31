<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function updateProfile(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }
            if (isset($request->firstName)) {
                $user->firstName = $request->firstName;
            }
            if (isset($request->lastName)) {
                $user->lastName = $request->lastName;
            }
            if (isset($request->email)) {
                $user->email = $request->email;
            }
            if (isset($request->image)) {
                if ($user->image) {
                    $oldImagePath = str_replace('127.0.0.1:8000/', '', $user->image);
                    $oldImageFullPath = storage_path('app/' . $oldImagePath);
                    if (file_exists($oldImageFullPath)) {
                        @unlink($oldImageFullPath);
                    }
                }
                $imagePath = $request->file('image')->store('UserImages', 'public');
                $user->image = 'http://127.0.0.1:8000/storage/' . $imagePath;
            }
            $user->save();
            $user->groupstagiaire;
            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => $user
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'An error occurred while updating the profile.',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
