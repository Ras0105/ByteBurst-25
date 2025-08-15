document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initCharts();
    
    // Rating system
    setupRating();
    
    // Feedback form submission
    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your feedback!');
        this.reset();
        resetStars();
    });
    
    // Queue management
    document.getElementById('checkPriorityBtn').addEventListener('click', function() {
        const classTime = document.getElementById('classTime').value;
        if (!classTime) {
            showPriorityResult('Please select your next class time', 'warning');
            return;
        }
        
        const now = new Date();
        const [hours, minutes] = classTime.split(':');
        const classDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        
        const diffInHours = (classDateTime - now) / (1000 * 60 * 60);
        
        if (diffInHours <= 1 && diffInHours >= 0) {
            showPriorityResult('You qualify for priority queue!', 'success');
        } else {
            showPriorityResult('Regular queue - your class is not within the next hour', 'info');
        }
    });
    
    // Join queue button
    document.getElementById('joinQueueBtn').addEventListener('click', function() {
        alert('You have joined the queue. We will notify you when your turn is approaching.');
    });
    
    // Trivia game
    document.getElementById('submitTrivia').addEventListener('click', function() {
        const selectedOption = document.querySelector('.trivia-options .btn-primary');
        if (selectedOption && selectedOption.textContent === 'Chickpeas') {
            showTriviaResult('Correct! Chickpeas are the main ingredient in hummus. You earned 5 points!', 'success');
        } else {
            showTriviaResult('Oops! The correct answer is Chickpeas. Try again tomorrow!', 'danger');
        }
    });
    
    // Setup trivia option selection
    document.querySelectorAll('.trivia-options button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.trivia-options button').forEach(b => {
                b.classList.remove('btn-primary');
                b.classList.add('btn-outline-primary');
            });
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-primary');
        });
    });
    
    // Spin the wheel game
    setupWheel();
});

function initCharts() {
    // Rush Hour Chart
    const rushHourCtx = document.getElementById('rushHourChart').getContext('2d');
    const rushHourChart = new Chart(rushHourCtx, {
        type: 'bar',
        data: {
            labels: ['7-8 AM', '8-9 AM', '12-1 PM', '1-2 PM', '6-7 PM', '7-8 PM'],
            datasets: [{
                label: 'Number of Diners',
                data: [45, 120, 210, 180, 150, 90],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
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
    
    // Dish Popularity Chart
    const dishPopularityCtx = document.getElementById('dishPopularityChart').getContext('2d');
    const dishPopularityChart = new Chart(dishPopularityCtx, {
        type: 'doughnut',
        data: {
            labels: ['Butter Chicken', 'Vegetable Biryani', 'Dal Fry', 'Paneer Tikka', 'Noodles'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}

function setupRating() {
    const stars = document.querySelectorAll('.rating i');
    const ratingValue = document.getElementById('ratingValue');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingValue.value = rating;
            
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
        
        star.addEventListener('mouseover', function() {
            const hoverRating = parseInt(this.getAttribute('data-rating'));
            
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= hoverRating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            const currentRating = parseInt(ratingValue.value);
            
            stars.forEach(s => {
                const starRating = parseInt(s.getAttribute('data-rating'));
                
                if (starRating > currentRating) {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
}

function resetStars() {
    const stars = document.querySelectorAll('.rating i');
    const ratingValue = document.getElementById('ratingValue');
    
    ratingValue.value = 0;
    stars.forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
    });
}

function showPriorityResult(message, type) {
    const resultDiv = document.getElementById('priorityResult');
    resultDiv.textContent = message;
    resultDiv.className = `alert alert-${type} d-block`;
    
    setTimeout(() => {
        resultDiv.classList.add('d-none');
    }, 5000);
}

function showTriviaResult(message, type) {
    const resultDiv = document.getElementById('triviaResult');
    resultDiv.textContent = message;
    resultDiv.className = `alert alert-${type} d-block`;
}

function setupWheel() {
    const wheelCanvas = document.getElementById('wheelCanvas');
    const ctx = wheelCanvas.getContext('2d');
    const prizes = ['5% Off', 'Free Drink', '10% Off', 'Try Again', 'Free Dessert', '20% Off'];
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    let currentRotation = 0;
    let spinning = false;
    
    function drawWheel() {
        ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
        
        const centerX = wheelCanvas.width / 2;
        const centerY = wheelCanvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        
        // Draw wheel segments
        const segmentAngle = (2 * Math.PI) / prizes.length;
        
        for (let i = 0; i < prizes.length; i++) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, 
                   currentRotation + i * segmentAngle, 
                   currentRotation + (i + 1) * segmentAngle);
            ctx.closePath();
            ctx.fillStyle = colors[i];
            ctx.fill();
            
            // Draw text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(currentRotation + i * segmentAngle + segmentAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Arial';
            ctx.fillText(prizes[i], radius - 10, 5);
            ctx.restore();
        }
        
        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.stroke();
        
        // Draw pointer
        ctx.beginPath();
        ctx.moveTo(centerX + radius + 5, centerY);
        ctx.lineTo(centerX + radius + 15, centerY - 10);
        ctx.lineTo(centerX + radius + 15, centerY + 10);
        ctx.closePath();
        ctx.fillStyle = '#ff0000';
        ctx.fill();
    }
    
    document.getElementById('spinWheelBtn').addEventListener('click', function() {
        if (spinning) return;
        
        spinning = true;
        this.disabled = true;
        
        const spinDuration = 4000; // 4 seconds
        const startTime = Date.now();
        const startRotation = currentRotation;
        const spinRotations = 5 + Math.random() * 5; // 5-10 full rotations
        
        function animateSpin() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / spinDuration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Easing function
            
            currentRotation = startRotation + easeProgress * spinRotations * Math.PI * 2;
            drawWheel();
            
            if (progress < 1) {
                requestAnimationFrame(animateSpin);
            } else {
                spinning = false;
                this.disabled = false;
                
                // Determine prize
                const normalizedRotation = currentRotation % (Math.PI * 2);
                const segmentAngle = (2 * Math.PI) / prizes.length;
                const winningIndex = Math.floor(((2 * Math.PI) - normalizedRotation) / segmentAngle) % prizes.length;
                const prize = prizes[winningIndex];
                
                const resultDiv = document.getElementById('wheelResult');
                resultDiv.textContent = `You won: ${prize}!`;
                resultDiv.className = `alert alert-success d-block mt-3`;
                
                setTimeout(() => {
                    resultDiv.classList.add('d-none');
                }, 5000);
            }
        }
        
        animateSpin();
    });
    
    // Initial draw
    drawWheel();
}


