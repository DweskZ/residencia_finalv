<template>
  <div class="login-page">
    <!-- Encabezado -->
    <header class="header">
      <h2>Bienvenido al Portal de Residencia</h2>
      <router-link to="/residenceform" class="solicitud-btn-header">Solicitar Residencia</router-link>
    </header>
    
    <!-- Contenedor de Login -->
    <div class="login-container">
      <img class="logo-universidad" src="@/assets/logo-uleam.png" alt="Logo ULEAM" />
      <h3>Gestión de Residencia Universitaria</h3>
      <img class="logo" src="@/assets/logo.png" alt="Logo Residencia" />
      <h1>Inicio de Sesión</h1>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Usuario o Email" required />
        <input type="password" v-model="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
      </form>
    </div>

    <!-- Pie de página -->
    <footer class="footer">
      <p>UNIVERSIDAD LAICA ELOY ALFARO DE MANABÍ - TODOS LOS DERECHOS RESERVADOS</p>
      <ul class="footer-links">
        <li><a href="#">Ayuda</a></li>
        <li><a href="#">Contacto</a></li>
        <li><a href="#">Términos y Condiciones</a></li>
        <li><a href="#">Política de Privacidad</a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      const users = [
        { username: "admin", password: "123", role: "admin" },
        { username: "residente", password: "456", role: "residente" }
      ];
      const user = users.find(u => u.username === this.username && u.password === this.password);
      if (user) {
        localStorage.setItem("usuario", JSON.stringify(user));
        this.$router.push(user.role === "admin" ? "/admindashboard" : "/residentdashboard");
      } else {
        this.errorMessage = "Credenciales incorrectas";
      }
    },
  },
};
</script>

<style scoped>
/* Reset básico */
* {
  margin: 0; /* Elimina los márgenes por defecto */
  padding: 0; /* Elimina el padding por defecto */
  box-sizing: border-box; /* Asegura que el padding y el borde se incluyan en el ancho total */
}

/* Estilos para el cuerpo de la página */
body {
  font-family: 'Roboto', sans-serif; /* Aplica la fuente Roboto */
  background-color: #E3E5E9; /* Fondo gris claro */
  display: flex; /* Organiza el contenido usando flexbox */
  justify-content: center; /* Centra horizontalmente el contenido */
  align-items: center; /* Centra verticalmente el contenido */
  min-height: 100vh; /* La altura mínima es igual a la de la ventana */
  flex-direction: column; /* Coloca el contenido en una columna (incluye header y footer) */
}

/* Estilos para el encabezado (header) */
.header {
  width: 100%; /* El header ocupa todo el ancho */
  padding: 20px; /* Espaciado interno */
  background-color: #005BA2; /* Fondo azul */
  display: flex; /* Flexbox para organizar el contenido */
  justify-content: space-between; /* Alinea el contenido a los extremos */
  align-items: center; /* Centra verticalmente el contenido */
  color: white; /* Texto blanco */
  position: fixed; /* Fija el header en la parte superior */
  top: 0; /* Alinea al borde superior */
  left: 0; /* Alinea al borde izquierdo */
}

/* Estilos para el pie de página (footer) */
.footer {
  width: 100%; /* El footer ocupa todo el ancho */
  padding: 20px; /* Ajusta el espaciado */
  background-color: #005BA2; /* Fondo azul */
  color: white; /* Texto blanco */
  text-align: center; /* Centra el texto */
  position: fixed; /* Fija el footer en la parte inferior */
  bottom: 0; /* Alinea al borde inferior */
  left: 0; /* Alinea al borde izquierdo */
  font-size: 14px; /* Tamaño de texto pequeño */
  font-weight: 300; /* Fuente ligera */
  color: #f1f1f1; /* Texto blanco claro */
  text-transform: uppercase; /* Mayúsculas */
  letter-spacing: 1px; /* Espaciado entre letras */
}

/* Estilos para los enlaces dentro del footer */
.footer a {
  font-size: 14px; /* Tamaño de texto pequeño */
  font-weight: bold; /* Texto en negrita */
  color: #FFD700; /* Color dorado para resaltar */
  text-decoration: none; /* Elimina el subrayado */
  transition: color 0.3s ease; /* Transición suave en el color */
}

/* Hover en los enlaces del footer */
.footer a:hover {
  color: #FFFFFF; /* Cambia el color a blanco al pasar el mouse */
}

/* Estilos para los párrafos dentro del footer */
.footer p {
  margin-bottom: 5px; /* Espaciado inferior */
}

/* Lista de enlaces en el footer */
.footer-links {
  list-style: none; /* Elimina los bullets */
  display: flex; /* Organiza los elementos de la lista en una fila */
  justify-content: center; /* Centra los elementos horizontalmente */
  padding: 0; /* Elimina el padding por defecto */
}

/* Estilos para los elementos de la lista en el footer */
.footer-links li {
  margin: 0 15px; /* Espaciado entre los enlaces */
}

/* Estilos para los enlaces dentro de la lista del footer */
.footer-links a {
  text-decoration: none; /* Elimina el subrayado */
  color: white; /* Texto blanco */
}

/* Hover en los enlaces de la lista del footer */
.footer-links a:hover {
  text-decoration: underline; /* Subraya el texto al pasar el mouse */
}

/* Estilos para el botón de solicitud en el header */
.solicitud-btn-header {
  background-color: #D71920; /* Fondo rojo */
  color: white; /* Texto blanco */
  padding: 10px; /* Espaciado interno */
  border-radius: 5px; /* Bordes redondeados */
  text-decoration: none; /* Elimina el subrayado */
  margin-right: 20px; /* Espaciado a la derecha */
  float: right; /* Alinea el botón a la derecha */
}

/* Estilos para el contenedor de login */
.login-container {
  background-color: #fff; /* Fondo blanco */
  padding: 40px; /* Espaciado interno */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); /* Sombra ligera */
  text-align: center; /* Texto centrado */
  width: 100%; /* El contenedor ocupa todo el ancho */
  max-width: 400px; /* Ancho máximo */

}

/* Estilos para las imágenes dentro del contenedor de login */
.login-container img.logo {
  width: 180px; /* Ancho fijo */
  margin-bottom: 20px; /* Espaciado inferior */
}

/* Estilos para el título dentro del contenedor de login */
.login-container h1 {
  color: #D71920; /* Texto rojo */
  margin-bottom: 20px; /* Espaciado inferior */
}

/* Estilos para el subtítulo dentro del contenedor de login */
.login-container h2 {
  color: #005BA2; /* Texto azul */
  margin-bottom: 10px; /* Espaciado inferior */
  font-size: 18px; /* Tamaño de texto */
}

/* Estilos para los inputs de texto y contraseña */
.login-container input[type="text"],
.login-container input[type="password"] {
  width: 100%; /* El input ocupa todo el ancho */
  padding: 12px; /* Espaciado interno */
  margin: 10px 0; /* Espaciado vertical */
  border: 1px solid #ccc; /* Borde gris claro */
  border-radius: 5px; /* Bordes redondeados */
}

/* Estilos para el botón de enviar en el contenedor de login */
.login-container button {
  width: 100%; /* El botón ocupa todo el ancho */
  padding: 12px; /* Espaciado interno */
  background-color: #005BA2; /* Fondo azul */
  color: white; /* Texto blanco */
  border: none; /* Sin bordes */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar el ratón */
}

/* Hover para el botón de enviar en el contenedor de login */
.login-container button:hover {
  background-color: #D71920; /* Cambia el fondo a rojo en hover */
}

/* Estilos para los enlaces dentro del contenedor de login */
.login-container a {
  display: block; /* El enlace ocupa todo el ancho */
  margin-top: 15px; /* Espaciado superior */
  color: #005BA2; /* Texto azul */
  text-decoration: none; /* Elimina el subrayado */
}

/* Asegura que las imágenes dentro del contenedor no desfasen el diseño */
.login-container img {
  max-width: 100%; /* La imagen no excede el 100% del ancho */
  height: auto; /* Mantiene la proporción */
}

/* Header */
.header {
  width: 100%; /* El header ocupa todo el ancho */
  padding: 20px; /* Espaciado interno */
  background-color: #005BA2; /* Fondo azul */
  display: flex; /* Organiza el contenido con flexbox */
  justify-content: space-between; /* Alinea el contenido a los extremos */
  align-items: center; /* Centra verticalmente el contenido */
  color: white; /* Texto blanco */
}

.header h1 {
  margin: 0; /* Elimina el margen por defecto */
}

/* Botón de solicitud en el header */
.solicitud-btn-header {
  background-color: #D71920; /* Fondo rojo */
  color: white; /* Texto blanco */
  padding: 10px; /* Espaciado interno */
  border-radius: 5px; /* Bordes redondeados */
  text-decoration: none; /* Elimina el subrayado */
}

/* Estilos para el footer */
footer p {
  font-size: 14px; /* Tamaño de texto pequeño */
}

/* Media Queries para dispositivos móviles */
@media (max-width: 768px) {
  .header h1, .footer p {
      font-size: 18px; /* Ajusta el tamaño del texto en pantallas más pequeñas */
  }

  .login-container {
      padding: 20px; /* Reduce el espaciado interno */
      max-width: 350px; /* Reduce el ancho máximo */
  }

  .solicitud-btn-header {
      padding: 8px; /* Reduce el padding del botón */
  }
}
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Asegura que ocupa la altura total de la pantalla */
  flex-direction: column;
  background-color: #E3E5E9; /* Fondo gris claro */
  padding-top: 100px; /* Espacio para el header */
  padding-bottom: 100px; /* Espacio para el footer */
}

</style>