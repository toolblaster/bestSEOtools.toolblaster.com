document.addEventListener('DOMContentLoaded', function() {
    // --- HTML TEMPLATES ---

    // Template for the header on the main page (index.html)
    const indexHeader = `
    <header id="main-header" class="bg-white shadow-md z-50 sticky top-0 transition-all duration-300">
        <nav class="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
            <div class="flex items-center justify-center h-16">
                <a href="/" class="header-logo inline-block text-center" aria-label="Back to Homepage">
                    <div class="pb-1 border-b border-black">
                        <div class="header-logo-main text-sm sm:text-xl font-bold text-gray-800 flex items-center justify-center">
                           <svg class="w-7 h-7 sm:w-8 sm:h-8 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 3v18h18"/>
                                <path d="m18 9-6 6-4-4-3 3"/>
                           </svg>
                           <span class="text-gray-900">BestSEOTools.toolblaster.com</span>
                        </div>
                    </div>
                    <p class="header-logo-slogan text-gray-400 tracking-wider text-[0.65rem] sm:text-xs pt-1">Compare • Analyze • Rank</p>
                </a>
                <div id="sticky-cta-container" class="hidden items-center space-x-2">
                    <a href="https://semrush.com/pricing" rel="nofollow sponsored" class="cta-button cta-semrush !text-sm !py-2 !px-4">Try SEMrush</a>
                    <a href="https://mangools.com#a5ebaddebfeebf80fc747e102" rel="nofollow sponsored" class="cta-button cta-mangools !text-sm !py-2 !px-4">Try KWFinder</a>
                </div>
            </div>
        </nav>
    </header>`;

    // Template for the footer on the main page (index.html)
    const indexFooter = `
    <footer class="bg-gray-900 text-white py-4">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-xs text-gray-300">
                &copy; 2025 bestseotools.toolblaster.com by Vikas Rana - All Rights Reserved | 
                <a href="/contact-us-and-legal.html" class="hover:text-white underline">Contact & Legal</a> |
                <a href="https://toolblaster.com" target="_blank" rel="noopener" class="hover:text-white underline">toolblaster.com</a>
            </p>
        </div>
    </footer>`;

    // Template for the header on the contact/legal page
    const contactHeader = `
    <header id="main-header" class="bg-white shadow-md z-50 sticky top-0 transition-all duration-300">
        <nav class="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
            <div class="flex items-center justify-center h-16">
                <a href="/" class="header-logo inline-block text-center" aria-label="Back to Homepage">
                    <div class="pb-1 border-b border-black">
                        <div class="header-logo-main text-xl font-bold text-gray-800 flex items-center justify-center">
                           <svg class="w-8 h-8 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                               <path d="M3 3v18h18"/>
                               <path d="m18 9-6 6-4-4-3 3"/>
                           </svg>
                           <span class="text-gray-900">BestSEOTools.toolblaster.com</span>
                        </div>
                    </div>
                    <p class="header-logo-slogan text-gray-400 tracking-wider text-xs pt-1">Compare • Analyze • Rank</p>
                </a>
            </div>
        </nav>
    </header>`;

    // Template for the footer on the contact/legal page
    const contactFooter = `
    <footer class="bg-gray-900 text-white py-4">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-xs text-gray-300">
                &copy; 2025 bestseotools.toolblaster.com by Vikas Rana - All Rights Reserved | 
                <a href="/contact-us-and-legal.html" class="hover:text-white underline">Contact & Legal</a>
            </p>
        </div>
    </footer>`;
    
    // Template for the social share section
    const shareSection = `
    <section id="share-section" class="section-wrapper text-center fade-in-section">
        <h2>Did You Find This Guide Helpful?</h2>
        <p class="text-gray-600">If this comparison helped you, share it with others who might find it useful!</p>
        <div class="share-buttons">
            <a href="#" id="share-twitter" class="share-button twitter" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.063c0 2.296 1.619 4.34 3.861 4.782-.62.17-1.284.21-1.947.07.643 1.948 2.522 3.28 4.7 3.321-1.666 1.309-3.727 2.05-5.923 2.05-1.12 0-2.224-.07-3.315-.195 2.15 1.393 4.67 2.209 7.377 2.209 8.86 0 13.682-7.35 13.682-13.682 0-.208-.005-.415-.012-.622.94-.678 1.75-1.52 2.4-2.487z"/></svg>
                <span>Share on Twitter</span>
            </a>
            <a href="#" id="share-facebook" class="share-button facebook" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                <span>Share on Facebook</span>
            </a>
        </div>
    </section>`;

    // --- INJECTION LOGIC ---
    // Finds the placeholder IDs in the HTML and replaces them with the correct templates.

    const indexHeaderPlaceholder = document.getElementById('index-header-placeholder');
    if (indexHeaderPlaceholder) {
        indexHeaderPlaceholder.outerHTML = indexHeader;
    }

    const indexFooterPlaceholder = document.getElementById('index-footer-placeholder');
    if (indexFooterPlaceholder) {
        indexFooterPlaceholder.outerHTML = indexFooter;
    }

    const contactHeaderPlaceholder = document.getElementById('contact-header-placeholder');
    if (contactHeaderPlaceholder) {
        contactHeaderPlaceholder.outerHTML = contactHeader;
    }

    const contactFooterPlaceholder = document.getElementById('contact-footer-placeholder');
    if (contactFooterPlaceholder) {
        contactFooterPlaceholder.outerHTML = contactFooter;
    }
    
    const shareSectionPlaceholder = document.getElementById('share-section-placeholder');
    if (shareSectionPlaceholder) {
        shareSectionPlaceholder.outerHTML = shareSection;
    }

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
});
