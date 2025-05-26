<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Collection;
use App\Models\Language;
use App\Models\User;
use Faker\Factory as Faker;

class CollectionSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $languages = Language::all();

        if ($languages->isEmpty() || User::count() === 0) {
            $this->command->warn('Languages or Users are missing. Aborting Collection seeder.');
            return;
        }

        foreach (range(1, 100) as $index) {
            $language = $languages->random();
            $user = User::inRandomOrder()->first();

            $snippet = $this->getCodeSnippet($language->name);

            Collection::create([
                'title' => $faker->sentence,
                'question' => $faker->sentence . '?',
                'description' => $snippet['description'],
                'code' => base64_encode($snippet['code']),
                'language' => $language->name,
                'user_id' => $user->id,
                'slug' => $faker->slug,
            ]);
        }
    }

    private function getCodeSnippet(string $language): array
    {
        switch (strtolower($language)) {
            case 'php':
                return [
                    'description' => 'Basic PHP script to greet the user.',
                    'code' => "<?php\necho 'Hello from PHP!';"
                ];
            case 'python':
                return [
                    'description' => 'A Python function to greet a user by name.',
                    'code' => "def greet(name):\n    print(f\"Hello, {name}!\")\n\ngreet('Achraf')"
                ];
            case 'javascript':
                return [
                    'description' => 'A simple JavaScript function to log a message.',
                    'code' => "function greet(name) {\n  console.log(`Hello, \${name}`);\n}\n\ngreet('Achraf');"

                ];
            case 'html':
                return [
                    'description' => 'Basic HTML structure for a web page.',
                    'code' => "<!DOCTYPE html>\n<html>\n<head>\n  <title>Welcome</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>"
                ];
            case 'css':
                return [
                    'description' => 'Simple CSS to center text and style a heading.',
                    'code' => "body {\n  text-align: center;\n  background-color: #f4f4f4;\n}\nh1 {\n  color: #333;\n}"
                ];
            case 'laravel':
                return [
                    'description' => 'Laravel route definition using a controller.',
                    'code' => "Route::get('/welcome', [WelcomeController::class, 'index']);"
                ];
            case 'react':
                return [
                    'description' => 'A simple React component with a button.',
                    'code' => "import React from 'react';\n\nfunction App() {\n  return (\n    <div>\n      <h1>Hello React</h1>\n      <button>Click Me</button>\n    </div>\n  );\n}\n\nexport default App;"
                ];
            case 'bootstrap':
                return [
                    'description' => 'Bootstrap example using a responsive card layout.',
                    'code' => "<div class=\"card\" style=\"width: 18rem;\">\n  <img src=\"...\" class=\"card-img-top\" alt=\"...\">\n  <div class=\"card-body\">\n    <h5 class=\"card-title\">Card title</h5>\n    <p class=\"card-text\">Some quick example text.</p>\n    <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\n  </div>\n</div>"
                ];
            case 'algorithm':
                return [
                    'description' => 'A simple algorithm to calculate factorial using recursion.',
                    'code' => "def factorial(n):\n    return 1 if n == 0 else n * factorial(n - 1)\n\nprint(factorial(5))"
                ];
            default:
                return [
                    'description' => 'Sample snippet for unknown language.',
                    'code' => '// No code snippet available.'
                ];
        }
    }
}
