<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'firstName'=>'admin',
            'lastName'=>'admin',
            'email'=>'adminv0@gmail.com',
            'password'=>'admin',
            'role'=>'admin',
            'group'=>'admin',
            'email_verified_at' => now(),
        ]);
    }
}
