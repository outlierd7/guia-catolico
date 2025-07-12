// Quick image fix for quiz performance
(function() {
    const imageMap = {
        '8c41db4d-6243-427f-8631-797758b8121f': './images/img1.jpg',
        'd661ae3f-2f6b-4f8c-bd4e-fcd7d37d9487': './images/img2.jpg',
        'd7f4ab85-80de-4674-abc8-8e13370c2b86': './images/img3.jpg'
    };
    
    // Intercept image requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        if (typeof url === 'string' && url.includes('cdn.xquiz.co/images/')) {
            for (const [uuid, localPath] of Object.entries(imageMap)) {
                if (url.includes(uuid)) {
                    args[0] = localPath;
                    break;
                }
            }
        }
        return originalFetch.apply(this, args);
    };
    
    // Quick DOM fix for existing images
    setTimeout(() => {
        document.querySelectorAll('img[src*="cdn.xquiz.co"]').forEach(img => {
            for (const [uuid, localPath] of Object.entries(imageMap)) {
                if (img.src.includes(uuid)) {
                    img.src = localPath;
                    break;
                }
            }
        });
    }, 500);
})(); 