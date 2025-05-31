<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Feedback;
use App\Models\Group;
use App\Models\Language;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AdminController extends Controller
{
    public function index()
    {
        $stagiaires = User::where('role', 'stagiaire')->get();
        $formateurs = User::where('role', 'formateur')->get();
        $collections = Collection::all();
        $groups = Group::all();
        $feedbacks = Feedback::orderBy('created_at', 'desc')->take(10)
            ->get();
        // dd($feedbacks->pluck('user'));
        return view('index', compact('stagiaires', 'formateurs', 'collections', 'groups', 'feedbacks'));
    }
    public function logout()
    {
        if (Auth::check() && Auth::user()->role === 'admin') {
            Auth::logout();
            Cookie::queue(Cookie::forget('admin_token'));
            return redirect()->route('login');
        }
    }

    public function collections()
    {
        $collections = Collection::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        return view('pages.collections.index', compact('collections'));
    }
    public function destroyCollection($id)
    {
        $collection = Collection::findOrFail($id);
        $collection->delete();
        return redirect()->back()->with('success', 'Collection deleted successfully!');
    }
    public function groups()
    {
        $groups = Group::with('stagiaires')->get();
        return view('pages.groups.index', compact('groups'));
    }
    public function languages()
    {
        $languages = Language::all();
        return view('pages.languages.index', compact('languages'));
    }
    public function storeLanguage(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required',
        ]);

        $language = Language::updateOrCreate(
            ['name' => $request->name],
            ['description' => $request->description]
        );

        return redirect()->back()->with('success', 'Language saved successfully!');
    }
}
