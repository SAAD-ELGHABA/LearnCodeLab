<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Error;
use Illuminate\Http\Request;

class FormateurController extends Controller
{
    public function index()
    {
        $formateurs = User::where(['role' => 'formateur'])->get();
        return view('pages.formateurs.index', compact('formateurs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('pages.formateurs.create');
    }

    public function store(Request $request)
    {
        try {
            $validation = $request->validate([
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
            ]);
            if (!$validation) {
                return redirect()->back()->with('error', 'Please fill all the fields!');
            }
            $image = $request->file('formateur_image')->store('UserImages', 'public');

            $user = User::create([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'groupstagiaire_id' => 0,
                'role' => 'formateur',
                'email_verified_at' => now(),
                'image' => "http://127.0.0.1:8000/storage/".$image,
            ]);

            if ($user) {
                return redirect()->route('formateurs.index')->with('success', 'Formateur has been added successfully!');
            }
        } catch (Error $error) {
            return redirect()->back()->with('error', $error->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $formateur = User::findOrFail($id);
        return view('pages.formateurs.show', compact('formateur'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $formateur = User::findOrFail($id);
        return view('pages.formateurs.edit', compact('formateur'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $formateur = User::findOrFail($id);
            $validation = $request->validate([
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required',
                'group' => 'required',
                'password' => 'required|min:6',
            ]);
            if ($request->hasFile('formateur_image')) {
                if ($formateur->image) {
                    $oldImagePath = storage_path('app/' . $formateur->image);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }
                $image = $request->file('formateur_image')->store('UsersImages');
            } else {
                $image = $formateur->image;
            }

            $formateur->update([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'group' => $request->group,
                'password' => bcrypt($request->password),
                'image' => $image,
            ]);
            return redirect()->route('formateurs.index')->with('success', $formateur->firstName . " " . $formateur->lastName . ' has been updated successfully!');
        } catch (Error $error) {
            return redirect()->back()->with('error', $error->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $formateur = User::findOrFail($id);
        $formateur->delete();
        return redirect()->back()->with('deletingformateur', $formateur->firstName . " " . $formateur->lastName . " has been deleted successfully!");
    }
}
