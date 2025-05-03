<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Save;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SaveController extends Controller
{
    public function index()
    {
        $user_id = Auth::id();
        $mySaves = Save::where('user_id', $user_id);
        return response()->json(['mySaves' => $mySaves]);
    }
    public function add(Request $request)
    {
        try {
            $itemId = $request->itemId;
            $userId = Auth::id();

            if (!$itemId) {
                return response()->json(['message' => "This collection can't be found!"], 500);
            }

            // Check if the save already exists
            $existingSave = Save::where('collection_id', $itemId)
                ->where('user_id', $userId)
                ->first();

            if ($existingSave) {
                // If exists, remove it (unsave)
                $existingSave->delete();
                $allsaves = Save::where('user_id', $userId)->get();
                return response()->json([
                    'mysaves' => $allsaves,
                    'message' => 'Collection has been removed from the save section'
                ]);
            } else {
                // If not exists, add it (save)
                $newSave = Save::create([
                    'collection_id' => $itemId,
                    'user_id' => $userId
                ]);
                $allsaves = Save::where('user_id', $userId)->get();
                return response()->json([
                    'mysaves' => $allsaves,
                    'message' => 'Collection has been added to the save section'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to toggle save',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
