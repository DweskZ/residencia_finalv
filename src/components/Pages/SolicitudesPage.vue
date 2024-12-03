<template>
    <div class="container">
      <!-- Barra superior -->
      <div class="top-bar">
        <img src="@/assets/logo.png" alt="Residencia ULEAM" />
        <div class="profile-icon">
          <img src="@/assets/profile-icon.png" alt="Perfil" id="profileIcon" @click="toggleDropdown" />
          <div v-if="dropdownOpen" class="dropdown-content">
            <a href="/perfil">Ver Perfil</a>
            <a href="#" @click="logout" class="logout-btn">Cerrar Sesión</a>
          </div>
        </div>
      </div>
  
      <!-- Menú lateral -->
      <aside class="sidebar">
        <h3>Administrador</h3>
        <hr />
        <h2>Menú</h2>
        <ul>
        <li><router-link  to="/admindashboard">Dashboard</router-link></li>
        <li><router-link to="/gestionhabitaciones">Gestión de Habitaciones</router-link></li>
        <li><router-link to="/pagospage">Pagos</router-link></li>
        <li><router-link class="active" to="/solicitudespage">Solicitudes de Mantenimiento</router-link></li>
        </ul>
      </aside>
  
      <!-- Contenido principal -->
      <main class="main-content">
        <header>
          <h1>Solicitudes de Mantenimiento</h1>
        </header>
  
        <!-- Tabla de solicitudes -->
        <section class="solicitudes-table">
          <table>
            <thead>
              <tr>
                <th>Residente</th>
                <th>Habitación</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(solicitud, index) in solicitudes" :key="index">
                <td>{{ solicitud.residente }}</td>
                <td>{{ solicitud.habitacion }}</td>
                <td>{{ solicitud.descripcion }}</td>
                <td>{{ solicitud.estado }}</td>
                <td>
                  <button v-if="solicitud.estado === 'Pendiente'" @click="marcarResuelto(index)">
                    Marcar como Resuelto
                  </button>
                  <span v-else>Resuelto</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'SolicitudesPage',
    setup() {
      // Lista de solicitudes (datos de ejemplo)
      const solicitudes = ref([
        { residente: 'Juan Pérez', habitacion: '101', descripcion: 'Fuga en el baño', estado: 'Pendiente' },
        { residente: 'María López', habitacion: '102', descripcion: 'Luz no funciona', estado: 'Resuelto' },
      ]);
  
      const dropdownOpen = ref(false);
  
      // Alternar el menú desplegable del perfil
      const toggleDropdown = () => {
        dropdownOpen.value = !dropdownOpen.value;
      };
  
      // Marcar una solicitud como resuelta
      const marcarResuelto = (index) => {
        solicitudes.value[index].estado = 'Resuelto';
      };
  
      return {
        solicitudes,
        dropdownOpen,
        toggleDropdown,
        marcarResuelto,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adaptados de solicitudes.css */
  .container {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    background-color: #005BA2;
    color: white;
    padding: 20px;
    width: 250px;
    position: fixed;
    top: 60px;
    height: calc(100vh - 60px);
  }
  
  .sidebar ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  .sidebar ul li a.active {
    background-color: #D71920;
    color: white;
  }
  
  .main-content {
    flex-grow: 1;
    padding: 40px;
    background-color: #E3E5E9;
    margin-left: 250px;
    margin-top: 60px;
  }
  
  .solicitudes-table table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .solicitudes-table th,
  .solicitudes-table td {
    padding: 15px;
    text-align: left;
  }
  
  .solicitudes-table th {
    background-color: #005BA2;
    color: white;
  }
  
  .solicitudes-table tbody tr:nth-child(even) {
    background-color: #f4f4f9;
  }
  
  .solicitudes-table button {
    padding: 10px;
    background-color: #D71920;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .solicitudes-table button:hover {
    background-color: #005BA2;
  }
  /* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif; /* Fuente base para todo el sitio */
}

/* Contenedor principal */
.container {
  display: flex;
  height: 100vh; /* Ocupa toda la altura de la pantalla */
}

/* Menú lateral (sidebar) */
.sidebar {
  background-color: #005BA2; /* Fondo azul oscuro */
  color: white; /* Texto en blanco */
  padding: 20px; /* Espaciado interno */
  width: 250px; /* Ancho fijo para la sidebar */
  z-index: 1;
  position: fixed; /* Fija la posición de la sidebar */
  top: 60px; /* Espacio para la barra superior */
  height: calc(100vh - 60px); /* Altura completa menos la altura de la barra superior */
}

.sidebar h2 {
  margin-bottom: 20px; /* Espaciado inferior */
}

.sidebar ul {
  list-style-type: none; /* Elimina los puntos de lista */
  padding-left: 0; /* Elimina el padding por defecto */
}

.sidebar ul li {
  margin-bottom: 15px; /* Espaciado entre elementos de la lista */
}

.sidebar ul li a {
  display: block; /* Hace que los enlaces ocupen todo el ancho disponible */
  text-decoration: none; /* Elimina subrayados en los enlaces */
  color: white; /* Texto blanco */
  padding: 10px; /* Espaciado interno */
  background-color: transparent; /* Fondo transparente por defecto */
  border-radius: 5px; /* Bordes redondeados */
  font-size: 14px; /* Tamaño de texto */
  transition: background-color 0.3s ease, color 0.3s ease; /* Suaviza las transiciones */
  word-wrap: break-word; /* Evita desbordes de texto */
}

.sidebar ul li a.active {
  background-color: #D71920; /* Fondo rojo para el enlace activo */
  color: white; /* Texto en blanco */
}

.sidebar ul li a:hover {
  background-color: #005BA2; /* Fondo azul oscuro al pasar el ratón */
  color: white; /* Texto en blanco */
}

/* Contenido principal */
.main-content {
  flex-grow: 1; /* El contenido principal crece para llenar el espacio disponible */
  padding: 40px; /* Espaciado interno */
  background-color: #E3E5E9; /* Fondo gris claro */
  margin-left: 250px; /* Espacio para la sidebar */
  margin-top: 60px; /* Espacio para la barra superior */
}

header h1 {
  margin-bottom: 20px; /* Espaciado inferior */
}

/* Tabla de solicitudes */
.solicitudes-table table {
  width: 100%; /* La tabla ocupa todo el ancho disponible */
  border-collapse: collapse; /* Elimina los espacios entre celdas */
  background-color: white; /* Fondo blanco */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra ligera */
}

.solicitudes-table th, .solicitudes-table td {
  padding: 15px; /* Espaciado interno */
  text-align: left; /* Texto alineado a la izquierda */
}

.solicitudes-table th {
  background-color: #005BA2; /* Fondo azul oscuro en el encabezado */
  color: white; /* Texto en blanco */
}

.solicitudes-table td {
  border-bottom: 1px solid #ccc; /* Borde inferior en cada celda */
}

.solicitudes-table tbody tr:nth-child(even) {
  background-color: #f4f4f9; /* Alterna el fondo de las filas pares */
}

/* Botones en la tabla */
.solicitudes-table button {
  padding: 10px; /* Espaciado interno */
  background-color: #D71920; /* Fondo rojo */
  color: white; /* Texto en blanco */
  border: none; /* Sin bordes */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cursor tipo mano */
  transition: background-color 0.3s ease; /* Suaviza la transición */
}

.solicitudes-table button:hover {
  background-color: #005BA2; /* Cambia el color de fondo a azul oscuro al pasar el ratón */
}

/* Estilos generales para los botones */
button {
  transition: background-color 0.3s ease; /* Suaviza la transición de color */
}

button:hover {
  background-color: #D71920; /* Cambia el fondo a rojo al pasar el ratón */
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .container {
      flex-direction: column; /* Apila la sidebar sobre el contenido en pantallas pequeñas */
  }

  .sidebar {
      width: 100%; /* La sidebar ocupa todo el ancho en pantallas pequeñas */
      padding: 10px; /* Reduce el padding */
      text-align: center; /* Texto centrado */
  }

  .sidebar ul li {
      margin: 10px 0; /* Reduce el margen entre elementos */
  }

  .main-content {
      padding: 20px; /* Reduce el padding */
  }
}

/* Estilos para pantallas muy pequeñas (móviles) */
@media (max-width: 480px) {
  .main-content {
      padding: 10px; /* Reduce aún más el padding */
  }

  .sidebar ul li {
      font-size: 14px; /* Reduce el tamaño del texto */
  }

  .sidebar h2 {
      font-size: 16px; /* Reduce el tamaño del encabezado */
  }
}

/* Estilos para tablas en pantallas grandes (scroll) */
.table-responsive {
  width: 100%;
  margin-bottom: 1rem;
  overflow-x: auto; /* Habilita el scroll horizontal en pantallas pequeñas */
}

table {
  width: 100%; /* La tabla ocupa todo el ancho disponible */
  border-collapse: collapse; /* Elimina los espacios entre celdas */
}

thead th {
  background-color: #005BA2; /* Fondo azul oscuro */
  color: white; /* Texto en blanco */
  padding: 10px; /* Espaciado interno */
}

tbody td {
  padding: 10px; /* Espaciado interno */
  border-bottom: 1px solid #ccc; /* Borde inferior en cada celda */
}

/* Estilos para pantallas pequeñas (tabla de solicitudes) */
@media (max-width: 768px) {
  table {
      display: block;
      width: 100%;
  }

  thead {
      display: none; /* Oculta el encabezado en pantallas pequeñas */
  }

  tbody, tr, td {
      display: block;
      width: 100%;
  }

  tbody tr {
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      background-color: white;
  }

  td {
      text-align: right;
      position: relative;
      padding-left: 50%;
  }

  td::before {
      content: attr(data-label); /* Añade el nombre de la columna antes del contenido */
      position: absolute;
      left: 10px;
      width: 45%;
      padding-left: 10px;
      font-weight: bold;
      text-align: left;
  }
}

/* Barra superior (top-bar) */
.top-bar {
  width: 100%;
  height: 60px;
  background-color: #005BA2; /* Fondo azul oscuro */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px; /* Espaciado interno */
  position: fixed; /* Fija la barra superior */
  top: 0;
  left: 0;
  z-index: 2;
}

.top-bar img {
  height: 50px; /* Tamaño de la imagen del logo */
}

.profile-icon {
  position: relative;
  display: inline-block;
}

.profile-icon img {
  border-radius: 50%; /* Imagen del perfil redonda */
  width: 40px;
  height: 40px;
  cursor: pointer; /* Cambia el cursor al pasar por encima */
}

/* Menú desplegable (dropdown) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  right: 0;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); /* Sombra ligera */
  z-index: 1;
  border-radius: 5px; /* Bordes redondeados */
}

/* Enlaces dentro del menú desplegable */
.dropdown-content a {
  color: #333; /* Texto gris oscuro */
  padding: 12px 16px; /* Espaciado interno */
  text-decoration: none; /* Sin subrayado */
  display: block;
  transition: background-color 0.3s ease; /* Suaviza la transición */
}

/* Hover en los enlaces del menú desplegable */
.dropdown-content a:hover {
  background-color: #f1f1f1;
  color: #005BA2; /* Texto azul al hacer hover */
}

/* Mostrar el menú desplegable al pasar por encima del icono de perfil */
.profile-icon:hover .dropdown-content {
  display: block;
}

/* Suaviza la transición */
.dropdown-content a {
  transition: background-color 0.3s, color 0.3s;
}

  </style>
  