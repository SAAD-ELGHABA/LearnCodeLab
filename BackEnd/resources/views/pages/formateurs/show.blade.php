@extends('layout')
@section('title','Stagiaire Details')
@section('content')
<div class="m-5">
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Stagiaire Details</h1>
        <a href="{{ route('stagiaires.index') }}" class="bg-[#163050] rounded-lg text-white cursor-pointer duration-300 hover:bg-[#0E1C2D] px-3 py-1 transition-all">
            <i class="fa-arrow-left fas"></i>
        </a>
    </div>
    <div class=" border border-[#163050] rounded-lg mt-5 p-5 ">
        <div class="justify-around items-center flex text-gray-300">
            <div class="mt-5 w-1/2 flex justify-center items-center">
                <div>
                    @if($stagiaire->image)
                    <img src="{{ route('get-image', basename($stagiaire->image)) }}" alt="image" class="w-50 rounded-full mt-5">
                    @else
                    <img src="{{asset('images/logo-v-2.png')}}" alt="image" class="w-50 rounded-full mt-5">
                    @endif
                </div>
            </div>
            <div class="mt-5 w-1/2 space-y-6">
                <div class="flex items-center space-x-2">
                    <i class="fa-user-circle fas "></i>
                    <h1 class="">{{ $stagiaire->firstName }} {{ $stagiaire->lastName }}</h1>
                </div>
                <div class="flex items-center space-x-2">
                    <i class=" fa-envelope fas"></i>
                    <h1 class="">{{ $stagiaire->email }}</h1>
                </div>
                <div class="flex items-center mt-5 space-x-2">
                    <i class=" fa-graduation-cap fas"></i>
                    <h1 class="">{{ $stagiaire->group }}</h1>
                </div>
            </div>

        </div>

        <div class=" text-gray-500 text-xs">
            <div class="flex items-center justify-end space-x-4">
                <i class=" fa-calendar-alt fas"></i>
                <div class="flex flex-col  items-center space-y-2">
                    <h1 class="">Created at : {{ $stagiaire->created_at }}</h1>
                    <h1 class="">Updated at : {{ $stagiaire->updated_at }}</h1>
                </div>
            </div>
        </div>
    </div>
    <div class="flex justify-end mt-20 space-x-2 text-sm">
        <form action="{{ route('stagiaires.destroy', $stagiaire->id) }}" method="POST" id="deleteForm_{{ $stagiaire->id }}">
            @csrf
            @method('DELETE')
            <button type="button" onclick="confirmDelete('{{ $stagiaire->id }}', '{{ $stagiaire->firstName }} {{ $stagiaire->lastName }}')" class="bg-[#163050] px-3 py-1 rounded cursor-pointer text-red-400">
                <i class="text-red-400 cursor-pointer fa-solid fa-trash"></i>
                delete
            </button>
        </form>
        <form action="{{route('stagiaires.edit',$stagiaire->id)}}" method="get">
            <button type="submit" class="bg-[#163050] px-3 py-1 rounded cursor-pointer text-white">
                <i class="cursor-pointer fa-pen-to-square fa-regular"></i>
                Edit
            </button>
        </form>
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
@endsection