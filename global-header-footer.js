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
});
