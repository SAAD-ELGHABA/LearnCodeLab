@extends('Layout')
@section('title', 'Groups')
@section('content')
<div>
    <div>
        <h1 class="text-2xl font-semibold mb-4">
            <i class="fa-solid fa-code"></i>
            Languages
        </h1>
    </div>
    <div class="">
        <div class="flex justify-end mb-4">
            <button id="showAddLanguageModal" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center transition text-sm">
                <i class="fa-solid fa-plus"></i>
                <span class="ml-2">Add Language</span>
            </button>
        </div>

        <div id="addLanguageModal" class="fixed inset-0 bg-[#0000006c] bg-opacity-50 flex items-center justify-center z-50 hidden">
            <div class="bg-gray-800 shadow-2xl rounded-xl p-8 w-full max-w-lg relative">
                <button id="closeAddLanguageModal" class="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-2xl focus:outline-none">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <form action="{{route('language.store')}}" class="w-full" method="post">
                    @csrf
                    <div class="mb-5">
                        <label for="name" class="block text-sm font-semibold text-gray-200 my-3">
                            <i class="fa-solid fa-code mr-2"></i>
                            Language Name
                        </label>
                        <input type="text" name="name" id="name" class="w-full border border-gray-700 bg-gray-900 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" required>
                    </div>
                    <div class="mb-5">
                        <label for="description" class="block text-sm font-semibold text-gray-200 mb-2">
                            <i class="fa-solid fa-align-left mr-2"></i>Description
                        </label>
                        <textarea name="description" id="description" rows="3" class="w-full border border-gray-700 bg-gray-900 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"></textarea>
                    </div>
                    <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold px-6 py-3 rounded-lg shadow hover:from-blue-700 hover:to-blue-600 transition text-sm">
                        <i class="fa-solid fa-plus mr-2"></i>Add Language
                    </button>
                </form>
            </div>
        </div>

        <script>
            const showModalBtn = document.getElementById('showAddLanguageModal');
            const modal = document.getElementById('addLanguageModal');
            const closeModalBtn = document.getElementById('closeAddLanguageModal');

            showModalBtn.addEventListener('click', () => {
                modal.classList.remove('hidden');
            });

            closeModalBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
            });

            // Optional: Close modal when clicking outside the modal content
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        </script>
    </div>
    <div>
        @if(isset($languages) && count($languages) > 0)
        <div id="accordion">
            @foreach($languages as $index => $language)
            <div class="border-b border-gray-700">
                <button class="w-full text-left py-2 px-4 focus:outline-none flex justify-between items-center font-medium text-xl" type="button" data-toggle="collapse" data-target="#lang-{{ $index }}">
                    <span>{{ $language->name }}</span>
                    <i class="fa fa-chevron-down"></i>
                </button>
                <div id="lang-{{ $index }}" class="accordion-content max-h-0 overflow-hidden transition-all duration-300 px-4 py-0">
                    <p class="py-2">{{ $language->description ?? 'No description available.' }}</p>
                    <div class="flex justify-end w-full pb-8">
                        <button
                            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center transition text-sm mt-2 showEditLanguageModal"
                            data-id="{{ $language->id }}"
                            data-name="{{ $language->name }}"
                            data-description="{{ $language->description }}">
                            update
                        </button>
                        <script>
                            document.addEventListener('DOMContentLoaded', function() {
                                const addBtn = document.querySelector('#addLanguageModal button[type="submit"]');
                                const nameInput = document.getElementById('name');
                                const descInput = document.getElementById('description');
                                const form = document.querySelector('#addLanguageModal form');
                                const originalAction = form.action;
                                const originalBtnHtml = addBtn.innerHTML;

                                document.querySelectorAll('.showEditLanguageModal').forEach(function(btn) {
                                    btn.addEventListener('click', function() {
                                        // Show modal
                                        const modal = document.getElementById('addLanguageModal');
                                        modal.classList.remove('hidden');
                                        // Fill form with language data
                                        nameInput.value = this.getAttribute('data-name') || '';
                                        descInput.value = this.getAttribute('data-description') || '';
                                        // Change button text to "Update Language"
                                        addBtn.innerHTML = '<i class="fa-solid fa-pen mr-2"></i>Update Language';
                                        // Optionally, change form action to update route if needed
                                        // form.action = '/your-update-route/' + this.getAttribute('data-id');
                                    });
                                });

                                // Reset button text and form when modal is closed
                                document.getElementById('closeAddLanguageModal').addEventListener('click', function() {
                                    addBtn.innerHTML = originalBtnHtml;
                                    nameInput.value = '';
                                    descInput.value = '';
                                    form.action = originalAction;
                                });
                                document.getElementById('addLanguageModal').addEventListener('click', function(e) {
                                    if (e.target === this) {
                                        addBtn.innerHTML = originalBtnHtml;
                                        nameInput.value = '';
                                        descInput.value = '';
                                        form.action = originalAction;
                                    }
                                });
                            });
                        </script>

                    </div>
                </div>
            </div>
            @endforeach
        </div>
        <script>
            document.querySelectorAll('[data-toggle="collapse"]').forEach(btn => {
                btn.addEventListener('click', function() {
                    const target = document.querySelector(this.getAttribute('data-target'));
                    const allContents = document.querySelectorAll('.accordion-content');
                    allContents.forEach(content => {
                        if (content !== target) {
                            content.style.maxHeight = null;
                            content.classList.remove('py-2');
                        }
                    });
                    if (target.style.maxHeight) {
                        target.style.maxHeight = null;
                        target.classList.remove('py-2');
                    } else {
                        target.style.maxHeight = target.scrollHeight + "px";
                        target.classList.add('py-2');
                    }
                });
            });
        </script>
        @else
        <p>No languages found.</p>
        @endif
    </div>
</div>
@endsection