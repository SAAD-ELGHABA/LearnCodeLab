<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Collection; // Make sure you import your Collection model
use App\Models\User; // To get a random user for the foreign key
use Faker\Factory as Faker;

class CollectionSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Create 10 collections (you can adjust the number as needed)
        foreach (range(1, 100) as $index) {
            Collection::create([
                'title' => $faker->sentence,
                'question' => $faker->paragraph,
                'description' => $faker->paragraph,
                'code' => base64_encode($faker->text(200)),  // Base64 encode the code before saving
                'language' => $faker->word,  // Adjust this to match the programming languages you want
                'user_id' => User::inRandomOrder()->first()->id,  // Assign a random user as the owner
            ]);
        }
    }
}
