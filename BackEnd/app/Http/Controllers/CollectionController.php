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
    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string',
                'question' => 'required|string',
                'description' => 'required|string',
                'code' => 'required',
                // 'group' => 'required|string',
                'language' => 'required|string',
            ]);
            
            // Create new collection
            $collection = Collection::create($request->all());
           
            return response()->json([
                'test'=>'done'
            ]);
            return response()->json($collection, 201); // Return created collection
            //code...
        } catch (Error $error) {
            return response()->json([
                'error'=>$error,
            ]);
        }
    }

    public function show($id)
    {
        $collection = Collection::findOrFail($id);
        return response()->json($collection);
    }
}
