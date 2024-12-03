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
  
      <!-- Contenedor principal -->
      <div class="main-container">
        <!-- Pestañas -->
        <div class="tabs">
          <button
            class="tablink"
            :class="{ active: activeTab === 'Habitacion' }"
            @click="changeTab('Habitacion')"
          >
            Habitación
          </button>
          <button
            class="tablink"
            :class="{ active: activeTab === 'Pagos' }"
            @click="changeTab('Pagos')"
          >
            Pagos
          </button>
          <button
            class="tablink"
            :class="{ active: activeTab === 'Solicitudes' }"
            @click="changeTab('Solicitudes')"
          >
            Solicitudes
          </button>
        </div>
  
        <!-- Contenido de las pestañas -->
        <div class="tab-content">
          <div v-if="activeTab === 'Habitacion'" class="tabcontent active">
            <h2>Detalles de la Habitación</h2>
            <div class="card">
              <p><strong>Habitación Asignada:</strong> {{ habitacion.numero }}</p>
              <p><strong>Estado:</strong> {{ habitacion.estado }}</p>
              <p><strong>Residente:</strong> {{ habitacion.residente }}</p>
              <p><strong>Fecha de Asignación:</strong> {{ habitacion.fechaAsignacion }}</p>
              <button>Ver más detalles</button>
            </div>
          </div>
  
          <div v-if="activeTab === 'Pagos'" class="tabcontent">
            <h2>Pagos Pendientes</h2>
            <table>
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pago, index) in pagos" :key="index">
                  <td>{{ pago.mes }}</td>
                  <td>{{ pago.estado }}</td>
                  <td>
                    <button v-if="pago.estado === 'Pendiente'" @click="realizarPago(index)">
                      Cancelar Pago
                    </button>
                    <button v-else>Ver Detalles</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button class="add-action" @click="realizarNuevoPago">Realizar nuevo pago</button>
          </div>
  
          <div v-if="activeTab === 'Solicitudes'" class="tabcontent">
            <h2>Solicitudes de Mantenimiento</h2>
            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(solicitud, index) in solicitudes" :key="index">
                  <td>{{ solicitud.tipo }}</td>
                  <td>{{ solicitud.estado }}</td>
                  <td>
                    <button @click="actualizarEstado(index)">Actualizar Estado</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button class="add-action" @click="nuevaSolicitud">Hacer nueva solicitud</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'ResidentDashboard',
    setup() {
      const activeTab = ref('Habitacion');
  
      const habitacion = ref({
        numero: '102',
        estado: 'Ocupada',
        residente: 'Juan Pérez',
        fechaAsignacion: '01/01/2024',
      });
  
      const pagos = ref([
        { mes: 'Marzo 2024', estado: 'Pendiente' },
        { mes: 'Febrero 2024', estado: 'Cancelado' },
      ]);
  
      const solicitudes = ref([
        { tipo: 'Mantenimiento', estado: 'Pendiente' },
      ]);
  
      const dropdownOpen = ref(false);
  
      const toggleDropdown = () => {
        dropdownOpen.value = !dropdownOpen.value;
      };
  
      const changeTab = (tab) => {
        activeTab.value = tab;
      };
  
      const realizarPago = (index) => {
        pagos.value[index].estado = 'Cancelado';
        alert('Pago realizado con éxito.');
      };
  
      const realizarNuevoPago = () => {
        alert('Inicia el proceso para un nuevo pago.');
      };
  
      const actualizarEstado = (index) => {
        solicitudes.value[index].estado = 'Resuelto';
        alert('Estado actualizado.');
      };
  
      const nuevaSolicitud = () => {
        alert('Formulario para nueva solicitud.');
      };
  
      return {
        activeTab,
        habitacion,
        pagos,
        solicitudes,
        dropdownOpen,
        toggleDropdown,
        changeTab,
        realizarPago,
        realizarNuevoPago,
        actualizarEstado,
        nuevaSolicitud,
      };
    },
  };
  </script>
  
  <style scoped>
/* Estilos básicos */
* {
  margin: 0; /* Elimina el margen predeterminado en todos los elementos */
  padding: 0; /* Elimina el padding predeterminado en todos los elementos */
  box-sizing: border-box; /* Incluye padding y bordes dentro del tamaño total del elemento */
  font-family: 'Roboto', sans-serif; /* Aplica la fuente 'Roboto' a todo el documento */
}

body {
  background-color: #E3E5E9; /* Aplica un fondo gris claro al cuerpo del documento */
}

/* Barra superior */
.top-bar {
  width: 100%; /* Ocupa el 100% del ancho de la página */
  height: 60px; /* Altura fija de la barra */
  background-color: #005BA2; /* Color de fondo azul */
  display: flex; /* Flexbox para alinear el contenido */
  justify-content: space-between; /* Distribuye el contenido con espacio entre los elementos */
  align-items: center; /* Centra verticalmente los elementos */
  padding: 0 20px; /* Espaciado horizontal de 20px */
  position: fixed; /* Fija la barra en la parte superior */
  top: 0; /* Fija la barra en la parte superior de la pantalla */
  left: 0; /* Alinea la barra a la izquierda */
  z-index: 2; /* Asegura que la barra esté sobre otros elementos */
}

.top-bar img {
  height: 50px; /* Tamaño del logo */
}

.profile-icon {
  position: relative; /* Permite el dropdown relacionado */
  display: inline-block; /* Hace que el icono se ajuste a su contenido */
}

.profile-icon img {
  border-radius: 50%; /* Hace que la imagen de perfil sea circular */
  width: 40px; /* Define el ancho de la imagen de perfil */
  height: 40px; /* Define la altura de la imagen de perfil */
  cursor: pointer; /* Cambia el cursor al pasar por encima */
}

/* Dropdown Content */
.dropdown-content {
  display: none; /* Oculta el menú por defecto */
  position: absolute; /* Posiciona el dropdown con respecto a su contenedor */
  background-color: #ffffff; /* Fondo blanco */
  right: 0; /* Posiciona el dropdown a la derecha */
  min-width: 160px; /* Ancho mínimo del menú desplegable */
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2); /* Sombra para darle profundidad */
  z-index: 1; /* Asegura que el menú esté por encima de otros elementos */
  border-radius: 5px; /* Bordes redondeados */
}

.dropdown-content a {
  color: #333; /* Color del texto */
  padding: 12px 16px; /* Espaciado interno */
  text-decoration: none; /* Elimina subrayado en los enlaces */
  display: block; /* Asegura que los enlaces ocupen todo el ancho del dropdown */
  transition: background-color 0.3s ease; /* Transición suave en el color de fondo */
}

.dropdown-content a:hover {
  background-color: #f1f1f1; /* Cambia el fondo al pasar el cursor */
  color: #005BA2; /* Cambia el color del texto al pasar el cursor */
}

.profile-icon:hover .dropdown-content {
  display: block; /* Muestra el dropdown cuando se pasa el cursor sobre el icono de perfil */
}

/* Contenedor principal */
.main-container {
  display: flex; /* Flexbox para disposición horizontal de pestañas y contenido */
  margin: 100px auto 20px auto; /* Espacio superior para la barra y margen inferior */
  max-width: 1000px; /* Ancho máximo del contenedor */
  background-color: white; /* Fondo blanco del contenedor */
  border-radius: 10px; /* Bordes redondeados */
  overflow: hidden; /* Oculta desbordamiento */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
}

/* Pestañas */
.tabs {
  display: flex; /* Flexbox para organizar pestañas */
  flex-direction: column; /* Alinea pestañas verticalmente */
  width: 200px; /* Ancho fijo para las pestañas */
  background-color: #005BA2; /* Fondo azul para las pestañas */
}

.tablink {
  background-color: #005BA2; /* Fondo azul para los botones de pestañas */
  color: white; /* Texto blanco */
  padding: 20px; /* Espaciado interno */
  text-align: left; /* Alineación del texto */
  border: none; /* Sin bordes */
  cursor: pointer; /* Cambia el cursor al pasar por encima */
  font-size: 16px; /* Tamaño de fuente */
  transition: background-color 0.3s; /* Transición suave al cambiar el fondo */
}

.tablink:hover {
  background-color: #004080; /* Fondo más oscuro cuando se pasa el cursor */
}

.tablink.active {
  background-color: #D71920; /* Fondo rojo para la pestaña activa */
}

/* Contenido de las pestañas */
.tab-content {
  flex-grow: 1; /* El contenido ocupa todo el espacio restante */
  padding: 30px; /* Espaciado interno */
}

.tabcontent {
  display: none; /* El contenido está oculto por defecto */
}

.tabcontent.active {
  display: block; /* Muestra el contenido de la pestaña activa */
}

h2 {
  color: #005BA2; /* Color azul para los títulos */
  margin-bottom: 20px; /* Margen inferior */
}

/* Estilo de las tarjetas */
.card {
  background-color: #dddcdceb; /* Fondo gris claro */
  border-radius: 8px; /* Bordes redondeados */
  padding: 20px; /* Espaciado interno */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
}

.card p {
  margin-bottom: 10px; /* Espaciado inferior */
  font-size: 16px; /* Tamaño de fuente */
}

/* Tablas */
table {
  width: 100%; /* Ocupa todo el ancho disponible */
  border-collapse: collapse; /* Combina bordes adyacentes */
  margin-bottom: 20px; /* Margen inferior */
}

table th, table td {
  padding: 12px; /* Espaciado interno en celdas */
  border-bottom: 1px solid #ddd; /* Línea inferior de las celdas */
}

table th {
  background-color: #005BA2; /* Fondo azul para los encabezados */
  color: white; /* Texto blanco */
  text-align: left; /* Alineación del texto */
}

table tr:hover {
  background-color: #f1f1f1; /* Cambia el fondo al pasar el cursor sobre las filas */
}

/* Botones */
button {
  background-color: #D71920; /* Fondo rojo para los botones */
  color: white; /* Texto blanco */
  border: none; /* Sin bordes */
  padding: 10px 15px; /* Espaciado interno */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar por encima */
  transition: background-color 0.3s; /* Transición suave para el fondo */
}

button:hover {
  background-color: #a31313; /* Fondo rojo más oscuro cuando se pasa el cursor */
}

.add-action {
  background-color: #005BA2; /* Fondo azul para los botones de acción adicional */
  margin-top: 10px; /* Margen superior */
}

.add-action:hover {
  background-color: #004080; /* Fondo azul más oscuro cuando se pasa el cursor */
}

/* Responsivo */
@media (max-width: 768px) {
  .main-container {
    flex-direction: column; /* Coloca pestañas encima del contenido */
    margin-top: 80px;
    width: 90%; /* Reduce el ancho en pantallas pequeñas */
  }

  .tabs {
    flex-direction: row; /* Pestañas alineadas horizontalmente */
    width: 100%; /* Pestañas ocupan todo el ancho */
  }

  .tablink {
    flex: 1; /* Cada pestaña ocupa espacio equitativo */
    text-align: center; /* Centra el texto */
    padding: 15px; /* Reduce el espaciado interno */
  }

  .tab-content {
    padding: 20px; /* Reduce el espaciado interno del contenido */
  }
}
  </style>
  