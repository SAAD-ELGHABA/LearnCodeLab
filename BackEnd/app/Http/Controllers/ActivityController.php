<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validate request
            $validated = $request->validate([
                'group_id' => 'required|exists:groups,id',
                'title' => 'required|string|max:255',
                'duration' => 'required',
                'data' => 'required|array',
                'data.*' => 'file|mimes:pdf,jpg,jpeg,png|max:20480' // 20MB max per file
            ]);

            $filePaths = [];

            // Store each file
            foreach ($request->file('data') as $file) {
                $path = $file->store('activities', 'public'); // stores in storage/app/public/activities
                $filePaths[] = $path;
            }

            // Create activity
            $activity = Activity::create([
                'group_id' => $validated['group_id'],
                'title' => $validated['title'],
                'duration' => $validated['duration'],
                'data' => json_encode($filePaths),
            ]);

            return response()->json([
                'message' => 'Activity created successfully!',
                'activity' => $activity
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Failed to make the activity!',
                'details' => $th->getMessage()
            ], 500);
        }
    }
}
