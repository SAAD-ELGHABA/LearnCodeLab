<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User; // Adjust namespace if needed

class AdminSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'firstName' => 'elghabaTech',
            'lastName' => 'Admin',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('adminpwd'), // Use a secure password
            'groupstagiaire_id' => 0,
            'role' => 'admin',
            'image' => null,
            'remember_token' => Str::random(10),
        ]);
    }
}
