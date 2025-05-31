<?php

namespace Database\Seeders;

use App\Models\GroupStagiaire;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User; // Make sure you import your User model
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $groupStagiaire = GroupStagiaire::all();
        foreach (range(1, 100) as $index) {
            User::create([
                'firstName' => $faker->firstName,
                'lastName' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'groupstagiaire_id' => $groupStagiaire->random()->id,
                'role' => 'stagiaire',
                'image' => 'https://picsum.photos/seed/' . $faker->uuid . '/640/480',
            ]);
        }
    }
}
