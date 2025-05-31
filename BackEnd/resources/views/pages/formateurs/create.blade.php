@extends('Layout')

@section('title', 'Create New Stagiaire')

@section('content')
<div class="mt-5">
    <div class="flex justify-between items-center mb-2">
        <h1 class="text-xl font-bold">Create New Stagiaire</h1>
        <a href="{{ route('formateurs.index') }}" class="bg-[#163050] rounded-lg text-white cursor-pointer duration-300 hover:bg-[#0E1C2D] px-3 py-1 transition-all">
            <i class="fa-arrow-left fas"></i>
        </a>
    </div>
    <form action="{{route('formateurs.store')}}" method="post" enctype="multipart/form-data">
        @csrf
        <div class="flex bg-gray-900 justify-around items-center">
            <div class="p-5 rounded w-1/2">
                <h1 class="text-lg text-white font-bold">Add New Stagiaire</h1>
                <p class="text-gray-500 text-sm">Please fill in the form to add a new stagiaire</p>
                <div class="text-sm space-y-2">
                    <div class="flex flex-col">
                        <label for="firstName" class="text-sm text-white ms-2">First Name</label>
                        <input type="text" name="firstName" id="firstName" placeholder="First Name"
                            class="bg-gray-800 border border-gray-700 p-2 rounded text-white outline-none">
                    </div>
                    <div class="flex flex-col">
                        <label for="lastName" class="text-sm text-white ms-2">Last Name</label>
                        <input type="text" name="lastName" id="lastName" placeholder="Last Name"
                            class="bg-gray-800 border border-gray-700 p-2 rounded text-white outline-none">
                    </div>
                    <div class="flex flex-col">
                        <label for="email" class="text-sm text-white ms-2">E-mail</label>
                        <input type="email" name="email" id="email" placeholder="E-mail"
                            class="bg-gray-800 border border-gray-700 p-2 rounded text-white outline-none">
                    </div>
                    <div class="flex flex-col">
                        <label for="password" class="text-sm text-white ms-2">Password</label>
                        <div class="relative">
                            <input type="password" name="password" id="password" placeholder="******"
                                class="bg-gray-800 border border-gray-700 p-2 rounded text-white w-full outline-none">
                            <button type="button"
                                class="text-white absolute right-2 top-2" id="togglePassword">
                                <i class="fa-eye fas" onclick="togglePassword()" id="toggleIcon"></i>
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <button type="submit"
                            class="bg-[#163050] rounded text-sm text-white w-1/2 cursor-pointer hover:bg-[#1e2d46] mx-auto px-3 py-2">
                            Add New Stagiaire
                        </button>
                    </div>
                </div>
            </div>

            <input type="file" name="formateur_image" id="fileInput" class="hidden" accept="image/*" onchange="previewImage(event)">

            <div class="flex bg-[#163050] h-96 justify-center p-5 rounded w-96 cursor-pointer hover:bg-[#1e2d46] items-center"
                onclick="document.getElementById('fileInput').click();">
                <span id="imageText" class="text-sm text-white">Select an image for the stagiaire</span>
                <img id="imagePreview" class="h-full rounded w-full hidden object-cover" />
            </div>
        </div>
    </form>
</div>

@if ($errors->any())
<script>
    let errorMessages = @json($errors -> all());
    Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'error',
        title: errorMessages.join('\n'),
        showConfirmButton: false,
        timer: 5000,
        background: '#f8d7da',
        color: '#721c24',
        padding: '15px',
    });
</script>
@endif
<script>
    function togglePassword() {
        const passwordField = document.getElementById('password');
        const toggleIcon = document.getElementById('toggleIcon');

        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    }

    function previewImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('imagePreview').src = e.target.result;
                document.getElementById('imagePreview').classList.remove('hidden');
                document.getElementById('imageText').classList.add('hidden');
            }
            reader.readAsDataURL(file);
        }
    }
</script>
@endsection