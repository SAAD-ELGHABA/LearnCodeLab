<?php

use App\Http\Controllers\AuthentificationController;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\GroupController;
use App\Models\GroupStagiaire;
use App\Models\Group;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware(['auth:sanctum', 'verified']);


Route::post('/register', [AuthentificationController::class, 'register']);
Route::post('/login', [AuthentificationController::class, 'login'])->name('login');
Route::post('/logout', [AuthentificationController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/forgot-password', [AuthentificationController::class, 'ForgetPassword']);
Route::post('/reset-password', [AuthentificationController::class, 'ResetPassword'])->name('password.reset');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json([
        'message' => 'please check your email'
    ]);
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');


Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    if (!Auth::check()) {
        return response()->json(['message' => 'Unauthenticated !'], 401);
    }
    Log::info('Verifying email for ID: ' . $request->id);
    Log::info('Hash: ' . $request->hash);
    Log::info('Signature: ' . $request->query('signature'));
    $request->fulfill();
    return response()->json(['message' => 'Email verified successfully!']);
})->middleware(['auth:sanctum'])->name('verification.verify');


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('collections', [CollectionController::class, 'store']);
    Route::get('collections/{id}', [CollectionController::class, 'show']);
    Route::get('collections', [CollectionController::class, 'index']);
    Route::post('feedback',[CollectionController::class,'handleFeedback']);
    Route::get('/feedbacks-collection/{idCollection}',[CollectionController::class,'loadFeedbacks']);
});


Route::get('/groups-stagiaire',function(){
    $GroupsStagiaire = GroupStagiaire::all();
    return response()->json([
        'GroupsStagiaire'=>$GroupsStagiaire,
    ]);
});

Route::post('/create-group',[GroupController::class,'store']);

Route::get('/get-group/{id}',function($id){
    $user = User::find($id);
    // $groups = [];
    if($user->role === 'stagiaire'){
        $groupId = $user->group; 
        $groups = Group::all();
        $filteredGroups = $groups->filter(function ($group) use ($groupId) {
            $selectedGroups = json_decode($group->selectedGroups, true);
            return $group->forAllGroups || in_array($groupId, $selectedGroups);
        })->values();
        return response()->json([
            'groups' => $filteredGroups
        ]);
        
        
    }elseif($user->role === 'formateur'){
        $groups = Group::where('formateurId', $user->id)->get();
    }
    return response()->json([
        'groups'=>$groups
    ], 201);
});

Route::middleware(['formateur'])->group(function(){

});