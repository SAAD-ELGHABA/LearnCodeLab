<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GroupStagiaire;
use App\Models\User;
use Error;
use Illuminate\Http\Request;
use Masmerise\Toaster\Toaster;

class stagiairesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stagiaires = User::where(['role' => 'stagiaire'])
            ->with('groupstagiaire')
            ->get();
        return view('pages.stagiaires.index', compact('stagiaires'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $groupsStagiaires = GroupStagiaire::all();
        return view('pages.stagiaires.create', compact('groupsStagiaires'));
    }

    public function store(Request $request)
    {
        try {
            $validation = $request->validate([
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
                'group' => 'required',
            ]);
            if (!$validation) {
                return redirect()->back()->with('error', 'Please fill all the fields!');
            }
            $image = $request->file('image')->store('UserImages', 'public');

            $user = User::create([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'groupstagiaire_id' => $request->group,
                'role' => 'stagiaire',
                'email_verified_at' => now(),
                'image' => $image,
            ]);

            if ($user) {
                return redirect()->route('stagiaires.index')->with('success', 'Stagiaire has been added successfully!');
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
        $stagiaire = User::findOrFail($id);
        return view('pages.stagiaires.show', compact('stagiaire'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $stagiaire = User::findOrFail($id);
        return view('pages.stagiaires.edit', compact('stagiaire'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $stagiaire = User::findOrFail($id);
            $validation = $request->validate([
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required',
                'group' => 'required',
                'password' => 'required|min:6',
            ]);
            if ($request->hasFile('stagiaire_image')) {
                if ($stagiaire->image) {
                    $oldImagePath = storage_path('app/' . $stagiaire->image);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }
                $image = $request->file('stagiaire_image')->store('UsersImages');
            } else {
                $image = $stagiaire->image;
            }

            $stagiaire->update([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'group' => $request->group,
                'password' => bcrypt($request->password),
                'image' => $image,
            ]);
            return redirect()->route('stagiaires.index')->with('success', $stagiaire->firstName . " " . $stagiaire->lastName . ' has been updated successfully!');
        } catch (Error $error) {
            return redirect()->back()->with('error', $error->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $stagiaire = User::findOrFail($id);
        $stagiaire->delete();
        return redirect()->back()->with('deletingStagiaire', $stagiaire->firstName . " " . $stagiaire->lastName . " has been deleted successfully!");
    }
}
