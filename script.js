const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const damlalar = [];

class Damla {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vy = 0; // Dikey hız
        this.r = Math.random() * 10 + 5; // Yarıçap
        this.renk = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`;
    }

    ciz() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.renk;
        ctx.fill();
    }

    guncelle() {
        this.vy += 0.1; // Yerçekimi
        this.y += this.vy;

        // Fare ile etkileşim
        const fareX = event.clientX;
        const fareY = event.clientY;
        const mesafe = Math.sqrt((fareX - this.x) ** 2 + (fareY - this.y) ** 2);

        if (mesafe < this.r * 2) {
            this.vy = -5; // Fareye yaklaşıldığında yukarı doğru itme
        }

        // Ekran dışına çıkma kontrolü
        if (this.y > canvas.height) {
            this.y = 0;
        }
    }
}

function animasyon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < damlalar.length; i++) {
        damlalar[i].guncelle();
        damlalar[i].ciz();
    }

    requestAnimationFrame(animasyon);
}

// Damla oluşturma
for (let i = 0; i < 100; i++) {
    damlalar.push(new Damla(Math.random() * canvas.width, Math.random() * canvas.height));
}

animasyon();

// Fare hareketlerini dinleme
canvas.addEventListener("mousemove", (event) => {
    event.preventDefault();
});
