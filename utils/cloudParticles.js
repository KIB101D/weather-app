// src/js/utils/cloudParticles.js

export const initCloudParticles = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2';
    canvas.style.opacity = '0.8';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let clouds = [];

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Cloud {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = -200 - Math.random() * 300;
            this.y = Math.random() * (canvas.height * 1);
            this.size = Math.random() * 100 + 80;
            this.speedX = Math.random() * 0.8 + 0.4;
            this.opacity = Math.random() * 0.4 + 0.6;
        }

        update() {
            this.x += this.speedX;
            if (this.x > canvas.width + 200) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#ffffff';
            const s = this.size;
            ctx.beginPath();
            ctx.arc(this.x, this.y, s * 0.4, 0, Math.PI * 2);
            ctx.arc(this.x + s * 0.35, this.y - s * 0.1, s * 0.5, 0, Math.PI * 2);
            ctx.arc(this.x + s * 0.7, this.y, s * 0.45, 0, Math.PI * 2);
            ctx.arc(this.x + s * 0.4, this.y + s * 0.15, s * 0.35, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Create 8-12 clouds
    const numClouds = window.innerWidth > 768 ? 12 : 8;
    for (let i = 0; i < numClouds; i++) {
        clouds.push(new Cloud());
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        clouds.forEach(cloud => {
            cloud.update();
            cloud.draw();
        });
        requestAnimationFrame(animate);
    };

    animate();
};