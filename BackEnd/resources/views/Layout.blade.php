<!DOCTYPE html>
<html lang="en" class="">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    <link rel="icon" type="image/png" href="{{ asset('staticImages/logo-v-2.png') }}" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    @vite('resources/css/app.css')
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
</head>


<body class="transition-colors duration-300 ease-in-out bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflo-x-scroll custom-scrollbar">

    @include('elements.header')
    <div class="flex pt-16">
        @include('elements.sidebar')

        <div id="main-content" class="flex-1 p-4 ml-64 transition-all duration-300">
            @yield('content')
        </div>
    </div>

    <script>
        const sidebar = document.getElementById("sidebar");
        const mainContent = document.getElementById("main-content");
        const toggleSidebar = document.getElementById("toggle-sidebar");
        const welcomeText = document.getElementById("welcome-text");
        const sidebarTextElements = document.querySelectorAll(".sidebar-text");

        toggleSidebar.addEventListener("click", () => {
            const isCollapsed = sidebar.classList.contains("w-16");

            if (isCollapsed) {
                sidebar.classList.remove("w-16");
                sidebar.classList.add("w-64");
                mainContent.classList.remove("ml-16");
                mainContent.classList.add("ml-64");
                welcomeText.classList.remove("opacity-0", "hidden");
                sidebarTextElements.forEach(el => el.classList.remove("hidden", "opacity-0"));
            } else {
                sidebar.classList.remove("w-64");
                sidebar.classList.add("w-16");
                mainContent.classList.remove("ml-64");
                mainContent.classList.add("ml-16");
                welcomeText.classList.add("opacity-0", "hidden");
                sidebarTextElements.forEach(el => el.classList.add("hidden", "opacity-0"));
            }
        });
    </script>
    <x-toaster-hub />


    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</body>

</html>