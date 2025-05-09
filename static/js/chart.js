document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('featureChart')) {
        try {
            const response = await fetch('/data');
            const data = await response.json();
            
            // Feature Distribution Chart
            const featureChart = new Chart(document.getElementById('featureChart'), {
                type: 'bar',
                data: {
                    labels: ['num_of_prev_attempts', 'studied_credits', 'forumng', 'oucontent', 'quiz', 'resource'],
                    datasets: [{
                        label: 'Average Value',
                        data: [
                            data.feature_means.num_of_prev_attempts,
                            data.feature_means.studied_credits,
                            data.feature_means.forumng,
                            data.feature_means.oucontent,
                            data.feature_means.quiz,
                            data.feature_means.resource
                        ],
                        backgroundColor: '#00a8cc',
                        borderColor: '#007a99',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: 'Average Value' } }
                    },
                    plugins: { legend: { display: true } }
                }
            });
            
            // Outcome Distribution Chart
            const outcomeChart = new Chart(document.getElementById('outcomeChart'), {
                type: 'pie',
                data: {
                    labels: Object.keys(data.outcome_counts),
                    datasets: [{
                        label: 'Outcome Distribution',
                        data: Object.values(data.outcome_counts),
                        backgroundColor: ['#a30000', '#00a8cc', '#f4a261', '#2a9d8f'],
                        borderColor: '#e8f0f2',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'top' } }
                }
            });
        } catch (err) {
            console.error('Error loading charts:', err);
            document.getElementById('featureChart').parentElement.innerHTML = '<p>Error loading charts. Please check the dataset.</p>';
        }
    }
});