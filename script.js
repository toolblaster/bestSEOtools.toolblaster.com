document.addEventListener('DOMContentLoaded', () => {
    // --- DYNAMIC DATE LOGIC ---
    const dateElement = document.getElementById('last-updated-date');
    const schemaElement = document.getElementById('schema-data');

    if (dateElement) {
        const daysAgoOptions = [3, 5, 7];
        const daysAgo = daysAgoOptions[Math.floor(Math.random() * daysAgoOptions.length)];
        
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - daysAgo);

        const displayFormatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const formattedDisplayDate = displayFormatter.format(pastDate);
        dateElement.textContent = `Last Updated: ${formattedDisplayDate}`;
        
        if (schemaElement) {
            const schemaDate = pastDate.toISOString().split('T')[0];
            
            try {
                const schemaJson = JSON.parse(schemaElement.textContent);
                const articleSchema = schemaJson['@graph'].find(item => item['@type'] === 'Article');
                if (articleSchema) {
                    articleSchema.dateModified = schemaDate;
                }
                schemaElement.textContent = JSON.stringify(schemaJson, null, 2);
            } catch (e) {
                console.error("Failed to parse or update schema JSON:", e);
            }
        }
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
                    link: "#", // Add SEMrush affiliate link
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
});
