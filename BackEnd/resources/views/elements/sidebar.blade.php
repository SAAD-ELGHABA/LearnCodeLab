<aside id="sidebar" class="h-screen  transition-all duration-300 ease-in-out w-64 fixed left-0 top-16 flex flex-col">
    <div class="flex items-center justify-between">
        <h1 id="welcome-text" class="text-sm transition-opacity duration-300 ms-5">
            Welcome
            <span class="text-blue-400">
                {{ auth()->check() ? auth()->user()->firstName . ' ' . auth()->user()->lastName : 'User' }}
            </span>
        </h1>
        <div class="flex justify-end p-2 ">
            <button id="toggle-sidebar" class="px-3 text-lg cursor-pointer  p-2 rounded-lg">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </div>
    @php
    $links = [
    ['route' => 'admin.index', 'icon' => 'fa-house', 'label' => 'Home'],
    ['route' => 'stagiaires.index', 'icon' => 'fa-graduation-cap', 'label' => 'Stagiaires'],
    ['route' => 'formateurs.index', 'icon' => 'fa-solid fa-chalkboard-user', 'label' => 'Formateurs'],
    ['route' => 'admin.collections', 'icon' => 'fa-regular fa-file-lines', 'label' => 'Collections'],
    ['route' => 'resources.index', 'icon' => 'fa-solid fa-users-line', 'label' => 'Groups'],
    ['route' => 'admin.languages', 'icon' => 'fa-code', 'label' => 'Languages'],
    ['route' => 'resources.index', 'icon' => 'fa-folder-open', 'label' => 'Resources']
    ];
    @endphp

    <ul class="mt-5 flex-1 text-sm">
        @foreach ($links as $link)
        @php
        $isActive = request()->routeIs($link['route']);
        @endphp
        <a href="{{ route($link['route']) }}"
            class="py-3 ps-4 flex items-center space-x-4 cursor-pointer hover:bg-[#0E1C2D] hover:text-white transition-all duration-300 
           {{ $isActive ? 'text-blue-400 font-semibold' : '' }}">
            <i class="fas {{ $link['icon'] }} text-sm text-center icons-items"></i>
            <span class="sidebar-text transition-all duration-300">{{ $link['label'] }}</span>
        </a>
        @endforeach
    </ul>

</aside>