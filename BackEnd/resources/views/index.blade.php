@extends('Layout')
@section('title','index')


@section('content')

<div class="grid grid-cols-2 gap-4">

    <div class="bg-[#163050] rounded-lg p-6">
        <h2 class="text-lg font-semibold text-white mb-4">Satisfaction Rate</h2>
        <p class="text-sm text-gray-400 mb-4">From all projects</p>
        <div class="relative w-24 h-24 mx-auto mb-4">
            <svg class="w-full h-full" viewBox="0 0 100 100">
                <circle class="text-blue-500 stroke-current stroke-2" stroke-dasharray="283 283" stroke-dashoffset="283" cx="50" cy="50" r="45" fill="transparent" />
                <circle class="text-blue-500 stroke-current stroke-2" stroke-dasharray="283 283" stroke-dashoffset="{{ 283 - (283 * 0.95) }}" cx="50" cy="50" r="45" fill="transparent" />
            </svg>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9.75 9.75c1.036 0 1.837.41 2.45 6.75 3 2.613-.61 4.41-1.41 6.75-2.45M12 10a7 7 0 00-7 7c0 2.59 1.038 5 3.45 6.55A12.97 12.97 0 0012 20.25a12.97 12.97 0 003.55-1.7C19.962 18 21 15.41 21 12.75a7 7 0 00-7-7z"></path>
                </svg>
            </div>
        </div>
        <div class="text-center">
            <p class="text-3xl font-bold text-white">95%</p>
            <p class="text-sm text-gray-400">Based on likes</p>
        </div>
    </div>

    <div class="bg-[#163050] rounded-lg p-6">
        <h2 class="text-lg font-semibold text-white mb-4">Referral Tracking</h2>
        <div class="flex items-center justify-between mb-4">
            <div>
                <p class="text-sm text-gray-400">Invited</p>
                <p class="text-2xl font-semibold text-white">145 people</p>
            </div>
            <div class="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <p class="text-white font-bold">9.3</p>
            </div>
        </div>
        <p class="text-sm text-gray-400">Bonus</p>
        <p class="text-2xl font-semibold text-white">1,465</p>
        <p class="text-sm text-gray-400 mt-2">Safety</p>
        <p class="text-sm text-gray-400">Total Score</p>
    </div>

    <div class="bg-[#163050] rounded-lg p-6 col-span-2">
        <h2 class="text-lg font-semibold text-white mb-4">Active Users</h2>
        <div class="relative h-40">
            <canvas id="userChart"></canvas>
        </div>
        <div class="mt-4">
            <p class="text-sm text-gray-400">(+23) than last week</p>
            <p class="text-2xl font-semibold text-white">32,984</p>
            <p class="text-sm text-gray-400">Users</p>
        </div>
    </div>

    <div class="bg-[#163050] rounded-lg p-6 col-span-2">
        <h2 class="text-lg font-semibold text-white mb-4">Active Users</h2>
        <div class="relative h-40">
            <canvas id="barChart"></canvas>
        </div>
        <div class="mt-4">
            <p class="text-sm text-gray-400">(+23) than last week</p>
            <p class="text-2xl font-semibold text-white">32,984</p>
            <p class="text-sm text-gray-400">Users</p>
        </div>
    </div>

</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const userChart = new Chart(document.getElementById('userChart'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                data: [100, 150, 200, 300, 250, 350, 400, 450, 500, 480, 520, 550],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.4
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'white'
                    }
                }
            }
        }
    });

    const barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [{
                data: [100, 150, 200, 300, 250, 350, 400, 450, 500, 480],
                backgroundColor: 'rgb(54, 162, 235)',
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'white'
                    }
                }
            }
        }
    });
</script>
@endSection