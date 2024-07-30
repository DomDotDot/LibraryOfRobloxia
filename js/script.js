fetch('images/images.json')
    .then(response => response.json())
    .then(data => {
        // Update the image sources in the HTML
        updateImageSource(document.querySelector('.logo'), data.logo);
        updateImageSource(document.querySelector('.hero-image'), data.heroImages[0]);
        updateImageSource(document.querySelector('.game-logo img'), data.gameLogo);
        updateImageSource(document.querySelectorAll('.nav-buttons .nav-button img')[0], data.abnormalities);
        updateImageSource(document.querySelectorAll('.nav-buttons .nav-button img')[1], data.energy);
        updateImageSource(document.querySelectorAll('.nav-buttons .nav-button img')[2], data.facilityMap);
        updateImageSource(document.querySelectorAll('.nav-buttons .nav-button img')[3], data.cityMap);
        updateImageSource(document.querySelectorAll('.footer-links img')[0], data.robloxIcon);
        updateImageSource(document.querySelectorAll('.footer-links img')[1], data.discordIcon);
        updateImageSource(document.querySelectorAll('.footer-links img')[2], data.githubIcon);

        // Rest of the JavaScript code...
        const heroImages = data.heroImages;
        const heroImage = document.getElementById('heroImage');
        const navBullets = document.getElementById('navBullets');
        let currentImageIndex = 0;

        // Create navigation bullets
        heroImages.forEach((_, index) => {
            const bullet = document.createElement('div');
            bullet.classList.add('bullet');
            if (index === 0) bullet.classList.add('active');
            bullet.addEventListener('click', () => changeImage(index));
            navBullets.appendChild(bullet);
        });

        function changeImage(index) {
            heroImage.style.opacity = 0;
            setTimeout(() => {
                updateImageSource(heroImage, heroImages[index]);
                heroImage.style.opacity = 1;
                updateBullets(index);
            }, 500);
            currentImageIndex = index;
        }

        function updateBullets(activeIndex) {
            const bullets = navBullets.getElementsByClassName('bullet');
            for (let i = 0; i < bullets.length; i++) {
                bullets[i].classList.toggle('active', i === activeIndex);
            }
        }

        // Auto-rotate images
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            changeImage(currentImageIndex);
        }, 5000);

        // Burger menu functionality
        const burgerMenu = document.querySelector('.burger-menu');
        burgerMenu.addEventListener('click', () => {
            alert('Menu opened!'); // Replace with actual menu opening logic
        });

        // Account icon functionality
        const accountIcon = document.querySelector('.account-icon');
        accountIcon.addEventListener('click', () => {
            alert('Account page opened!'); // Replace with actual account page logic
        });
    })
    .catch(error => console.error('Error fetching image sources:', error));

function updateImageSource(imgElement, imageSrc) {
    const placeholderTemplate = 'https://via.placeholder.com/{width}x{height}.png?text={text}';
    const width = 300; // Adjust the default width as needed
    const height = 200; // Adjust the default height as needed
    const defaultText = 'Image not found'; // Adjust the default text as needed

    const img = new Image();
    img.onload = () => {
        imgElement.src = imageSrc;
    };
    img.onerror = () => {
        const placeholderUrl = placeholderTemplate
            .replace('{width}', width)
            .replace('{height}', height)
            .replace('{text}', encodeURIComponent(defaultText));
        imgElement.src = placeholderUrl;
    };
    img.src = imageSrc;
}