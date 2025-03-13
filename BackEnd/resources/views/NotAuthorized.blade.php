<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    @vite('resources/css/app.css')
</head>

<body class="bg-gray-900" style="height: 90vh;">
    <div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">
        <div>
            <h1 class="text-4xl block text-slate-100">Not Authorized</h1>
            <button class="w-full text-blue-400 mt-2 cursor-pointer">
                <a href="http://localhost:3000/login">
                    Go Back And <span class="underline">Sign In</span>
                </a>
            </button>
        </div>
    </div>
</body>

</html>