@extends('Layout')
@section('title','Collections')

@section('content')
<div>
    <div>
        <h1 class="text-2xl font-semibold mb-4">
            <i class="fa-regular fa-file-lines"></i>
            Collections
        </h1>
    </div>
    <div>
        <table class="text-center w-full border-collapse shadow-md rounded-lg">
            <thead>
                <tr class="bg-gray-800 text-white">
                    <th class="px-4 py-2">ID</th>
                    <th class="px-4 py-2">Owner</th>
                    <th class="px-4 py-2">Title</th>
                    <th class="px-4 py-2">Description</th>
                    <th class="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($collections as $collection)
                <tr class="border-b border-gray-700">
                    <td class="px-4 py-2">{{ $collection->id }}</td>
                    <td class="px-4 py-2 text-start">
                        <img src="{{$collection->user->image}}" alt="owner-image" class="w-10 h-10 rounded-full inline-block ms-2">
                        {{ $collection->user->firstName." ".$collection->user->lastName }}
                    </td>
                    <td class="px-4 py-2">{{ $collection->title }}</td>
                    <td class="px-4 py-2">{{ $collection->language }}</td>
                    <td class="flex space-x-2 justify-center items-center pt-5">
                        <a href="http://localhost:3000/admin/collection/details/{{$collection->user->firstName.'-'.$collection->user->lastName}}/{{$collection->slug}}">
                            <i class="fa-regular fa-eye"></i>
                        </a>
                        <form action="{{ route('collections.delete', $collection->id) }}" method="post" class="inline-block" id="deleteForm_{{ $collection->id }}">
                            @csrf
                            @method('DELETE')
                            <button type="button" class="bg-transparent border-none p-0 m-0"
                                onclick="confirmDelete('{{ $collection->id }}', '{{ $collection->user->firstName }} {{ $collection->user->lastName }}')">
                                <i class="fa-regular fa-trash-can cursor-pointer text-red-500"></i>
                            </button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
        <div class="mt-4 flex justify-center">
            {{ $collections->links() }}
        </div>
    </div>
    <script>
        function confirmDelete(id, name) {

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "custom-confirm-button",
                    cancelButton: "custom-cancel-button"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: `Do you really want to delete the collection of ${name} ?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    const deleteForm = document.getElementById('deleteForm_' + id);
                    deleteForm.submit();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: `${name} is safe :)`,
                        icon: "error"
                    });
                }
            });
        }
    </script>
    @if(session('deletingStagiaire'))
    <script>
        Swal.fire({
            title: "Deleted!",
            text: "{{ session('deletingStagiaire') }}",
            icon: "success",
            confirmButtonText: "Done",
            customClass: {
                confirmButton: "button",
            }
        });
    </script>
    @endif
    @if(session('success'))
    <script>
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "{{ session('success') }}"
        });
    </script>
    @endif
    <style>
        .button {
            background-color: green;
        }
    </style>
    <script>
        function deleteone() {
            toast.success("The item has been deleted!", {
                position: 'top-right',
                duration: 5000,
                closeButton: true,
                style: {
                    backgroundColor: '#163050',
                    color: '#ffffff',
                },
            });
        }
    </script>
</div>
@endsection