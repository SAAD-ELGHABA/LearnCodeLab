<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Group;
use App\Models\Language;
use App\Models\Notification;
use App\Models\Ressource;
use App\Models\Save;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GlobalSearchController extends Controller
{
    public function FetchData()
    {
        try {
            $user = Auth::user();
            $collections = Collection::with(['feedback', 'user', 'rates'])->get()->map(function ($collection) {
                $collection->code = base64_decode($collection->code);
                return $collection;
            });

            $collections->transform(function ($collection) {
                $collection->upvotes = $collection->rates->where('type', 'up')->count();
                $collection->downvotes = $collection->rates->where('type', 'down')->count();
                return $collection;
            });
            $languages = Language::all();
            $resources = Ressource::all();
            $myNotifications = Notification::where('user_id', $user->id)->get();
            $groupId = $user->groupstagiaire_id;
            $groups = Group::all();
            $filteredGroups = $groups->filter(function ($group) use ($groupId) {
                $selectedGroups = json_decode($group->selectedGroups, true);
                return $group->forAllGroups || in_array($groupId, $selectedGroups);
            })->values();
            return response()->json([
                'user' => $user,
                'collections' => $collections,
                'languages' => $languages,
                'resources' => $resources,
                'myNotifications' => $myNotifications,
                'Groups' => $user->role === 'stagiaire' ? $filteredGroups : $groups
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Failed to make the activity!',
                'details' => $th->getMessage()
            ], 500);
        }
    }
}
