<aside id="sidebar" class="h-screen bg-gray-900 transition-all duration-300 ease-in-out w-64 fixed left-0 top-16 flex flex-col">
    <div class="flex items-center justify-between">
        <h1 id="welcome-text" class="text-sm transition-opacity duration-300 ms-5">
            Welcome
            <span class="text-blue-400">
                {{ auth()->check() ? auth()->user()->firstName . ' ' . auth()->user()->lastName : 'User' }}
            </span>
        </h1>
        <div class="p-4 flex justify-end">
            <button id="toggle-sidebar" class="px-3 text-sm cursor-pointer bg-gray-700 p-2 rounded-lg">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </div>
    @php
    $links = [
    ['route' => 'admin.index', 'icon' => 'fa-house', 'label' => 'Home'],
    ['route' => 'admin.index', 'icon' => 'fa-gears', 'label' => 'Settings'],
    ['route' => 'stagiaires.index', 'icon' => 'fa-graduation-cap', 'label' => 'Stagiaires'],
    ['route' => 'stagiaires.index', 'icon' => 'fa-solid fa-chalkboard-user', 'label' => 'Formateurs'],
    ['route' => 'admin.index', 'icon' => 'fa-user-group', 'label' => 'My Groups'],
    ['route' => 'admin.index', 'icon' => 'fa-code', 'label' => 'Languages'],
    ['route' => 'resources.index', 'icon' => 'fa-folder-open', 'label' => 'Resources'],
    ['route' => 'admin.index', 'icon' => 'fa-circle-question', 'label' => 'Help/Support'],
    ];
    @endphp

    <ul class="mt-5 flex-1 text-sm ms-5">
        @foreach ($links as $link)
        @php
        $isActive = request()->routeIs($link['route']);
        @endphp
        <a href="{{ route($link['route']) }}"
            class="py-3 ps-2 flex items-center space-x-4 cursor-pointer hover:bg-[#0E1C2D] transition-all duration-300 
           {{ $isActive ? 'text-blue-400 font-semibold' : 'text-white' }}">
            <i class="fas {{ $link['icon'] }} text-sm text-center icons-items"></i>
            <span class="sidebar-text transition-all duration-300">{{ $link['label'] }}</span>
        </a>
        @endforeach
    </ul>

</aside>