document.addEventListener('DOMContentLoaded', () => {
    // Debounce function to limit how often a function is called
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // --- DYNAMIC DATE LOGIC ---
    const dateElement = document.getElementById('last-updated-date');
    if (dateElement) {
        const today = new Date();
        const pastDate = new Date(today.setDate(today.getDate() - 5)); // Set to a consistent 5 days ago
        const displayFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' });
        dateElement.textContent = `Last Updated: ${displayFormatter.format(pastDate)}`;
    }

    // --- SCROLL-BASED FUNCTIONALITY (PROGRESS BAR & BACK-TO-TOP) ---
    const progressBar = document.getElementById('progress-bar');
    const backToTopButton = document.getElementById('back-to-top');
    
    const handlePageScroll = () => {
        // Reading progress bar
        if (progressBar) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
        // Back to top button visibility
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }
    };
    
    // Back to top button click event
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- STICKY HEADER CTA LOGIC ---
    const header = document.getElementById('main-header');
    const ctaContainer = document.getElementById('sticky-cta-container');
    const navFlexContainer = header ? header.querySelector('.flex') : null;
    const scrollThreshold = 100; // Pixels to scroll before CTAs appear

    const handleScrollAndResizeForHeader = () => {
        if (!header || !ctaContainer || !navFlexContainer) return;
        
        const isScrolled = window.scrollY > scrollThreshold;
        const isMobile = window.innerWidth < 640;
        
        if (isMobile) {
            ctaContainer.classList.add('hidden');
            navFlexContainer.classList.add('justify-center');
            navFlexContainer.classList.remove('justify-between');
        } else {
            ctaContainer.classList.toggle('hidden', !isScrolled);
            ctaContainer.classList.toggle('sm:flex', isScrolled); 
            navFlexContainer.classList.toggle('justify-center', !isScrolled);
            navFlexContainer.classList.toggle('justify-between', isScrolled);
        }
    };

    // --- COMBINED EVENT LISTENERS ---
    window.addEventListener('scroll', debounce(() => {
        handlePageScroll();
        handleScrollAndResizeForHeader();
    }, 15));
    window.addEventListener('resize', debounce(handleScrollAndResizeForHeader, 50));
    
    // --- INITIAL CHECKS ON PAGE LOAD ---
    handlePageScroll();
    handleScrollAndResizeForHeader();

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
                        angleLines: { color: '#e5e7eb' },
                        grid: { color: '#e5e7eb' },
                        pointLabels: { font: { size: 14, weight: 'bold' }, color: '#374151' },
                        ticks: { backdropColor: 'transparent', stepSize: 2 },
                        min: 0,
                        max: 10
                    }
                },
                plugins: {
                    legend: { position: 'top', labels: { font: { size: 14 } } }
                }
            }
        });
    }

    // --- FEATURE COVERAGE DOUGHNUT CHART ---
    const featureCtx = document.getElementById('featureDoughnutChart');
    if (featureCtx) {
        new Chart(featureCtx, {
            type: 'doughnut',
            data: {
                labels: ['SEMrush Feature Coverage', 'KWFinder Feature Coverage'],
                datasets: [{
                    label: 'Feature Coverage of 35 Key Areas',
                    data: [33, 15],
                    backgroundColor: ['rgba(255, 110, 0, 0.7)', 'rgba(28, 178, 127, 0.7)'],
                    borderColor: ['rgba(255, 110, 0, 1)', 'rgba(28, 178, 127, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed !== null) {
                                    label += `${((context.parsed / 35) * 100).toFixed(0)}% (${context.parsed} of 35 features)`;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    // --- PRICING BAR CHART ---
    const pricingCtx = document.getElementById('pricingBarChart');
    if (pricingCtx) {
        new Chart(pricingCtx, {
            type: 'bar',
            data: {
                labels: ['SEMrush Base Plan', 'KWFinder Base Plan'],
                datasets: [
                    {
                        label: 'Starting Price ($/mo)',
                        data: [119, 49],
                        backgroundColor: 'rgba(227, 64, 55, 0.7)',
                        borderColor: 'rgba(227, 64, 55, 1)',
                        borderWidth: 1,
                        yAxisID: 'y-price',
                    },
                    {
                        label: 'Keywords Tracked',
                        data: [500, 200],
                        backgroundColor: 'rgba(59, 130, 246, 0.7)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 1,
                        yAxisID: 'y-keywords',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                 plugins: { legend: { display: true, position: 'top' } },
                scales: {
                    'y-price': {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: { display: true, text: 'Price ($/mo)' }
                    },
                    'y-keywords': {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: { display: true, text: 'Keywords Tracked' },
                        grid: { drawOnChartArea: false },
                    }
                }
            }
        });
    }
    
    // --- USER PROFILE BAR CHART ---
    const userProfileCtx = document.getElementById('userProfileChart');
    if (userProfileCtx) {
        new Chart(userProfileCtx, {
            type: 'bar',
            data: {
                labels: ['Bloggers', 'Freelancers/SMBs', 'Agencies'],
                datasets: [
                    {
                        label: 'KWFinder Suitability',
                        data: [90, 70, 20],
                        backgroundColor: 'rgba(28, 178, 127, 0.7)',
                        borderColor: 'rgba(28, 178, 127, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'SEMrush Suitability',
                        data: [40, 80, 100],
                        backgroundColor: 'rgba(255, 110, 0, 0.7)',
                        borderColor: 'rgba(255, 110, 0, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${context.raw}%` } }
                },
                scales: { x: { title: { display: true, text: 'Suitability Score (%)' } } }
            }
        });
    }

    // --- INTERACTIVE QUIZ LOGIC ---
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        const questions = quizContainer.querySelectorAll('.quiz-question');
        const resultContainer = document.getElementById('quiz-result');
        const recommendationHeading = document.getElementById('tool-recommendation-heading');
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
            let semrushPoints = 0, mangoolsPoints = 0;

            if (answers.question1 === 'pro' || answers.question3 === 'agency') semrushPoints += 2;
            if (answers.question1 === 'beginner' || answers.question3 === 'blogger') mangoolsPoints += 2;
            if (answers.question1 === 'intermediate' || answers.question3 === 'freelancer') { semrushPoints++; mangoolsPoints++; }
            if (answers.question2 === 'high') semrushPoints += 2;
            if (answers.question2 === 'low') mangoolsPoints += 2;
            if (answers.question2 === 'medium') { semrushPoints++; mangoolsPoints++; }
            if (answers.question4 === 'audits' || answers.question4 === 'reporting') semrushPoints += 2;
            if (answers.question4 === 'keywords') mangoolsPoints += 2;
            if (answers.question5 === 'critical') semrushPoints += 2;
            if (answers.question5 === 'not_important') mangoolsPoints += 2;

            // New question scoring
            if (answers.question6 === 'comprehensive') semrushPoints += 2;
            if (answers.question6 === 'basic') mangoolsPoints++;
            if (answers.question6 === 'detailed') { semrushPoints++; mangoolsPoints++; }
            
            if (answers.question7 === 'strategy') semrushPoints += 2;
            if (answers.question7 === 'blogging') mangoolsPoints += 2;
            if (answers.question7 === 'optimization') { semrushPoints++; mangoolsPoints++; }

            if (answers.question8 === 'critical-health') semrushPoints += 2;
            if (answers.question8 === 'low-priority') mangoolsPoints += 2;
            if (answers.question8 === 'basics') { semrushPoints++; mangoolsPoints++; }

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
            } else {
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
            
            if (resultContainer && recommendationHeading && recommendationText && recommendationPlan && recommendationFeature && recommendationLink) {
                recommendationHeading.textContent = `Your Recommendation: ${details.name}`;
                recommendationText.textContent = details.text;
                recommendationPlan.textContent = details.plan;
                recommendationFeature.textContent = details.feature;
                recommendationLink.href = details.link;
                recommendationLink.className = `cta-button mt-4 ${details.ctaClass}`;
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
                popupImg.alt = image.alt;
            });
        });

        const closePopup = () => popup.classList.add('hidden');
        closeBtn.addEventListener('click', closePopup);
        popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !popup.classList.contains('hidden')) closePopup(); });
    }
});

// --- SOCIAL SHARING LOGIC ---
const shareOnTwitter = document.getElementById('share-twitter');
const shareOnFacebook = document.getElementById('share-facebook');

if (shareOnTwitter && shareOnFacebook) {
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`
    };

    shareOnTwitter.href = shareUrls.twitter;
    shareOnFacebook.href = shareUrls.facebook;

    document.querySelectorAll('.share-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.href;
            const windowOptions = 'width=600,height=400,scrollbars=yes,resizable=yes';
            window.open(url, 'Share', windowOptions);
        });
    });
}
