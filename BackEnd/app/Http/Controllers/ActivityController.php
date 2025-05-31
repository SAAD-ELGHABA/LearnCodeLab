<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\activityGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function createActivity(Request $request)
    {
        try {
            $user = Auth::user();

            $data = json_decode($request->input('data'), true);
            $uploadedFiles = $request->file('files');

            $storedFiles = [];

            if ($uploadedFiles && is_array($uploadedFiles)) {
                foreach ($uploadedFiles as $file) {
                    if ($file instanceof \Illuminate\Http\UploadedFile) {
                        $path = $file->store('activities', 'public');
                        $storedFiles[] = [
                            'url' => asset("storage/" . $path),
                            'name' => $file->getClientOriginalName(),
                        ];
                    }
                }
            }

            if (!empty($storedFiles)) {
                $data['files'] = $storedFiles;
            }

            $activity = activityGroup::create([
                'description' => $request->input('description'),
                'group_id' => $request->input('group_id'),
                'data' => json_encode($data),
                'user_id' => $user->id,
            ]);

            return response()->json([
                'message' => 'Activity created successfully',
                'activity' => $activity,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Failed to make the activity!',
                'details' => $th->getMessage(),
            ], 500);
        }
    }
}
