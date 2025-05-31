<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GroupStagiaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed from dev101 to dev110
        for ($i = 101; $i <= 110; $i++) {
            DB::table('groupstagiaire')->insert([
                'name' => 'dev' . $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Seed from dev201 to dev210
        for ($i = 201; $i <= 210; $i++) {
            DB::table('groupstagiaire')->insert([
                'name' => 'dev' . $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
