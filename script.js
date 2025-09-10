document.addEventListener('DOMContentLoaded', () => {
    // --- DYNAMIC DATE LOGIC ---
    const dateElement = document.getElementById('last-updated-date');
    if (dateElement) {
        const today = new Date();
        const pastDate = new Date(today.setDate(today.getDate() - 5)); // Set to a consistent 5 days ago
        const displayFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        dateElement.textContent = `Last Updated: ${displayFormatter.format(pastDate)}`;
    }

    // --- VISUAL SUMMARY CHART ---
    const ctx = document.getElementById('seoToolChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Features', 'Ease of Use', 'Value for Money', 'Support', 'Data Accuracy'],
                datasets: [{
                    label: 'SEMrush',
                    data: [9, 6, 8, 9, 9],
                    backgroundColor: 'rgba(255, 110, 0, 0.2)',
                    borderColor: 'rgba(255, 110, 0, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 110, 0, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 110, 0, 1)'
                }, {
                    label: 'KWFinder (Mangools)',
                    data: [7, 9, 9, 8, 8],
                    backgroundColor: 'rgba(28, 178, 127, 0.2)',
                    borderColor: 'rgba(28, 178, 127, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(28, 178, 127, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(28, 178, 127, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: '#e5e7eb'
                        },
                        grid: {
                            color: '#e5e7eb'
                        },
                        pointLabels: {
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            color: '#374151'
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            stepSize: 2
                        },
                         min: 0,
                         max: 10
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                         labels: {
                            font: {
                                size: 14
                            }
                        }
                    }
                }
            }
        });
    }

    // --- INTERACTIVE QUIZ LOGIC ---
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        const questions = quizContainer.querySelectorAll('.quiz-question');
        const resultContainer = document.getElementById('quiz-result');
        const recommendationName = document.getElementById('tool-recommendation-name');
        const recommendationText = document.getElementById('tool-recommendation-text');
        const recommendationPlan = document.getElementById('tool-recommendation-plan');
        const recommendationFeature = document.getElementById('tool-recommendation-feature');
        const recommendationLink = document.getElementById('tool-recommendation-link');
        const answers = {};

        quizContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('quiz-option')) {
                const questionDiv = e.target.closest('.quiz-question');
                if (!questionDiv) return;

                const questionId = questionDiv.id;
                const answerValue = e.target.dataset.value;

                answers[questionId] = answerValue;
                
                questionDiv.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
                e.target.classList.add('selected');

                const currentQuestionIndex = Array.from(questions).indexOf(questionDiv);

                if (currentQuestionIndex < questions.length - 1) {
                    setTimeout(() => {
                        questionDiv.classList.add('hidden');
                        questions[currentQuestionIndex + 1].classList.remove('hidden');
                    }, 300);
                } else {
                    setTimeout(showResult, 300);
                }
            }
        });

        function showResult() {
            questions.forEach(q => q.classList.add('hidden'));
            
            let semrushPoints = 0;
            let mangoolsPoints = 0;

            if (answers.question1 === 'pro' || answers.question1 === 'agency') semrushPoints += 2;
            if (answers.question1 === 'beginner') mangoolsPoints += 2;

            if (answers.question2 === 'high') semrushPoints += 2;
            if (answers.question2 === 'low') mangoolsPoints += 2;

            if (answers.question3 === 'agency') semrushPoints += 2;
            if (answers.question3 === 'blogger' || answers.question3 === 'freelancer') mangoolsPoints += 1;
            
            if (answers.question4 === 'audits' || answers.question4 === 'reporting') semrushPoints += 2;
            if (answers.question4 === 'keywords') mangoolsPoints += 2;

            if (answers.question5 === 'critical') semrushPoints += 2;
            if (answers.question5 === 'not_important') mangoolsPoints += 2;

            const recommendation = semrushPoints > mangoolsPoints ? 'SEMrush' : 'KWFinder (Mangools)';

            let details = {};

            if (recommendation === 'SEMrush') {
                details = {
                    name: 'SEMrush',
                    text: "Based on your need for advanced features and comprehensive data, SEMrush is the ideal all-in-one platform to scale your SEO efforts.",
                    plan: "Guru Plan",
                    feature: "Automated client reporting and in-depth site audits.",
                    link: "https://semrush.com/pricing", 
                    ctaClass: "cta-semrush"
                };
                if (answers.question3 === 'freelancer' && answers.question2 !== 'high') {
                    details.plan = "Pro Plan";
                    details.feature = "Comprehensive competitor analysis tools.";
                }
            } else { // KWFinder (Mangools)
                details = {
                    name: 'KWFinder (Mangools)',
                    text: "For your focus on core SEO tasks with an emphasis on usability and budget, the Mangools suite is the perfect fit.",
                    plan: "Premium Plan",
                    feature: "Excellent keyword research with a user-friendly interface.",
                    link: "https://mangools.com#a5ebaddebfeebf80fc747e102",
                    ctaClass: "cta-mangools"
                };
                if (answers.question1 === 'beginner' && answers.question2 === 'low') {
                    details.plan = "Basic Plan";
                    details.feature = "Finding low-competition keywords quickly.";
                }
            }
            
            if (resultContainer && recommendationName && recommendationText && recommendationPlan && recommendationFeature && recommendationLink) {
                recommendationName.textContent = details.name;
                recommendationText.textContent = details.text;
                recommendationPlan.textContent = details.plan;
                recommendationFeature.textContent = details.feature;
                recommendationLink.href = details.link;
                recommendationLink.className = `cta-button mt-4 ${details.ctaClass}`; // Reset and apply classes
                
                resultContainer.classList.remove('hidden');
            }
        }
    }

    // --- IMAGE POPUP LOGIC ---
    const popup = document.getElementById('image-popup');
    const popupImg = document.getElementById('popup-img');
    const closeBtn = document.querySelector('.close-popup');
    const imagesToPopup = document.querySelectorAll('.workflow-image, .highlight-image');

    if (popup && popupImg && closeBtn && imagesToPopup.length > 0) {
        imagesToPopup.forEach(image => {
            image.addEventListener('click', () => {
                popup.classList.remove('hidden');
                popupImg.src = image.src;
                popupImg.alt = image.alt; // Copy alt text for accessibility
            });
        });

        const closePopup = () => {
            popup.classList.add('hidden');
        };

        closeBtn.addEventListener('click', closePopup);
        
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !popup.classList.contains('hidden')) {
                closePopup();
            }
        });
    }

    // --- BACK TO TOP BUTTON LOGIC ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
