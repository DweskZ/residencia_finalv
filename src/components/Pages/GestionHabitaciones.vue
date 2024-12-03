
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
        <li><router-link class="active" to="/gestionhabitaciones">Gestión de Habitaciones</router-link></li>
        <li><router-link to="/pagospage">Pagos</router-link></li>
        <li><router-link to="/solicitudespage">Solicitudes de Mantenimiento</router-link></li>
      </ul>
      </aside>
  
      <!-- Contenido principal -->
      <main class="main-content">
        <header>
          <h1>Gestión de Habitaciones</h1>
          <div class="dropdown">
            <button id="agregarHabitacion" @click="mostrarCuadriculaHabitaciones">Agregar Habitación</button>
            <div v-if="dropdownOpen" class="dropdown-content">
              <button
                v-for="numero in 50"
                :key="numero"
                :disabled="habitacionesOcupadas.includes(numero.toString())"
                @click="agregarHabitacion(numero)"
              >
                {{ numero }}
              </button>
            </div>
          </div>
        </header>
  
        <section class="habitaciones-table">
          <table>
            <thead>
              <tr>
                <th>Número de Habitación</th>
                <th>Estado</th>
                <th>Residente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="habitacion in habitaciones" :key="habitacion.id">
                <td>{{ habitacion.numero }}</td>
                <td>{{ habitacion.estado }}</td>
                <td>{{ habitacion.residente || 'Sin residente' }}</td>
                <td>
                  <button @click="verDetalles(habitacion.id)">Detalles</button>
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
    name: 'GestionHabitaciones',
    setup() {
      const habitaciones = ref(JSON.parse(localStorage.getItem('habitaciones')) || []);
      const dropdownOpen = ref(false);
  
      const habitacionesOcupadas = habitaciones.value
        .filter((h) => h.estado === 'ocupada')
        .map((h) => h.numero);
  
      const mostrarCuadriculaHabitaciones = () => {
        dropdownOpen.value = !dropdownOpen.value;
      };
  
      const agregarHabitacion = (numero) => {
        const nuevaHabitacion = {
          id: habitaciones.value.length + 1,
          numero: numero.toString(),
          estado: 'disponible',
          residente: null,
        };
  
        habitaciones.value.push(nuevaHabitacion);
        localStorage.setItem('habitaciones', JSON.stringify(habitaciones.value));
        dropdownOpen.value = false;
      };
  
      const verDetalles = (id) => {
        alert(`Detalles de la habitación con ID: ${id}`);
      };
  
      const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
      };
  
      return {
        habitaciones,
        habitacionesOcupadas,
        dropdownOpen,
        mostrarCuadriculaHabitaciones,
        agregarHabitacion,
        verDetalles,
        logout,
      };
    },
  };
  </script>
  
  <style scoped>
/* Reset básico */
* {
  margin: 0; /* Elimina los márgenes por defecto */
  padding: 0; /* Elimina el padding por defecto */
  box-sizing: border-box; /* Asegura que el padding y el borde se incluyan en el ancho total */
  font-family: 'Roboto', sans-serif; /* Aplica la fuente Roboto a todo el documento */
}

/* Contenedor principal */
.container {
  display: flex; /* Usa flexbox para organizar los elementos */
  height: 100vh; /* Ocupa toda la altura de la ventana */
}

/* Menú lateral (sidebar) */
.sidebar {
  background-color: #005BA2; /* Fondo azul */
  color: white; /* Texto blanco */
  padding: 20px; /* Espaciado interno */
  width: 250px; /* Ancho fijo */
  z-index: 1; /* Prioridad visual */
  position: fixed; /* Barra lateral fija */
  top: 60px; /* Deja espacio para la barra superior */
  height: calc(100vh - 60px); /* Calcula la altura restante */
}

.sidebar h2 {
  margin-bottom: 20px; /* Espaciado debajo del título */
}

.sidebar ul {
  list-style-type: none; /* Elimina los bullets */
  padding-left: 0; /* Elimina el espaciado a la izquierda */
}

.sidebar ul li {
  margin-bottom: 15px; /* Espaciado entre los elementos de la lista */
}

.sidebar ul li a {
  display: block; /* Hace que el enlace ocupe todo el ancho */
  text-decoration: none; /* Elimina el subrayado */
  color: white; /* Texto blanco */
  padding: 10px; /* Espaciado interno */
  background-color: transparent; /* Fondo transparente */
  border-radius: 5px; /* Bordes redondeados */
  font-size: 14px; /* Tamaño de texto */
  transition: background-color 0.3s ease, color 0.3s ease; /* Transiciones suaves */
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */
  text-overflow: ellipsis; /* Añade puntos suspensivos si el texto es demasiado largo */
  overflow: hidden; /* Oculta el texto que desborda */
}

.sidebar ul li a.active {
  background-color: #D71920; /* Fondo rojo para el enlace activo */
}

.sidebar ul li a:hover {
  background-color: #005BA2; /* Mantiene el fondo azul en hover */
}

/* Contenido principal */
.main-content {
  flex-grow: 1; /* Se expande para llenar el espacio */
  padding: 40px; /* Espaciado interno */
  background-color: #E3E5E9; /* Fondo gris claro */
  margin-left: 250px; /* Espacio para la barra lateral */
  margin-top: 60px; /* Espacio para la barra superior */
}

header h1 {
  margin-bottom: 20px; /* Espaciado inferior */
}

/* Tabla de habitaciones */
.habitaciones-table table {
  width: 100%; /* La tabla ocupa todo el ancho */
  border-collapse: collapse; /* Elimina los espacios entre celdas */
  background-color: white; /* Fondo blanco */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra */
}

.habitaciones-table th, .habitaciones-table td {
  padding: 15px; /* Espaciado interno */
  text-align: left; /* Texto alineado a la izquierda */
}

.habitaciones-table th {
  background-color: #005BA2; /* Fondo azul */
  color: white; /* Texto blanco */
}

.habitaciones-table td {
  border-bottom: 1px solid #ccc; /* Línea inferior */
}

.habitaciones-table tbody tr:nth-child(even) {
  background-color: #f4f4f9; /* Fondo gris para las filas pares */
}

/* Botones dentro de la tabla */
.habitaciones-table button {
  padding: 10px; /* Espaciado interno */
  background-color: #D71920; /* Fondo rojo */
  color: white; /* Texto blanco */
  border: none; /* Sin bordes */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar el ratón */
  transition: background-color 0.3s ease; /* Transición suave para el color */
}

.habitaciones-table button:hover {
  background-color: #005BA2; /* Cambia el fondo a azul en hover */
}

/* Botones generales */
button {
  transition: background-color 0.3s ease; /* Transición suave para el color */
}

button:hover {
  background-color: #D71920; /* Cambia el fondo a rojo en hover */
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .container {
      flex-direction: column; /* Pone la barra lateral encima del contenido */
  }

  .sidebar {
      width: 100%; /* La barra lateral ocupa todo el ancho */
      padding: 10px; /* Reduce el espaciado */
      text-align: center; /* Centra el texto */
  }

  .sidebar ul li {
      margin: 10px 0; /* Reduce el espaciado entre elementos de la lista */
  }

  .main-content {
      padding: 20px; /* Reduce el espaciado interno */
  }
}

/* Estilos para pantallas muy pequeñas (móviles) */
@media (max-width: 480px) {
  .main-content {
      padding: 10px; /* Reduce el espaciado interno */
  }

  .sidebar ul li {
      font-size: 14px; /* Reduce el tamaño de la fuente */
  }

  .sidebar h2 {
      font-size: 16px; /* Reduce el tamaño del título */
  }
}

/* Estilo para el botón de agregar habitación */
#agregarHabitacion {
  background-color: #005BA2; /* Fondo azul */
  color: white; /* Texto blanco */
  padding: 10px 20px; /* Espaciado interno */
  border: none; /* Sin bordes */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor en hover */
  font-size: 16px; /* Tamaño de fuente */
  margin-bottom: 20px; /* Espaciado inferior */
}

#agregarHabitacion:hover {
  background-color: #D71920; /* Cambia el fondo a rojo en hover */
}

/* Estilo para el contenedor desplegable de la cuadrícula */
.dropdown {
  position: relative; /* Posiciona el dropdown respecto al botón */
  display: inline-block; /* Alinea los elementos */
}

.dropdown-content {
  display: none; /* Oculta el contenido por defecto */
  position: absolute; /* Posiciona el dropdown de forma absoluta */
  background-color: white; /* Fondo blanco */
  right: 50; /* Alinea el dropdown */
  min-width: 160px; /* Ancho mínimo */
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); /* Sombra */
  padding: 10px; /* Espaciado interno */
  border-radius: 8px; /* Bordes redondeados */
}

.dropdown-content.show {
  display: grid; /* Muestra el dropdown en formato de cuadrícula */
  grid-template-columns: repeat(5, 1fr); /* Crea una cuadrícula de 5 columnas */
  gap: 5px; /* Espaciado entre los elementos */
}

/* Ajustes para los botones dentro de la cuadrícula */
.dropdown-content button {
  padding: 10px; /* Espaciado interno */
  font-size: 14px; /* Tamaño de fuente */
  text-align: center; /* Centra el texto */
  cursor: pointer; /* Cambia el cursor en hover */
  background-color: #005BA2; /* Fondo azul */
  color: white; /* Texto blanco */
  border: none; /* Sin bordes */
  border-radius: 5px; /* Bordes redondeados */
  width: 40px; /* Ancho fijo */
  height: 40px; /* Altura fija */
  margin: 2px; /* Espaciado entre botones */
  display: flex; /* Flexbox para centrar el contenido */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
}

.dropdown-content button[disabled] {
  background-color: red; /* Fondo rojo para botones deshabilitados */
  cursor: not-allowed; /* Cambia el cursor a no permitido */
}

.dropdown-content button:hover {
  background-color: #87CEEB; /* Cambia el fondo en hover */
}

/* Barra superior */
.top-bar {
  width: 100%; /* Ocupa todo el ancho */
  height: 60px; /* Altura fija */
  background-color: #005BA2; /* Fondo azul */
  display: flex; /* Flexbox para organizar los elementos */
  justify-content: space-between; /* Espaciado entre el logo y el perfil */
  align-items: center; /* Alinea verticalmente */
  padding: 0 20px; /* Espaciado interno */
  position: fixed; /* Barra fija en la parte superior */
  top: 0; /* Posicionada en la parte superior */
  left: 0; /* Alineada a la izquierda */
  z-index: 2; /* Prioridad visual */
}

.top-bar img {
  height: 50px; /* Ajusta la altura del logo */
}

/* Icono de perfil */
.profile-icon {
  position: relative; /* Posiciona el dropdown respecto al icono */
  display: inline-block; /* Alinea los elementos */
}

.profile-icon img {
  border-radius: 50%; /* Hace que el icono sea redondo */
  width: 40px; /* Ancho fijo */
  height: 40px; /* Altura fija */
  cursor: pointer; /* Cambia el cursor en hover */
}

/* Dropdown específico para el icono de perfil */
.profile-dropdown-content {
  display: none; /* Oculta el dropdown por defecto */
  position: absolute; /* Posiciona el dropdown */
  background-color: #ffffff; /* Fondo blanco */
  right: 0; /* Alinea el dropdown a la derecha */
  min-width: 160px; /* Ancho mínimo */
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); /* Sombra */
  z-index: 1; /* Prioridad visual */
  border-radius: 5px; /* Bordes redondeados */
}

.profile-icon:hover .profile-dropdown-content {
  display: block; /* Muestra el dropdown al pasar el cursor */
}

/* Links dentro del dropdown de perfil */
.profile-dropdown-content a {
  color: #333; /* Texto gris oscuro */
  padding: 12px 16px; /* Espaciado interno */
  text-decoration: none; /* Elimina el subrayado */
  display: block; /* Hace que el enlace ocupe todo el ancho */
  transition: background-color 0.3s ease; /* Transición suave en hover */
}

/* Hover en los links del dropdown de perfil */
.profile-dropdown-content a:hover {
  background-color: #f1f1f1; /* Cambia el fondo en hover */
  color: #005BA2; /* Cambia el color del texto */
}
  </style>
  