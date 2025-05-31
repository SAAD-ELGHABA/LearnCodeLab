<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class FormateurSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'firstName' => 'Achraf',
            'lastName' => 'Trainer',
            'email' => 'formateur@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'groupstagiaire_id' => 0,
            'role' => 'formateur',
            'image' => null,
            'remember_token' => Str::random(10),
        ]);
    }
}
