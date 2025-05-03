@extends('Layout')
@section('title','Stagiaires')

@section('content')
<div class="flex justify-between m-2 items-center mb-5">
    <div class="flex items-center space-x-2">
        <i class="fa-graduation-cap fa-solid"></i>
        <h1 class="text-lg font-bold">The "stagiaires" Info</h1>
    </div>
    <div class="text-sm">
        <a href="{{route('stagiaires.create')}}" class="bg-[#163050] rounded text-white hover:bg-[#1e2d46] px-3 py-1">
            <i class="fa-plus fa-solid"></i>
            Add New Stagiaire
        </a>
    </div>
</div>
<table class="border border-[#163050] text-center w-full">
    <thead>
        <tr class="border border-[#163050] text-sm">
            <th class="py-3">Image</th>
            <th class="py-3">First Name</th>
            <th class="py-3">Last Name</th>
            <th class="py-3">E-mail</th>
            <th class="py-3">Group</th>
            <th class="py-3">Created At</th>
            <th class="py-3">Action</th>
        </tr>
    </thead>
    <tbody>
        @if($stagiaires->count() == 0)
        <tr>
            <td colspan="6" class="font-light py-20">
                <i class="fa-ban fa-solid font-light"></i>
                No Stagiaires Found
            </td>
        </tr>
        @else

        @foreach($stagiaires as $stagiaire)
        <tr class="border border-[#163050] text-slate-300 text-sm hover:bg-[#163050] py-2">
            <td class="flex justify-center py-2 items-center">
                @if($stagiaire->image)
                <!-- <img src="{{ route('get-image', basename($stagiaire->image)) }}" alt="image" class="h-10 rounded-full w-10"> -->
                <img src="{{ $stagiaire->image }}" alt="image" class="h-10 rounded-full w-10">
                @else
                <img src="{{asset('images/logo-v-2.png')}}" alt="image" class="h-10 rounded-full w-10">
                @endif
            </td>
            <td class="py-2">{{$stagiaire->firstName}}</td>
            <td class="py-2">{{$stagiaire->lastName}}</td>
            <td class="py-2">{{$stagiaire->email}}</td>
            <td class="py-2">{{$stagiaire->group}}</td>
            <td class="py-2">{{$stagiaire->created_at}}</td>
            <td class="py-2">
                <div class="flex justify-center space-x-2">
                    <form action="{{ route('stagiaires.destroy', $stagiaire->id) }}" method="POST" id="deleteForm_{{ $stagiaire->id }}">
                        @csrf
                        @method('DELETE')
                        <button type="button" onclick="confirmDelete('{{ $stagiaire->id }}', '{{ $stagiaire->firstName }} {{ $stagiaire->lastName }}')">
                            <i class="text-red-400 cursor-pointer fa-solid fa-trash"></i>
                        </button>
                    </form>
                    <form action="{{route('stagiaires.show',$stagiaire->id)}}" method="get">
                        <button type="submit">
                            <i class="cursor-pointer fa-eye fa-regular"></i>
                        </button>
                    </form>
                    <form action="{{route('stagiaires.edit',$stagiaire->id)}}" method="get">
                        <button type="submit">
                            <i class="cursor-pointer fa-pen-to-square fa-regular"></i>
                        </button>
                    </form>
                </div>
            </td>
        </tr>
        @endforeach
        @endif
    </tbody>
</table>
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
            text: `Do you really want to delete ${name} ?`,
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

@endsection