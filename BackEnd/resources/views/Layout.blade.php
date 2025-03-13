<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('titre')</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    @vite('resources/css/app.css')
</head>

<body class="bg-[#0E1C2D]  text-slate-50">
    <header class="w-full  py-4 bg-gray-900 sticky">
        <nav class="container mx-auto flex justify-between">
            <div>
                <h1 class="text-xl">
                    title
                </h1>
            </div>
            <div>
                <form action="{{route('admin.logout')}}" method="post">
                    @csrf
                    <button class="cursor-pointer">
                        logout
                    </button>
                </form>
            </div>
        </nav>
    </header>
    <div class="flex">
        <aside class="sticky start-0 h-screen w-1/6 bg-gray-900 transition-all duration-1000 ease-in-out" id="side-panel">
            <h1 class="font-bold">Welcome <span class="text-blue-400">Admin</span></h1>
            <div class="flex justify-end px-2">
                <button id="toggle-panel" class="cursor-pointer font-bold text-white focus:outline-none">
                    <i class="fas fa-bars-staggered"></i>
                </button>
            </div>
        </aside>
        <div class="content">
            @section('content')
            @show
        </div>
    </div>
    <script>
        const sidePanel = document.getElementById('side-panel');
        const toggleButton = document.getElementById('toggle-panel');
        toggleButton.addEventListener('click', () => {
            sidePanel.classList.toggle('hidden');
        });
    </script>
</body>

</html>