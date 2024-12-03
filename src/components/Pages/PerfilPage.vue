<template>
  <div class="profile-page">
    <!-- Contenedor principal del perfil -->
    <div class="profile-container">
      <!-- Encabezado -->
      <div class="profile-header">
        <img src="@/assets/profile-icon.png" alt="Avatar" class="profile-avatar" />
        <h2>{{ usuario.nombre }}</h2>
        <p>Correo Electrónico: {{ usuario.email }}</p>
        <div class="profile-actions">
          <button class="btn-primary" @click="habilitarEdicion = !habilitarEdicion">Editar Perfil</button>
          <button class="btn-secondary" @click="volverAlDashboard">Volver al Dashboard</button>
        </div>
      </div>

      <!-- Estadísticas -->
      <div class="profile-stats">
        <div class="stat-card">
          <h3>Habitación Asignada</h3>
          <p>{{ usuario.habitacion }}</p>
        </div>
        <div class="stat-card">
          <h3>Pagos Pendientes</h3>
          <p>{{ usuario.pagosPendientes }}</p>
        </div>
        <div class="stat-card">
          <h3>Solicitudes Activas</h3>
          <p>{{ usuario.solicitudesActivas }}</p>
        </div>
      </div>

      <!-- Actividad Reciente -->
      <div class="recent-activity">
        <h2>Actividad Reciente</h2>
        <ul>
          <li v-for="(actividad, index) in usuario.actividadReciente" :key="index">
            {{ actividad }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal para editar perfil -->
    <div v-if="habilitarEdicion" class="modal">
      <div class="modal-content">
        <h3>Editar Perfil</h3>
        <form @submit.prevent="guardarCambios">
          <div class="input-group">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" v-model="form.nombre" />
          </div>
          <div class="input-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" id="email" v-model="form.email" />
          </div>
          <button type="submit" class="btn-primary">Guardar Cambios</button>
          <button type="button" class="btn-secondary" @click="habilitarEdicion = false">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importa Vue Router

export default {
  name: "PerfilPage",
  setup() {
    const router = useRouter(); // Inicializa el router

    const usuario = ref(
      JSON.parse(localStorage.getItem("usuario")) || {
        nombre: "Nombre del Usuario",
        email: "usuario@dominio.com",
        rol: "estudiante", // O "admin"
        habitacion: "101",
        pagosPendientes: 10,
        solicitudesActivas: 3,
        actividadReciente: [
          "Solicitud de mantenimiento solucionada el 10 de septiembre.",
          "Pago de la mensualidad verificado el 5 de septiembre.",
        ],
      }
    );

    const habilitarEdicion = ref(false);
    const form = ref({ ...usuario.value });

    const guardarCambios = () => {
      usuario.value = { ...usuario.value, ...form.value };
      localStorage.setItem("usuario", JSON.stringify(usuario.value));
      alert("Perfil actualizado con éxito.");
      habilitarEdicion.value = false;
    };

    const volverAlDashboard = () => {
      const ruta =
        usuario.value.rol === "admin" ? "/admindashboard" : "/dashboard-estudiante";
      router.push(ruta); // Redirige usando Vue Router
    };

    return {
      usuario,
      habilitarEdicion,
      form,
      guardarCambios,
      volverAlDashboard,
    };
  },
};

</script>

<style scoped>
.profile-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #e3e5e9;
  padding: 20px;
}

.profile-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
}

.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.profile-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.stat-card {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  width: 30%;
}

.recent-activity {
  margin-top: 20px;
}

.recent-activity ul {
  list-style: none;
  padding: 0;
}

.recent-activity li {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.btn-primary {
  background-color: #005ba2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #004b85;
}

.btn-secondary {
  background-color: #d71920;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #b8151b;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}
body {
  background-color: #d4d6d9; /* Fondo gris claro para todo el documento */
  display: flex; /* Flexbox para centrar contenido */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  min-height: 100vh; /* La altura mínima es el tamaño de la ventana */
  margin: 0; /* Elimina el margen predeterminado del navegador */
  font-family: 'Roboto', sans-serif; /* Fuente Roboto */
}

.container {
  background-color: #E0E0E0; /* Fondo gris claro para el contenedor */
  padding: 20px; /* Relleno interno del contenedor */
  width: 100%; /* Ancho total */
  max-width: 900px; /* Máximo ancho de 900px */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra ligera */
}

.profile-header {
  text-align: center; /* Centra el texto */
  background-color: #005BA2; /* Fondo azul para el encabezado */
  color: white; /* Texto en blanco */
  padding: 20px; /* Espaciado interno */
  border-radius: 10px; /* Bordes redondeados */
}

.profile-avatar {
  width: 100px; /* Ancho del avatar */
  height: 100px; /* Altura del avatar */
  border-radius: 50%; /* Imagen circular */
  margin-bottom: 20px; /* Espacio inferior */
}

.profile-header h2 {
  margin-bottom: 10px; /* Espacio inferior del título */
}

.edit-btn, .back-btn {
  background-color: #D71920; /* Fondo rojo para los botones */
  color: white; /* Texto en blanco */
  border: none; /* Sin bordes */
  padding: 10px 20px; /* Espaciado interno */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Puntero en forma de mano al pasar el mouse */
  margin: 10px; /* Espaciado externo de los botones */
}

.edit-btn:hover, .back-btn:hover {
  background-color: #005BA2; /* Cambia el fondo a azul al pasar el mouse */
}

.profile-stats {
  display: flex; /* Usa flexbox para distribuir las tarjetas */
  justify-content: space-between; /* Distribuye el espacio entre las tarjetas */
  margin-top: 30px; /* Margen superior */
  gap: 20px; /* Espacio entre las tarjetas */
}

.stat-card {
  background-color: white; /* Fondo blanco para las tarjetas */
  border-radius: 10px; /* Bordes redondeados */
  padding: 20px; /* Espaciado interno */
  width: 30%; /* Cada tarjeta ocupa el 30% del ancho disponible */
  text-align: center; /* Texto centrado */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  margin: 0 10px; /* Espacio entre tarjetas */
}

.stat-card h3 {
  color: #005BA2; /* Color azul para los encabezados */
}

.stat-card p {
  font-size: 24px; /* Tamaño de fuente grande */
  color: #D71920; /* Texto en rojo */
  margin-top: 10px; /* Margen superior */
}

.recent-activity {
  margin-top: 30px; /* Margen superior */
}

.recent-activity ul {
  list-style-type: none; /* Sin viñetas para la lista */
  padding: 0; /* Sin espaciado interno */
}

.recent-activity ul li {
  background-color: white; /* Fondo blanco para cada actividad */
  margin-bottom: 10px; /* Margen inferior entre actividades */
  padding: 15px; /* Espaciado interno */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

</style>
