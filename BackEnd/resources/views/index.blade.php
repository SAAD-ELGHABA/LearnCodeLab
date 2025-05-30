@extends('Layout')
@section('title','index')


@section('content')

<div >
    <div class="grid lg:grid-cols-4 gap-4">
        <div class="border rounded border-gray-500 text-2xl font-semibold p-4 flex items-center justify-between">
            <i class="fa-solid fa-graduation-cap "></i>
            <h1>Stagiaires</h1>
            <div>
                {{
                        $stagiaires->count() > 0 ? $stagiaires->count() : 'No stagiaires available'
                    }}
            </div>
        </div>
        <div class="border rounded border-gray-500 text-2xl font-semibold p-4 flex items-center justify-between">
            <i class="fa-solid fa-user-tie"></i>
            <h1>Formateurs</h1>
            <div>
                {{
                        $formateurs->count() > 0 ? $formateurs->count() : 'No formateurs available'
                    }}
            </div>
        </div>
        <div class="border rounded border-gray-500 text-2xl font-semibold p-4 flex items-center justify-between">
            <i class="fa-solid fa-clipboard"></i>
            <h1>Collections</h1>
            <div>
                {{
                        $collections->count() > 0 ? $collections->count() : 'No collections available'
                    }}
            </div>
        </div>

        <div class="border rounded border-gray-500 text-2xl font-semibold p-4 flex items-center justify-between">
            <i class="fa-solid fa-users-line"></i>
            <h1>Groups</h1>
            <div>
                {{
                        $groups->count() > 0 ? $groups->count() : 'No groups available'
                    }}
            </div>
        </div>
    </div>
    <div class="flex flex-col  justify-between items-start mt-4 space-x-2">
        <div class="mt-4 border rounded border-gray-700 p-4 w-5/6">
            <h2 class="text-2xl font-bold mb-4">
            <i class="fa-solid fa-chart-column me-2"></i>    
            Dashboard Overview
            </h2>
            <canvas id="dashboardChart" height="100"></canvas>
        </div>
        <div class="grid lg:grid-cols-5 gap-6 mt-6 w-full">
    <div class=" p-4 rounded shadow" >
        <h2 class="text-xl font-semibold text-center mb-2">Stagiaires</h2>
        <canvas id="stagiairesChart"></canvas>
    </div>
    <div class=" p-4 rounded shadow" >
        <h2 class="text-xl font-semibold text-center mb-2">Formateurs</h2>
        <canvas id="formateursChart"></canvas>
    </div>
    <div class=" p-4 rounded shadow" >
        <h2 class="text-xl font-semibold text-center mb-2">Collections</h2>
        <canvas id="collectionsChart"></canvas>
    </div>
    <div class=" p-4 rounded shadow" >
        <h2 class="text-xl font-semibold text-center mb-2">Groups</h2>
        <canvas id="groupsChart"></canvas>
    </div>
    <div class=" p-4 rounded shadow" >
        <h2 class="text-xl font-semibold text-center mb-2">Feedbacks</h2>
        <canvas id="feedbacksChart"></canvas>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
    function createDoughnutChart(canvasId, label, value, color = '#3b82f6') {
        new Chart(document.getElementById(canvasId).getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: [label, 'Reste'],
                datasets: [{
                    data: [value, 100 - value], // optional filler to make the chart 100%
                    backgroundColor: [color, '#101828'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                cutout: '60%',
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Create charts with real data from Blade
    createDoughnutChart('stagiairesChart', 'Stagiaires', {{ $stagiaires->count() }}, '#3b82f6');
    createDoughnutChart('formateursChart', 'Formateurs', {{ $formateurs->count() }}, '#10b981');
    createDoughnutChart('collectionsChart', 'Collections', {{ $collections->count() }}, '#f59e0b');
    createDoughnutChart('groupsChart', 'Groups', {{ $groups->count() }}, '#ef4444');
    createDoughnutChart('feedbacksChart', 'Feedbacks', {{ $feedbacks->count() }}, '#8b5cf6');
</script>
        <div class="w-full overflow-x-scroll p-1 custom-scrollbar mt-10" >
            <h1 class="text-xl font-medium m-2">
            <i class="fa-regular fa-comment-dots me-2"></i>
            Recent Feedback's
            </h1>
            <table class="overflow-x-scroll">
                <tbody>
                    @foreach ($feedbacks as $feedback)
                    <tr class="border-b border-gray-700">
                        <td class="p-2">
                            <span class=" text-sm">{{ $feedback->user ? $feedback->user->firstName." ".$feedback->user->lastName : 'N/A' }}</span>
                        </td>
                        <td class="p-2">
                            <span class=" text-sm">{{ $feedback->type ? $feedback->type : 'N/A' }}</span>
                        </td>
                        <td class="p-2">
                            <span class=" text-sm">{{ $feedback->created_at->format('d M Y') }}</span>
                        </td>
                        <td class="p-2">
                            <span class=" text-sm">{{ $feedback->user->name }}</span>
                        </td>
                        <td class="p-2">
                            <span class=" text-sm">{{ $feedback->user->email }}</span>
                        </td>
                        <td class="p-2">
                            <span class=" text-sm">{{ $feedback->user->role }}</span>
                        </td>
                        <td class="p-2">
                            <span class=" text-sm">{{ $feedback->user->groupstagiaire ? $feedback->user->groupstagiaire->name : 'N/A' }}</span>
                        </td>
                        <td class="p-2">
                            <span class=" text-sm ">{{ $feedback->collection ? $feedback->collection->title : 'N/A' }}</span>
                        </td>

                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <script>
    const chartData = {
        'Stagiaires': {{ $stagiaires->count() }},
        'Formateurs': {{ $formateurs->count() }},
        'Collections': {{ $collections->count() }},
        'Groups': {{ $groups->count() }},
        'Feedbacks': {{ $feedbacks->count() }},
    };

        const ctx = document.getElementById('dashboardChart').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(chartData),
                datasets: [{
                    label: 'Nombre',
                    data: Object.values(chartData),
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6'
                    ],
                    borderColor: '#111827',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    </script>

</div>

@endSection