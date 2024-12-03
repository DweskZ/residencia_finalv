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
        <li><router-link to="/admindashboard">Dashboard</router-link></li>
        <li><router-link to="/gestionhabitaciones">Gestión de Habitaciones</router-link></li>
        <li><router-link class="active" to="/pagospage">Pagos</router-link></li>
        <li><router-link to="/solicitudespage">Solicitudes de Mantenimiento</router-link></li>
        </ul>
      </aside>
  
      <!-- Contenido principal -->
      <main class="main-content">
        <header>
          <h1>Gestión de Pagos</h1>
        </header>
  
        <!-- Tabla de pagos -->
        <section class="pagos-table">
          <table>
            <thead>
              <tr>
                <th>Residente</th>
                <th>Habitación</th>
                <th>Estado del Pago</th>
                <th>Monto</th>
                <th>Fecha de Pago</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pago, index) in pagos" :key="index">
                <td>{{ pago.residente }}</td>
                <td>{{ pago.habitacion }}</td>
                <td>{{ pago.estado }}</td>
                <td>{{ pago.monto }}</td>
                <td>{{ pago.fecha || '-' }}</td>
                <td>
                  <button @click="marcarPagado(index)" v-if="pago.estado === 'Pendiente'">Marcar como Pagado</button>
                  <span v-else>Pagado</span>
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
    name: 'PagosPage',
    setup() {
      const pagos = ref([
        { residente: 'Juan Pérez', habitacion: '101', estado: 'Pendiente', monto: '$200', fecha: '' },
        { residente: 'María López', habitacion: '102', estado: 'Pagado', monto: '$150', fecha: '2024-01-01' },
      ]);
  
      const dropdownOpen = ref(false);
  
      const toggleDropdown = () => {
        dropdownOpen.value = !dropdownOpen.value;
      };
  
      const marcarPagado = (index) => {
        pagos.value[index].estado = 'Pagado';
        pagos.value[index].fecha = new Date().toLocaleDateString();
      };
  
      return {
        pagos,
        dropdownOpen,
        toggleDropdown,
        marcarPagado,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Se reutilizan los estilos de pagos.css */
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
    background-color: #E3E5E9;
    flex-grow: 1;
    padding: 40px;
    margin-left: 250px;
    margin-top: 60px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .pagos-table table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .pagos-table th, .pagos-table td {
    padding: 15px;
    text-align: left;
  }
  
  .pagos-table th {
    background-color: #005BA2;
    color: white;
  }
  
  .pagos-table td {
    border-bottom: 1px solid #ccc;
  }
  
  .pagos-table tbody tr:nth-child(even) {
    background-color: #f4f4f9;
  }
  
  .pagos-table button {
    padding: 10px;
    background-color: #D71920;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .pagos-table button:hover {
    background-color: #005BA2;
  }
  /* Reset básico */
* {
  margin: 0; /* Elimina márgenes por defecto */
  padding: 0; /* Elimina padding por defecto */
  box-sizing: border-box; /* Incluye padding y borde en el ancho total */
  font-family: 'Roboto', sans-serif; /* Aplica la fuente Roboto en todo el documento */
}

/* Contenedor principal */
.container {
  display: flex; /* Aplica flexbox para alinear los elementos */
  height: 100vh; /* Altura del contenedor igual a la pantalla */
}

/* Menú lateral (sidebar) */
.sidebar {
  background-color: #005BA2; /* Fondo azul oscuro */
  color: white; /* Texto blanco */
  padding: 20px; /* Espaciado interno */
  width: 250px; /* Ancho fijo */
  z-index: 1; /* Asegura que la sidebar esté encima de otros elementos */
  position: fixed; /* Fija la posición para que no se mueva al hacer scroll */
  top: 60px; /* Alineación justo debajo de la barra superior */
  height: calc(100vh - 60px); /* Altura calculada para ajustarse debajo de la barra superior */
}

.sidebar h2 {
  margin-bottom: 20px; /* Espaciado debajo del título */
}

.sidebar ul {
  list-style-type: none; /* Elimina los bullets de la lista */
  padding-left: 0; /* Elimina el padding de la izquierda */
}

.sidebar ul li {
  margin-bottom: 15px; /* Espaciado entre los elementos de la lista */
}

.sidebar ul li a {
  display: block; /* Hace que el enlace ocupe todo el ancho */
  text-decoration: none; /* Elimina el subrayado de los enlaces */
  color: white; /* Texto blanco */
  padding: 10px; /* Espaciado interno */
  background-color: transparent; /* Fondo transparente por defecto */
  border-radius: 5px; /* Bordes redondeados */
  font-size: 14px; /* Tamaño de fuente */
  transition: background-color 0.3s ease, color 0.3s ease; /* Suaviza la transición de color al hacer hover */
}

.sidebar ul li a.active {
  background-color: #D71920; /* Fondo rojo para el enlace activo */
  color: white; /* Texto blanco */
}

.sidebar ul li a:hover {
  background-color: #005BA2; /* Mantiene el color del fondo azul oscuro al hacer hover */
  color: white; /* Texto blanco */
}

/* Contenido principal */
.main-content {
  background-color: #E3E5E9; /* Fondo gris claro */
  flex-grow: 1; /* El contenido principal crece para ocupar el espacio disponible */
  padding: 40px; /* Espaciado interno */
  margin-left: 250px; /* Deja espacio para la sidebar */
  margin-top: 60px; /* Deja espacio para la barra superior */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra suave para darle profundidad */
}

header h1 {
  margin-bottom: 20px; /* Espaciado inferior */
}

/* Tabla de pagos */
.pagos-table table {
  width: 100%; /* La tabla ocupa todo el ancho */
  border-collapse: collapse; /* Elimina el espacio entre celdas */
  background-color: white; /* Fondo blanco */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
}

.pagos-table th, .pagos-table td {
  padding: 15px; /* Espaciado interno */
  text-align: left; /* Alinea el texto a la izquierda */
}

.pagos-table th {
  background-color: #005BA2; /* Fondo azul para las cabeceras */
  color: white; /* Texto blanco */
}

.pagos-table td {
  border-bottom: 1px solid #ccc; /* Borde inferior en las celdas */
}

.pagos-table tbody tr:nth-child(even) {
  background-color: #f4f4f9; /* Color de fondo para filas pares */
}

/* Botones en la tabla */
.pagos-table button {
  padding: 10px; /* Espaciado interno */
  background-color: #D71920; /* Fondo rojo */
  color: white; /* Texto blanco */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar el mouse */
  transition: background-color 0.3s ease; /* Suaviza la transición al hacer hover */
}

.pagos-table button:hover {
  background-color: #005BA2; /* Cambia el fondo a azul al hacer hover */
}

/* Botones generales */
button {
  transition: background-color 0.3s ease; /* Suaviza la transición de color */
}

button:hover {
  background-color: #D71920; /* Cambia el fondo a rojo al hacer hover */
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .container {
      flex-direction: column; /* Apila el menú lateral sobre el contenido */
  }

  .sidebar {
      width: 100%; /* La sidebar ocupa todo el ancho */
      padding: 10px; /* Ajusta el padding */
      text-align: center; /* Centra el texto */
  }

  .sidebar ul li {
      margin: 10px 0; /* Espaciado entre los elementos de la lista */
  }

  .main-content {
      padding: 20px; /* Ajusta el padding */
  }
}

/* Estilos para pantallas muy pequeñas (móviles) */
@media (max-width: 480px) {
  .main-content {
      padding: 10px; /* Ajusta el padding */
  }

  .sidebar ul li {
      font-size: 14px; /* Ajusta el tamaño de la fuente */
  }

  .sidebar h2 {
      font-size: 16px; /* Ajusta el tamaño de la fuente */
  }
}

/* Estilos para pantallas grandes (scroll en tablas) */
.table-responsive {
  width: 100%; /* La tabla ocupa todo el ancho */
  margin-bottom: 1rem; /* Espaciado inferior */
  overflow-x: auto; /* Habilita el scroll horizontal en pantallas pequeñas */
}

/* Estilos generales para tablas */
table {
  width: 100%; /* La tabla ocupa todo el ancho */
  border-collapse: collapse; /* Elimina el espacio entre celdas */
}

thead th {
  background-color: #005BA2; /* Fondo azul para las cabeceras */
  color: white; /* Texto blanco */
  padding: 10px; /* Espaciado interno */
}

tbody td {
  padding: 10px; /* Espaciado interno */
  border-bottom: 1px solid #ccc; /* Borde inferior */
}

/* Estilos para pantallas pequeñas (tabla de pagos) */
@media (max-width: 768px) {
  table {
      display: block; /* Hace que la tabla sea un bloque */
      width: 100%; /* La tabla ocupa todo el ancho */
  }

  thead {
      display: none; /* Oculta el encabezado en pantallas pequeñas */
  }

  tbody, tr, td {
      display: block; /* Cada fila es un bloque */
      width: 100%; /* Las filas ocupan todo el ancho */
  }

  tbody tr {
      margin-bottom: 10px; /* Espaciado inferior entre filas */
      border: 1px solid #ccc; /* Borde en las filas */
      border-radius: 5px; /* Bordes redondeados */
      padding: 10px; /* Espaciado interno */
      background-color: white; /* Fondo blanco */
  }

  td {
      text-align: right; /* Texto alineado a la derecha */
      position: relative; /* Posicionamiento relativo para mostrar los nombres de las columnas */
      padding-left: 50%; /* Espaciado izquierdo para mostrar los nombres de las columnas */
  }

  td::before {
      content: attr(data-label); /* Muestra el nombre de la columna antes del contenido */
      position: absolute; /* Posicionamiento absoluto */
      left: 10px; /* Espaciado izquierdo */
      width: 45%; /* Ancho del nombre de la columna */
      padding-left: 10px; /* Espaciado interno */
      font-weight: bold; /* Texto en negrita */
      text-align: left; /* Texto alineado a la izquierda */
  }
}

/* Barra superior (top bar) */
.top-bar {
  width: 100%; /* La barra superior ocupa todo el ancho */
  height: 60px; /* Altura fija */
  background-color: #005BA2; /* Fondo azul */
  display: flex; /* Flexbox para organizar el contenido */
  justify-content: space-between; /* Alinea el contenido a los extremos */
  align-items: center; /* Centra verticalmente el contenido */
  padding: 0 20px; /* Espaciado interno */
  position: fixed; /* Fija la barra en la parte superior */
  top: 0; /* Alinea al borde superior */
  left: 0; /* Alinea al borde izquierdo */
  z-index: 2; /* Asegura que la barra esté encima de otros elementos */
}

.top-bar img {
  height: 50px; /* Tamaño fijo para el logotipo */
}

/* Icono de perfil en la barra superior */
.profile-icon {
  position: relative; /* Posicionamiento relativo para el dropdown */
  display: inline-block; /* Muestra el icono como un bloque en línea */
}

.profile-icon img {
  border-radius: 50%; /* Hace que la imagen sea circular */
  width: 40px; /* Ancho fijo */
  height: 40px; /* Altura fija */
  cursor: pointer; /* Cambia el cursor al pasar sobre el icono */
}

/* Contenido del dropdown */
.dropdown-content {
  display: none; /* Oculta el dropdown por defecto */
  position: absolute; /* Posicionamiento absoluto para mostrarlo debajo del icono */
  background-color: #ffffff; /* Fondo blanco */
  right: 0; /* Alinea el dropdown a la derecha */
  min-width: 160px; /* Ancho mínimo */
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); /* Sombra para darle profundidad */
  z-index: 1; /* Asegura que esté por encima de otros elementos */
  border-radius: 5px; /* Bordes redondeados */
}

/* Enlaces dentro del dropdown */
.dropdown-content a {
  color: #333; /* Texto gris oscuro */
  padding: 12px 16px; /* Espaciado interno */
  text-decoration: none; /* Elimina el subrayado */
  display: block; /* Hace que el enlace ocupe todo el ancho */
  transition: background-color 0.3s ease; /* Suaviza la transición de color */
}

/* Hover en los enlaces del dropdown */
.dropdown-content a:hover {
  background-color: #f1f1f1; /* Cambia el fondo a gris claro al hacer hover */
  color: #005BA2; /* Cambia el color del texto a azul al hacer hover */
}

/* Mostrar el menú al hacer hover sobre el icono de perfil */
.profile-icon:hover .dropdown-content {
  display: block; /* Muestra el dropdown al hacer hover */
}

/* Opcional para suavizar la transición */
.dropdown-content a {
  transition: background-color 0.3s, color 0.3s; /* Suaviza las transiciones de fondo y color */
}

  </style>
    