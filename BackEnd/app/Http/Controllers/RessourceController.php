<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ressource;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RessourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $files = Ressource::all();
        return view('pages.resources.index', compact('files'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|file|mimes:jpg,jpeg,png,pdf,doc,docx,ppt,pptx,txt'
            ]);

            $filePath = $request->file('file')->store('uploads', 'public');
            $ressource = Ressource::create([
                'file' => $filePath,
                'type' => $request->file('file')->getClientOriginalExtension(),
                'title' => $request->file('file')->getClientOriginalName()
            ]);
            if (!$ressource) {
                return redirect()->back()->with('error', 'something wrong !');
            }
            return redirect()->back()->with('success', 'File uploaded successfully.');
        } catch (Error $error) {
            return redirect()->back()->with('error', $error);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $ressource = Ressource::findOrFail($id);
            if (Storage::disk('public')->exists($ressource->file)) {
                Storage::disk('public')->delete($ressource->file);
            }
            $ressource->delete();
            return redirect()->back()->with('success', 'File deleted successfully.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Error deleting file: ' . $th->getMessage());
        }
    }
}
