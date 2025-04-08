<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\Request;
use Error;

class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $collections = Collection::with('user')->get()->map(function ($collection) {
            $collection->code = base64_decode($collection->code);
            return $collection;
        });
        return response()->json([
            'collections' => $collections
        ]);
    }
    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string',
                'question' => 'required|string',
                'description' => 'required|string',
                'code' => 'required',
                'user_id' => 'required',
                'language' => 'required|string',
            ]);

            // Create new collection
            $data = $request->all();
            $data['code'] = base64_encode($data['code']);
            $collection = Collection::create($data);

            return response()->json([
                'test' => 'done'
            ]);
            return response()->json($collection, 201); // Return created collection
            //code...
        } catch (Error $error) {
            return response()->json([
                'error' => $error,
            ]);
        }
    }

    public function show($id)
    {
        $collection = Collection::findOrFail($id);
        return response()->json($collection);
    }
}
