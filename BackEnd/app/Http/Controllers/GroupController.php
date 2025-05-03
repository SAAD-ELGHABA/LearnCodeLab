<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GroupStagiaire;
use App\Models\Group;
class GroupController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'groupName' => 'required|string|max:255',
            'selectedGroups' => 'array',
            'selectedGroups.*' => 'string|max:255',
            'forAllGroups' => 'boolean',
            'formateurId'=>'required'
        ]);
    
        try {
            // Convert group names to IDs using GroupStagiaire
            $selectedIds = [];
            if (!empty($validated['selectedGroups'])) {
                $selectedIds = GroupStagiaire::whereIn('name', $validated['selectedGroups'])
                    ->pluck('id')
                    ->toArray();
            }
    
            // Create the new Group
            $group = new Group();
            $group->groupName = $validated['groupName'];
            $group->forAllGroups = $validated['forAllGroups'] ?? false;
            $group->selectedGroups = json_encode($selectedIds); // Save as JSON string
            $group->formateurId = $validated['formateurId']; // Save as JSON string
            $group->save();
            $groups = Group::where('formateurId', $validated['formateurId'])->get();
            return response()->json([
                'message' => 'Group created successfully',
                'groups'=>$groups
            ], 201);
    
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create group',
                'details' => $e->getMessage()
            ], 500);
        }
    }
    
}
