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
                &copy; 2025 bestseotools.toolblaster.com by <a href="https://x.com/Vikasrana03" target="_blank" rel="noopener noreferrer" class="hover:text-white underline">Vikas Rana</a> - All Rights Reserved | 
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
                &copy; 2025 bestseotools.toolblaster.com by <a href="https://x.com/Vikasrana03" target="_blank" rel="noopener noreferrer" class="hover:text-white underline">Vikas Rana</a> - All Rights Reserved | 
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
            <a href="#" id="share-x" class="share-button x" target="_blank" rel="noopener noreferrer" aria-label="Share on X">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" id="share-facebook" class="share-button facebook" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
            <a href="#" id="share-whatsapp" class="share-button whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.273-.099-.471-.148-.67.148-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.67-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.523.074-.797.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
            <a href="#" id="share-linkedin" class="share-button linkedin" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-4.484 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.594-11.018-3.714v-2.155z"/></svg>
            </a>
            <a href="#" id="share-telegram" class="share-button telegram" target="_blank" rel="noopener noreferrer" aria-label="Share on Telegram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.28 1.4.24 1.15.99l-2.64 12.14c-.25.92-1 .94-1.5.43l-3.89-3.13-1.87 1.83c-.22.21-.4.41-.7.41z"/></svg>
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
    const shareOnX = document.getElementById('share-x');
    const shareOnFacebook = document.getElementById('share-facebook');
    const shareOnWhatsApp = document.getElementById('share-whatsapp');
    const shareOnLinkedIn = document.getElementById('share-linkedin');
    const shareOnTelegram = document.getElementById('share-telegram');

    if (shareOnX && shareOnFacebook && shareOnWhatsApp && shareOnLinkedIn && shareOnTelegram) {
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);

        const shareUrls = {
            x: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
            whatsapp: `https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}`,
            linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`,
            telegram: `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`
        };

        shareOnX.href = shareUrls.x;
        shareOnFacebook.href = shareUrls.facebook;
        shareOnWhatsApp.href = shareUrls.whatsapp;
        shareOnLinkedIn.href = shareUrls.linkedin;
        shareOnTelegram.href = shareUrls.telegram;

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
