@extends('Layout')
@section('title','Resources')

@section('content')
<div class="flex flex-col space-y-6 w-full justify-center">
    <div id="drop-zone" class="border border-slate-500 rounded w-full m-2 h-40 flex flex-col justify-center items-center space-y-2 relative overflow-hidden hover:bg-[#163050]">
        <i class="fa-regular fa-file text-3xl text-blue-400"></i>
        <h1 class="text-2xl">Drag files here to open them</h1>
        <h3 class="text-sm">
            or
            <span id="file-select" class="text-blue-400 cursor-pointer">choose a file from here</span>
        </h3>
    </div>
    <div id="file-preview" class="border hidden flex justify-between items-center rounded px-4 py-5 border-[#163050] max-w-full ms-2 text-gray-300" style=" height: 50px; overflow: hidden; position: relative;">
    </div>
    <div class="flex justify-end space-x-1">
        <button id="deny" class="border border-red-900 text-red-900 rounded px-6 py-1 text-sm cursor-not-allowed" disabled onclick="cancelFileUpload()">deny</button>
        <form action="{{route('resources.store')}}" method="post" enctype="multipart/form-data">
            @csrf
            <input type="file" id="file-input" class="hidden" name="file">
            <button id="save" class="border border-green-900 text-green-900 rounded px-6 py-1 text-sm cursor-not-allowed" disabled>save</button>
        </form>
    </div>
    <hr class="border border-gray-700">
    <div class="flex flex-wrap space-x-4 ">
        @foreach($files as $file)
        <div class="py-2 px-2 border mt-2 border-[#163050] rounded">

            <script>
                document.addEventListener('click', function(event) {
                    const menus = document.querySelectorAll('.relative > div');
                    menus.forEach(menu => {});
                });
            </script>
            @if(in_array($file->type, ['pdf']))
            <iframe src="{{ asset('storage/' . $file->file) }}" frameborder="0" class="w-40 h-28"></iframe>
            @else
            <div class="w-40 h-28 text-center flex  items-center justify-center bg-white text-gray-900">
                <img src="{{asset('staticImages/ofppt.webp')}}" alt="ofppt file">
            </div>
            @endif
            <div class="text-sm flex justify-between space-x-5 mt-2">
                <p class="title-file flex " title="{{$file->title}}">
                    {{$file->title}}
                </p>
                <p class="text-gray-400">
                    @if($file->type === 'png' || $file->type === 'jpeg')
                    <i class="fa-regular fa-file-image " style="color: #163050;"></i>
                    @elseif($file->type === 'pdf')
                    <i class="fa-regular fa-file-pdf" style="color: #e74c3c;"></i>
                    @elseif($file->type === 'docx')
                    <i class="fa-regular fa-file-word" style="color: #2a5699;"></i>
                    @elseif($file->type === '.xls' || $file->type === '.xlsx')
                    <i class="fa-regular fa-file-excel" style="color: #217346;"></i>
                    @elseif($file->type === 'pptx' || $file->type === 'ppt')
                    <i class="fa-regular fa-file-powerpoint" style="color: #d24726;"></i>
                    @else
                    <i class="fa-regular fa-file" style="color: #163050;"></i>
                    @endif
                    {{$file->type}}
                </p>
            </div>
            <div>
                <ul class="text-xs flex justify-end">
                    <li>
                        <form action="{{ route('resources.destroy', $file->id) }}" method="POST" onsubmit="event.preventDefault(); confirmDeletion(this);">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="w-full text-left px-1 py-1 cursor-pointer hover:bg-[#163050]">
                                <i class="cursor-pointer fa-solid fa-trash "></i>
                            </button>
                        </form>

                        <script>
                            function confirmDeletion(form) {
                                Swal.fire({
                                    title: 'Are you sure?',
                                    text: "You want to delete this file !",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#163050',
                                    cancelButtonColor: '',
                                    confirmButtonText: 'Yes, delete it!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        form.submit();
                                    }
                                });
                            }
                        </script>
                    </li>
                    <li>
                        <button onclick="showFilePreview({{ $file->id }})" class="cursor-pointer block px-1 py-1 hover:bg-[#163050] w-full text-left">
                            <i class="cursor-pointer fa-eye fa-regular"></i>
                        </button>

                        <div id="file-preview-modal-{{ $file->id }}" class="hidden fixed inset-0 flex justify-center items-center z-50 filter ">
                            <div class="relative shadow bg-white w-11/12 h-5/6 rounded shadow-lg overflow-auto brightness-100" style="filter: none; box-shadow: none;">
                                <div class="flex justify-between absolute top-2 items-center right-2 w-full py-2">
                                    <p class="text-gray-900 ps-5 text-lg font-bold">
                                        {{$file->title}}
                                    </p>
                                    <button onclick="closeFilePreview({{ $file->id }})" class="text-gray-500 hover:text-gray-700 my-2 cursor-pointer">
                                        <i class="fa-solid fa-xmark text-2xl cursor-pointer"></i>
                                    </button>
                                </div>
                                <div class="mt-10 p-4 w-full h-full flex flex-col items-center justify-center">
                                    @if(in_array($file->type, ['pdf', 'png', 'jpeg', 'jpg','txt']))
                                    <iframe src="{{ asset('storage/' . $file->file) }}" frameborder="0" class="w-full h-full"></iframe>
                                    @else
                                    <div class="w-full h-full flex items-center justify-center text-gray-900">
                                        <p class="text-lg">Preview not available for this file type.</p>
                                    </div>
                                    @endif
                                    <div class="mt-4 text-gray-700">
                                        <p><strong>Uploaded By:</strong> {{ request()->ip() }}</p>
                                    </div>
                                </div>
                                <div>
                                    test
                                </div>
                            </div>
                        </div>

                        <script>
                            function showFilePreview(fileId) {
                                const modal = document.getElementById(`file-preview-modal-${fileId}`);
                                modal.classList.remove('hidden');
                            }

                            function closeFilePreview(fileId) {
                                const modal = document.getElementById(`file-preview-modal-${fileId}`);
                                modal.classList.add('hidden');
                            }
                        </script>
                    </li>
                </ul>
            </div>
        </div>
        @endforeach
    </div>

</div>

<script>
    let Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
        style: {
            backgroundColor: '#163050',
            color: '#ffffff',
        },
    });
</script>

@if(session('success'))
<script>
    Toast.fire({
        icon: "success",
        title: "{{ session('success') }}"
    });
</script>
@endif

@if(session('error'))
<script>
    Toast.fire({
        icon: "error",
        title: "{{ session('error') }}"
    });
</script>
@endif

<script>
    document.addEventListener("DOMContentLoaded", function() {
        const fileInput = document.getElementById("file-input");
        const fileSelect = document.getElementById("file-select");
        const dropZone = document.getElementById("drop-zone");
        const filePreview = document.getElementById("file-preview");
        const deny = document.getElementById("deny");
        const save = document.getElementById("save");
        fileSelect.addEventListener("click", () => {
            fileInput.click();
        });
        fileInput.addEventListener("change", (event) => {
            openFile(event.target.files[0]);
        });

        dropZone.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropZone.classList.add("border-blue-400");
        });

        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("border-blue-400");
        });

        dropZone.addEventListener("drop", (event) => {
            event.preventDefault();
            dropZone.classList.remove("border-blue-400");
            openFile(event.dataTransfer.files[0]);
        });

        function openFile(file) {
            filePreview.innerHTML = "";
            filePreview.classList.remove("hidden");
            deny.removeAttribute("disabled");
            deny.classList.remove("cursor-not-allowed");
            deny.classList.remove("border-red-900");
            deny.classList.add("text-red-500");
            deny.classList.remove("text-red-900");
            deny.classList.add("border-red-500");
            deny.classList.add("cursor-pointer");

            save.removeAttribute("disabled");
            save.classList.remove("cursor-not-allowed");
            save.classList.add("cursor-pointer");
            save.classList.remove("border-green-900");
            save.classList.add("border-green-500");
            save.classList.remove("text-green-900");
            save.classList.add("text-green-500");

            const fileURL = URL.createObjectURL(file);
            if (file.type.includes("image")) {
                filePreview.innerHTML += `
                <div>
                <i class="fa-regular fa-file-image" style="color: #163050;"></i>
                <h1 class="text-sm">This is an image file: ${file.name}</h1>
                </div>
                        <div>
            <i class="fa-solid fa-xmark" onclick="cancelFileUpload()"></i>
        </div>
                `;
            } else if (file.type.includes("pdf")) {
                filePreview.innerHTML += `
                <div>
                <i class="fa-regular fa-file-pdf" style="color: #e74c3c;"></i>
                <h1 class="text-sm">This is a PDF file: ${file.name}</h1>
                </div>
                        <div>
            <i class="fa-solid fa-xmark" onclick="cancelFileUpload()"></i>
        </div>
                `;
            } else if (file.type.includes("word") || file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
                filePreview.innerHTML += `
                <div>
                <i class="fa-regular fa-file-word" style="color: #2a5699;"></i>
                <h1 class="text-sm">This is a Word document: ${file.name}</h1>
                </div>
                        <div>
            <i class="fa-solid fa-xmark" onclick="cancelFileUpload()"></i>
        </div>
                `;
            } else if (file.type.includes("excel") || file.name.endsWith(".xls") || file.name.endsWith(".xlsx")) {
                filePreview.innerHTML += `
                <div>
                <i class="fa-regular fa-file-excel" style="color: #217346;"></i>
                <h1 class="text-sm">This is an Excel file: ${file.name}</h1>
                </div>
                        <div>
            <i class="fa-solid fa-xmark" onclick="cancelFileUpload()"></i>
        </div>
                `;
            } else if (file.type.includes("presentation") || file.name.endsWith(".ppt") || file.name.endsWith(".pptx")) {
                filePreview.innerHTML += `
                <div>
                <i class="fa-regular fa-file-powerpoint" style="color: #d24726;"></i>
                <h1 class="text-sm">This is a PowerPoint file: ${file.name}</h1>
                </div>
                        <div>
            <i class="fa-solid fa-xmark" onclick="cancelFileUpload()"></i>
        </div>
                `;
            } else {
                filePreview.innerHTML += `
                <div>
                <i class="fa-regular fa-file" style="color: #163050;"></i>
                <h1 class="text-sm">This is an unknown file type: ${file.name}</h1>
                </div>
                        <div>
            <i class="fa-solid fa-xmark" onclick="cancelFileUpload()"></i>
        </div>
                `;
            }
        }
    });

    const cancelFileUpload = () => {
        document.getElementById("file-preview").classList.add("hidden");
        const deny = document.getElementById("deny");
        const save = document.getElementById("save");
        const fileInput = document.getElementById("file-input");

        deny.setAttribute("disabled", true);
        deny.classList.add("cursor-not-allowed");
        deny.classList.add("border-red-900");
        deny.classList.remove("text-red-500");
        deny.classList.add("text-red-900");
        deny.classList.remove("border-red-500");
        deny.classList.remove("cursor-pointer");

        save.setAttribute("disabled", true);
        save.classList.add("cursor-not-allowed");
        save.classList.remove("cursor-pointer");
        save.classList.add("border-green-900");
        save.classList.remove("border-green-500");
        save.classList.add("text-green-900");
        save.classList.remove("text-green-500");

        fileInput.value = "";
    }
</script>


<script>
    let title_file = document.querySelectorAll('.title-file');

    title_file.forEach(titleFile => {
        let titleText = titleFile.textContent.trim();
        if (titleText.length > 8) {
            titleFile.innerHTML = titleText.substring(0, 8) + `<p class="text-blue-400">...more</p>`;
        }
    });
</script>
@endsection