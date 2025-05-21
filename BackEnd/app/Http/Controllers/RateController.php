<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Rate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RateController extends Controller
{
    public function rateCollection(Request $request, $id)
    {
        try {
            $typeRate = $request->type;
            $userId = Auth::id();

            $collection = Collection::find($id);
            if (!$collection) {
                return response()->json([
                    'message' => 'No collection found with ID: ' . $id
                ], 404);
            }

            $existingRate = Rate::where('collection_id', $id)
                ->where('user_id', $userId)
                ->first();

            if ($existingRate) {
                if ($existingRate->type === $typeRate) {
                    $existingRate->delete();
                } else {
                    $existingRate->type = $typeRate;
                    $existingRate->save();
                }
            } else {
                Rate::create([
                    'collection_id' => $id,
                    'user_id' => $userId,
                    'type' => $typeRate,
                ]);
            }

            $collections = Collection::with(['feedback','rates', 'user'])->get();

            $collections->transform(function ($collection) {
                $collection->upvotes = $collection->rates->where('type', 'up')->count();
                $collection->downvotes = $collection->rates->where('type', 'down')->count();
                return $collection;
            });
            $collections = $collections->sortByDesc(function ($collection) {
                return [
                    $collection->upvotes,
                    strtotime($collection->created_at),
                    -$collection->downvotes
                ];
            })->values();
            return response()->json([
                'message' => 'Rating updated successfully',
                'collections' => $collections
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Failed to rate collection',
                'details' => $th->getMessage()
            ], 500);
        }
    }
}
