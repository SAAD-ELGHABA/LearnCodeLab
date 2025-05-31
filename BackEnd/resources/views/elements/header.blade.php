<header class="w-full py-4 fixed top-0 left-0 right-0 z-10" id="header">
    <nav class="container mx-auto flex justify-between items-center px-4">
        <div>
            <h1 class="text-xl font-bold text-blue-400">Dashboard Admin</h1>
        </div>
<button id="theme-toggle"
    class="relative w-14 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center transition-colors duration-300 focus:outline-none">
    <span class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center"
        id="toggle-thumb">
        <i id="theme-icon" class="fas fa-moon text-gray-800 text-sm"></i>
    </span>
</button>




        <div>

            <form action="{{ route('admin.logout') }}" method="POST" id="logoutForm">
                @csrf
                <button type="button"
                    class="cursor-pointer flex items-center space-x-2 text-sm bg-[#163050] text-white px-3 py-1 rounded hover:bg-[#1e2d46]"
                    onclick="confirmLogout()">
                    <i class="fa-solid fa-arrow-right-from-bracket me-2"></i>
                    Logout
                </button>
            </form>
        </div>


        <script>
            function confirmLogout() {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'Do you really want to log out?',
                    icon: 'warning',
                    background: '#1e2d46',
                    color: '#ffffff',
                    showCancelButton: true,
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Yes, log me out',
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#163050',
                    reverseButtons: true,
                    buttonsStyling: false,
                    customClass: {
                        popup: 'custom-popup',
                        title: 'custom-title',
                        content: 'custom-content',
                        confirmButton: 'custom-confirm-button',
                        cancelButton: 'custom-cancel-button'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.getElementById('logoutForm').submit();
                    }
                });
            }
        </script>

        <style>
            .custom-popup {
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
            }

            .custom-title {
                color: #ffffff !important;
            }

            .custom-content {
                color: #dcdcdc !important;
            }

            .custom-confirm-button {
                background-color: #163050 !important;
                color: #ffffff !important;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                font-weight: bold;
            }

            .custom-cancel-button {
                background-color: #1e2d46 !important;
                color: #ffffff !important;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                font-weight: bold;
            }

            .swal2-popup {
                background-color: #1e2d46 !important;
                color: #ffffff !important;
            }

            .swal2-styled {
                border-radius: 5px;
            }

            .swal2-confirm,
            .swal2-cancel {
                font-size: 16px;
                font-weight: bold;
                padding: 12px 30px;
            }
        </style>

    </nav>
</header>