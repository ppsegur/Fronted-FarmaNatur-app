<template>
    <footer class="user-footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>FarmaNatur</h3>
                <p>Tu salud, nuestra prioridad.</p>
                <p>Calle Salud 123, Sevilla, España</p>
            </div>
            <div class="footer-section">
                <h4>Contacto</h4>
                <p>WhatsApp: <a href="https://wa.me/66795933" target="_blank" rel="noopener">66795933</a></p>
                <p>Email: <a href="mailto:info@farmanatur.com">info@farmanatur.com</a></p>
                <p>GitHub: <a href="https://github.com/ppsegur" target="_blank" rel="noopener">ppsegur</a></p>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; {{ new Date().getFullYear() }} FarmaNatur. Todos los derechos reservados.
        </div>
    </footer>
</template>

<script setup>
</script>

<style scoped>
.user-footer {
    background: #111;
    color: #fff;
    padding: 32px 16px 16px 16px;
    font-size: 15px;
    width: 100%;
}

.footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 32px;
    margin-bottom: 16px;
}

.footer-section h3,
.footer-section h4 {
    margin: 0 0 8px 0;
    color: #00e676;
}

.footer-section a {
    color: #00e676;
    text-decoration: none;
}

.footer-section a:hover {
    text-decoration: underline;
}

.footer-bottom {
    text-align: center;
    font-size: 13px;
    color: #bbb;
    border-top: 1px solid #222;
    padding-top: 8px;
}
</style>