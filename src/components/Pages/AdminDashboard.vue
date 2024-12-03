<template>
  <div class="container">
    <!-- Barra superior -->
    <div class="top-bar">
      <img src="@/assets/logo.png" alt="Residencia ULEAM" />
      <div class="profile-icon">
        <img src="@/assets/profile-icon.png" alt="Perfil" id="profileIcon" @click="toggleDropdown" />
        <div v-if="dropdownOpen" class="dropdown-content">
          <a href="/perfilpage">Ver Perfil</a>
          <router-link to="/" class="logout-btn">Cerrar Sesión</router-link>
        </div>
      </div>
    </div>

    <!-- Menú lateral -->
    <aside class="sidebar">
      <h3>Administrador</h3>
      <hr />
      <h2>Menú</h2>
      <ul>
        <li><router-link class="active" to="/admindashboard">Dashboard</router-link></li>
        <li><router-link to="/gestionhabitaciones">Gestión de Habitaciones</router-link></li>
        <li><router-link to="/pagospage">Pagos</router-link></li>
        <li><router-link to="/solicitudespage">Solicitudes de Mantenimiento</router-link></li>
      </ul>
    </aside>

    <!-- Contenido principal -->
    <main class="main-content">
      <header>
        <h1>Bienvenido, Administrador</h1>
      </header>

      <!-- Estadísticas -->
      <section class="stats">
        <div class="stat-card">
          <h3>Habitaciones Ocupadas</h3>
          <p>{{ stats.habitacionesOcupadas }}</p>
        </div>
        <div class="stat-card">
          <h3>Habitaciones Disponibles</h3>
          <p>{{ stats.habitacionesDisponibles }}</p>
        </div>
        <div class="stat-card">
          <h3>Pagos Pendientes</h3>
          <p>{{ stats.pagosPendientes }}</p>
        </div>
      </section>

      <!-- Solicitudes de residencia -->
      <section class="solicitudes">
        <h2>Solicitudes de Residencia</h2>
        <table v-if="solicitudes.length">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Habitaciones</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Comentarios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(solicitud, index) in solicitudes" :key="index">
              <td>{{ solicitud.nombre }}</td>
              <td>{{ solicitud.apellido }}</td>
              <td>{{ solicitud.email }}</td>
              <td>{{ solicitud.habitaciones }}</td>
              <td>{{ solicitud.fechaInicio }}</td>
              <td>{{ solicitud.fechaFin }}</td>
              <td>{{ solicitud.comentarios }}</td>
              <td>
                <button @click="eliminarSolicitud(index)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No hay solicitudes registradas.</p>
      </section>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'AdminDashboard',
  setup() {
    // Estadísticas
    const stats = ref({
      habitacionesOcupadas: 30,
      habitacionesDisponibles: 20,
      pagosPendientes: 10,
    });

    // Actividad reciente (puedes dejarlo como está)
    const actividadReciente = ref([
      { fecha: '01/10/2024', descripcion: 'Pago realizado por Juan Pérez' },
      { fecha: '29/09/2024', descripcion: 'Asignación de habitación a Maria García' },
    ]);

    // Dropdown de perfil
    const dropdownOpen = ref(false);
    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    // Solicitudes guardadas en localStorage
    const solicitudes = ref([]);

    // Cargar solicitudes desde localStorage
    const cargarSolicitudes = () => {
      const storedData = JSON.parse(localStorage.getItem('solicitudes') || '[]');
      solicitudes.value = storedData.map((solicitud) => ({
        ...JSON.parse(solicitud.jsonData),
      }));
    };

    // Eliminar una solicitud
    const eliminarSolicitud = (index) => {
      solicitudes.value.splice(index, 1); // Elimina del arreglo local
      localStorage.setItem('solicitudes', JSON.stringify(solicitudes.value.map((solicitud) => ({
        jsonData: JSON.stringify(solicitud),
      }))));
      alert('Solicitud eliminada correctamente.');
    };

    // Logout
    const logout = () => {
      localStorage.clear();
      window.location.href = '/login';
    };

    // Cargar solicitudes al montar el componente
    cargarSolicitudes();

    return {
      stats,
      actividadReciente,
      dropdownOpen,
      toggleDropdown,
      solicitudes,
      eliminarSolicitud,
      logout,
    };
  },
};
</script>


<style scoped>
/* Reset básico */
* {
  margin: 0; /* Elimina márgenes por defecto */
  padding: 0; /* Elimina rellenos por defecto */
  box-sizing: border-box; /* Asegura que padding y borde se incluyan en el tamaño total del elemento */
  font-family: 'Roboto', sans-serif; /* Aplica la fuente 'Roboto' a todo el documento */
}

/* Contenedor principal */
.container {
  display: flex; /* Flexbox para organizar el menú lateral y el contenido principal */
  height: 100vh; /* Ocupa toda la altura de la pantalla */
}

/* Menú lateral (sidebar) */
.sidebar {
  background-color: #005BA2; /* Color de fondo azul */
  color: white; /* Texto en blanco */
  padding: 20px; /* Relleno interno de la barra lateral */
  width: 250px; /* Ancho fijo de la barra lateral */
  z-index: 1; /* Prioridad visual por encima del contenido */
  position: fixed; /* Fija la barra lateral en su lugar */
  top: 60px; /* Deja espacio para la barra superior */
  height: calc(100vh - 60px); /* Ocupa el espacio restante debajo de la barra superior */
}

.sidebar h2 {
  margin-bottom: 20px; /* Margen inferior entre el título y el contenido */
}

.sidebar ul {
  list-style-type: none; /* Elimina los estilos de lista por defecto */
  padding-left: 0; /* Elimina el relleno a la izquierda */
}

.sidebar ul li {
  margin-bottom: 15px; /* Espaciado entre los elementos de la lista */
}

.sidebar ul li a {
  display: block; /* Asegura que el enlace ocupe todo el ancho */
  text-decoration: none; /* Elimina el subrayado de los enlaces */
  color: white; /* Color de texto blanco */
  padding: 10px; /* Espaciado interno */
  background-color: transparent; /* Fondo transparente por defecto */
  border-radius: 5px; /* Bordes redondeados */
  font-size: 14px; /* Tamaño de fuente para evitar desbordes */
  transition: background-color 0.3s ease, color 0.3s ease; /* Transiciones suaves para cambios de color */
}

.sidebar ul li a.active {
  background-color: #D71920; /* Color de fondo rojo para el enlace activo */
  color: white; /* Texto blanco */
}

.sidebar ul li a:hover {
  background-color: #005BA2; /* Mantiene el color azul en hover */
  color: white; /* Asegura que el texto sea blanco en hover */
}

/* Contenido principal */
.main-content {
  background-color: #E3E5E9; /* Color de fondo gris claro */
  flex-grow: 1; /* Hace que el contenido ocupe todo el espacio disponible */
  padding: 40px; /* Espaciado interno */
  margin-left: 250px; /* Deja espacio para la barra lateral */
  margin-top: 60px; /* Deja espacio para la barra superior */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
}

header h1 {
  margin-bottom: 20px; /* Espaciado inferior */
  color: #333; /* Color de texto */
}

/* Tarjetas de estadísticas */
.stat-card {
  background-color: white; /* Fondo blanco */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
  padding: 20px; /* Espaciado interno */
  text-align: center; /* Texto centrado */
  flex: 1; /* Ocupa un espacio flexible */
  border: 1px solid #E0E0E0; /* Borde gris claro */
  margin: 10px 0; /* Espaciado superior e inferior */
}

.stat-card h3 {
  color: #005BA2; /* Color azul para los títulos */
  margin-bottom: 10px; /* Espaciado inferior */
}

.stat-card p {
  font-size: 24px; /* Tamaño de fuente */
  font-weight: bold; /* Texto en negrita */
  color: #D71920; /* Texto en rojo */
}

/* Ajuste del tamaño de las tarjetas */
.stats {
  display: flex; /* Flexbox para organizar las tarjetas */
  gap: 20px; /* Espaciado entre tarjetas */
  flex-wrap: wrap; /* Asegura que las tarjetas se ajusten en filas si no hay espacio horizontal */
}

.stat-card {
  flex: 1 1 30%; /* Cada tarjeta ocupa el 30% del ancho */
}

/* Actividad reciente */
.recent-activity {
  margin-top: 40px; /* Espaciado superior */
}

.recent-activity h2 {
  margin-bottom: 20px; /* Espaciado inferior */
  color: #333; /* Color de texto */
}

/* Botones */
button {
  transition: background-color 0.3s ease; /* Transición suave para el color de fondo */
}

button:hover {
  background-color: #D71920; /* Cambia el color de fondo en hover */
}

/* Estilos responsivos para pantallas pequeñas */
@media (max-width: 768px) {
  .container {
      flex-direction: column; /* Pone el menú lateral encima del contenido */
      height: auto; /* Ajusta la altura automáticamente según el contenido */
  }

  .sidebar {
      width: 100%; /* La barra lateral ocupa todo el ancho */
      position: relative; /* Cambia la posición a relativa */
      top: 0; /* Elimina el desplazamiento superior */
      height: auto; /* Ajusta la altura automáticamente */
  }

  .sidebar ul li {
      margin: 10px 0; /* Reduce el espaciado entre elementos del menú */
  }

  .main-content {
      margin-left: 0; /* Elimina el margen izquierdo */
      margin-top: 20px; /* Añade margen superior */
      padding: 10px; /* Reduce el espaciado interno */
  }

  .stat-card {
      margin-bottom: 20px; /* Espaciado inferior entre tarjetas */
  }
}

/* Estilos para pantallas muy pequeñas (móviles) */
@media (max-width: 480px) {
  .main-content {
      padding: 10px; /* Reduce el espaciado interno */
  }

  .sidebar ul li {
      font-size: 14px; /* Reduce el tamaño de la fuente en el menú lateral */
  }

  .sidebar h2 {
      font-size: 16px; /* Reduce el tamaño de la fuente en los títulos */
  }

  .stat-card {
      font-size: 14px; /* Reduce el tamaño de la fuente en las tarjetas */
      padding: 10px; /* Reduce el espaciado interno */
  }
}

/* Dropdown para perfil de usuario */
.logout-btn:hover {
  background-color: #005BA2; /* Cambia el color de fondo en hover */
}

.logout-btn:active {
  transform: scale(0.95); /* Añade un efecto de escala al hacer clic */
}

.profile-menu {
  position: relative;
  display: inline-block;
}

/* Barra superior */
.top-bar {
  width: 100%; /* Ocupa todo el ancho de la página */
  height: 60px; /* Altura de la barra superior */
  background-color: #005BA2; /* Fondo azul */
  display: flex; /* Flexbox para organizar el contenido */
  justify-content: space-between; /* Espaciado entre el logo y el perfil */
  align-items: center; /* Centra verticalmente los elementos */
  padding: 0 20px; /* Espaciado interno */
  position: fixed; /* Fija la barra en la parte superior */
  top: 0; /* Alinea la barra en la parte superior */
  left: 0; /* Alinea la barra a la izquierda */
  z-index: 2; /* Prioridad visual por encima del contenido */
}

.top-bar img {
  height: 50px; /* Tamaño del logo */
}

/* Icono de perfil */
.profile-icon {
  position: relative; /* Posiciona el dropdown relacionado */
  display: inline-block;
}

.profile-icon img {
  border-radius: 50%; /* Hace que la imagen de perfil sea circular */
  width: 40px;
  height: 40px;
  cursor: pointer; /* Cambia el cursor al pasar el ratón */
}

/* Dropdown Content */
.dropdown-content {
  display: none; /* Oculta el menú desplegable por defecto */
  position: absolute;
  background-color: #ffffff;
  right: 0;
  min-width: 160px; /* Ancho mínimo */
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px; /* Bordes redondeados */
}

/* Links dentro del dropdown */
.dropdown-content a {
  color: #333; /* Color del texto */
  padding: 12px 16px; /* Espaciado interno */
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease; /* Transición suave */
}

.dropdown-content a:hover {
  background-color: #f1f1f1; /* Cambia el fondo al pasar el cursor */
  color: #005BA2; /* Cambia el color del texto */
}

.profile-icon:hover .dropdown-content {
  display: block; /* Muestra el dropdown al pasar el cursor sobre el perfil */
}

/* Tabla de actividad reciente */
.recent-activity table {
  width: 100%;
  border-collapse: collapse; /* Elimina espacios entre bordes */
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra */
  border-radius: 8px; /* Bordes redondeados */
}

.recent-activity th, .recent-activity td {
  padding: 15px; /* Espaciado interno */
  text-align: left; /* Alinea el texto a la izquierda */
}

.recent-activity th {
  background-color: #005BA2; /* Fondo azul para los encabezados */
  color: white; /* Texto blanco */
  text-transform: uppercase; /* Texto en mayúsculas */
}

.recent-activity td {
  border-bottom: 1px solid #ccc; /* Línea inferior */
  color: #333; /* Color del texto */
}

.recent-activity tbody tr:nth-child(even) {
  background-color: #f4f4f9; /* Fondo para las filas pares */
}

.recent-activity tbody tr:hover {
  background-color: #e1e1e1; /* Cambia el fondo al pasar el cursor */
}

/* Estilo de los enlaces de acción en la tabla */
.table-actions a {
  text-decoration: none;
  color: #005BA2;
  font-weight: bold;
  background-color: transparent;
  padding: 5px 10px;
  border: 1px solid #005BA2;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s; /* Transición suave */
}

.table-actions a:hover {
  background-color: #005BA2;
  color: white;
}

/* Sección de solicitudes */
.solicitudes {
  margin-top: 40px;
}

.solicitudes h2 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
}

.solicitudes table {
  width: 100%;
  border-collapse: collapse; /* Elimina el espacio entre bordes */
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
  border-radius: 8px; /* Bordes redondeados */
  overflow: hidden; /* Oculta el desbordamiento */
}

.solicitudes th,
.solicitudes td {
  padding: 15px;
  text-align: left;
}

.solicitudes th {
  background-color: #005ba2; /* Fondo azul para el encabezado */
  color: #fff; /* Texto blanco */
  text-transform: uppercase;
  font-size: 14px;
}

.solicitudes td {
  border-bottom: 1px solid #ccc; /* Línea divisoria entre filas */
  font-size: 14px;
  color: #333;
}

.solicitudes tbody tr:nth-child(even) {
  background-color: #f9f9f9; /* Fondo para las filas pares */
}

.solicitudes tbody tr:hover {
  background-color: #e3e5e9; /* Fondo al pasar el cursor */
}

.solicitudes button {
  padding: 8px 12px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background-color: #d71920;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.solicitudes button:hover {
  background-color: #b8151b; /* Color más oscuro al pasar el cursor */
}

  </style>
  