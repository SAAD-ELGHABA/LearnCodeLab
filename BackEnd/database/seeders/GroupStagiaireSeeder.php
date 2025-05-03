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
        for ($i = 10; $i <= 10; $i++) {
            DB::table('groupstagiaire')->insert([
                'name' => 'dev2' . $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
