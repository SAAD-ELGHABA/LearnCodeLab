<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User; // Make sure you import your User model
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Create 10 users (you can adjust the number as needed)
        foreach (range(1, 100) as $index) {
            User::create([
                'firstName' => $faker->firstName,
                'lastName' => $faker->lastName,
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => Hash::make('password123'), // You can use a default password or any logic
                'group' => $faker->word,  // Adjust as per your requirements
                'role' => 'stagiaire',  // Default role, you can change it to other roles if needed
                'image' => $faker->imageUrl(640, 480, 'people'),  // Generate a random image URL
            ]);
        }
    }
}
