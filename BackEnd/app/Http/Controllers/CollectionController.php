<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Error;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $collections = Collection::with(['feedback', 'user', 'rates'])->get()->map(function ($collection) {
            $collection->code = base64_decode($collection->code);
            return $collection;
        });

        $collections->transform(function ($collection) {
            $collection->upvotes = $collection->rates->where('type', 'up')->count();
            $collection->downvotes = $collection->rates->where('type', 'down')->count();
            return $collection;
        });

        $collections = $collections->sortByDesc(function ($collection) {
            return [
                $collection->rates->count(),
                $collection->upvotes,
                strtotime($collection->created_at),
                -$collection->downvotes
            ];
        })->values();

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

            $data = $request->all();
            $data['code'] = base64_encode($data['code']);

            $slug = Str::slug($data['title']);

            while (Collection::where('slug', $slug)->exists()) {
                $slug = Str::slug($data['title'] . '-' . Str::random(5));
            }

            $data['slug'] = $slug;

            $collection = Collection::create($data);

            return response()->json([
                'test' => 'done',
                'collection' => $collection,
            ], 201);
        } catch (Error $error) {
            return response()->json([
                'error' => $error,
            ], 500);
        }
    }

    public function show($id)
    {
        $collection = Collection::findOrFail($id);
        return response()->json($collection);
    }

    public function handleFeedback(Request $request)
    {
        try {
            $validated = $request->validate([
                'type' => 'required|in:code,commentaire',
                'collection_id' => 'required|exists:collections,id',
                'content' => 'required|string|min:3',
                'language' => 'required'
            ]);

            $data = $validated;
            $data['user_id'] = Auth::id();

            if ($data['type'] === 'code') {
                $data['content'] = base64_encode($data['content']);
            }

            $feedback = Feedback::create($data);
            $feedbacks = Feedback::where('collection_id', $data['collection_id'])
                ->with('user')
                ->latest()
                ->get();

            foreach ($feedbacks as $f) {
                if ($f->type === 'code') {
                    $f->content = base64_decode($f->content);
                }
            }
            return response()->json([
                'message' => 'Feedback submitted successfully!',
                'feedback' => $feedback,
                'feedbacks' => $feedbacks
            ], 201);
        } catch (\Exception $e) {
            Log::error('Feedback Submission Error: ' . $e->getMessage());

            return response()->json([
                'message' => 'Something went wrong while submitting feedback.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function loadFeedbacks($idCollection)
    {
        try {
            $feedbacks = Feedback::where('collection_id', $idCollection)
                ->with('user')
                ->latest()
                ->get();

            foreach ($feedbacks as $feedback) {
                if ($feedback->type === 'code') {
                    $feedback->content = base64_decode($feedback->content);
                }
            }
            return response()->json([
                'success' => true,
                'feedbacks' => $feedbacks
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load feedbacks.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
