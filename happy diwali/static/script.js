
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function createFirework() {

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.55;

    const colors = [
        "#ffd166",
        "#ff9f43",
        "#fff2bd",
        "#ff5733",
        "#ffffff"
    ];

    for (let i = 0; i < 65; i++) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 80,
            color: colors[
                Math.floor(Math.random() * colors.length)
            ]
        });
    }
}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {

        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.025;
        p.life--;

        ctx.globalAlpha = Math.max(0, p.life / 80);
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }

    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);
}

animate();

setInterval(createFirework, 1200);


// WhatsApp and mobile sharing
async function shareDiwali() {

    const message =
        "🪔 Happy Diwali! शुभ दीपावली 🪔\n\n" +
        "May your life shine with happiness, prosperity, peace and success.\n\n" +
        "With Love & Best Wishes,\n" +
        "From Ghanshyam  ❤️";

    const shareData = {
        title: "Happy Diwali",
        text: message,
        url: window.location.href
    };

    if (navigator.share) {

        try {
            await navigator.share(shareData);
        } catch (error) {
            if (error.name !== "AbortError") {
                console.log(error);
            }
        }

    } else {

        const whatsappURL =
            "https://api.whatsapp.com/send?text=" +
            encodeURIComponent(message + "\n" + window.location.href);

        window.open(whatsappURL, "_blank");
    }
}
