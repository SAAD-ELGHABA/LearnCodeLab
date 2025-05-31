<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GroupStagiaire;
use App\Models\Group;
use App\Events\NotificationSent;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class GroupController extends Controller
{

    public function store(Request $request)
    {
        $validated = $request->validate([
            'groupName' => 'required|string|max:255',
            'selectedGroups' => 'array',
            'selectedGroups.*' => 'string|max:255',
            'forAllGroups' => 'boolean',
            'formateurId' => 'required'
        ]);

        try {
            $selectedIds = [];
            if (!empty($validated['selectedGroups'])) {
                $selectedIds = GroupStagiaire::whereIn('name', $validated['selectedGroups'])
                    ->pluck('id')
                    ->toArray();
            }

            $group = new Group();
            $group->groupName = $validated['groupName'];
            $group->forAllGroups = $validated['forAllGroups'] ?? false;
            $group->selectedGroups = json_encode($selectedIds);
            $group->formateurId = $validated['formateurId'];
            $group->access_key = (string) Str::uuid();
            $group->save();

            $stagiaires = $group->forAllGroups
                ? User::all()
                : User::whereIn('groupstagiaire_id', $selectedIds)->get();

            foreach ($stagiaires as $student) {
                Notification::create([
                    'sender_id' => $group->formateurId,
                    'user_id' => $student->id,
                    'title' => 'New Group Created',
                    'message' => 'A new group "' . $group->groupName . '" has been created.',
                    'data' => json_encode(['url' => '/groups'])
                ]);
            }

            $formateur = User::find($validated['formateurId']);

            Http::post("http://localhost:3001/api/notify", [
                'sender_id' => $group->formateurId,
                'userIds' => $stagiaires->pluck('id')->toArray(),
                'title' => 'New Group Created',
                'message' => 'You have been added to the group: "' . $group->groupName,
                'data' => json_encode(['url' => '/group' . '/' . $group->groupName . '/' . $group->access_key])
            ]);

            return response()->json([
                'message' => 'Group created successfully',
                'groups' => Group::where('formateurId', $validated['formateurId'])->get()
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create group',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function checkPermission($access_key)
    {
        try {
            $user_id = Auth::user()->id;
            $group = Group::where('access_key', $access_key)
                ->with(['activity_groups', 'formateur'])
                ->first();
            $formateur = User::where('id', $group->formateurId)->first();
            if (!$group) {
                return response()->json([
                    'valid' => false,
                    'message' => 'Invalid access key'
                ], 404);
            }
            if ($group->users()->where('user_id', $user_id)->exists()) {
                return response()->json([
                    'valid' => true,
                    'message' => 'User already a member',
                    'group' => $group->load('users'),
                    'formateur' => $formateur,
                    'members_count' => $group->users()->count(),
                    'member_ids' => $group->users()->pluck('users.id')
                ]);
            }

            $group->users()->attach($user_id);
            $group->Members = $group->users()->count();
            $group->save();

            return response()->json([
                'valid' => true,
                'group' => $group->load('users'),
                'members_count' => $group->users()->count(),
                'member_ids' => $group->users()->pluck('users.id')
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Failed to join group',
                'details' => $th->getMessage()
            ], 500);
        }
    }
}
