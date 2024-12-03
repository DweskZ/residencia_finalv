<template>
  <div class="form-page">
    <!-- Encabezado -->
    <header class="header">
      <h1>Solicitud de Residencia</h1>
    </header>

    <!-- Contenedor del formulario -->
    <div class="form-container">
      <form class="solicitud-form" @submit="handleSubmit">
        <!-- Mostrar errores -->
        <ul v-if="errors.length" class="error-list">
          <li v-for="error in errors" :key="error" class="error-item">
            {{ error }}
          </li>
        </ul>

        <div class="input-group">
          <label for="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            v-model="formData.nombre"
            placeholder="Ingrese su nombre"
            required
          />
        </div>

        <div class="input-group">
          <label for="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            v-model="formData.apellido"
            placeholder="Ingrese su apellido"
            required
          />
        </div>

        <div class="input-group">
          <label for="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div class="input-group">
          <label for="habitaciones">Número de Habitaciones</label>
          <select id="habitaciones" v-model="formData.habitaciones">
            <option value="1">1 Habitación</option>
            <option value="2">2 Habitaciones</option>
            <option value="3">3 Habitaciones</option>
          </select>
        </div>

        <div class="dates-container">
          <div class="date-group">
            <label for="fechaInicio">Fecha de inicio</label>
            <input
              type="date"
              id="fechaInicio"
              v-model="formData.fechaInicio"
              required
            />
          </div>

          <div class="date-group">
            <label for="fechaFin">Fecha de fin</label>
            <div class="date-with-checkbox">
              <input
                type="date"
                id="fechaFin"
                v-model="formData.fechaFin"
                :disabled="formData.indefinido"
              />
              <div class="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="indefinido"
                  v-model="formData.indefinido"
                  @change="handleIndefinidoChange"
                />
                <label for="indefinido">Tiempo indefinido</label>
              </div>
            </div>
          </div>
        </div>

        <div class="input-group">
          <label for="comentarios">Comentarios adicionales</label>
          <textarea
            id="comentarios"
            v-model="formData.comentarios"
            placeholder="Escriba aquí..."
            rows="4"
          ></textarea>
        </div>

        <div class="button-group">
          <button type="submit" class="btn-primary">Enviar Solicitud</button>
          <button type="button" @click="goBack" class="btn-secondary">
            Regresar al Login
          </button>
        </div>
      </form>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <p>UNIVERSIDAD LAICA ELOY ALFARO DE MANABÍ - TODOS LOS DERECHOS RESERVADOS</p>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'StudentForm',
  setup() {
    const formData = ref({
      nombre: '',
      apellido: '',
      email: '',
      habitaciones: '1',
      fechaInicio: '',
      fechaFin: '',
      indefinido: false,
      comentarios: '',
    });

    const errors = ref([]);

    const handleSubmit = (event) => {
      event.preventDefault();
      errors.value = [];

      // Validaciones
      if (!formData.value.nombre.trim()) {
        errors.value.push('El nombre es obligatorio.');
      } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.value.nombre)) {
        errors.value.push('El nombre solo puede contener letras.');
      }

      if (!formData.value.apellido.trim()) {
        errors.value.push('El apellido es obligatorio.');
      } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.value.apellido)) {
        errors.value.push('El apellido solo puede contener letras.');
      }

      if (!formData.value.email.trim()) {
        errors.value.push('El correo electrónico es obligatorio.');
      } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
        errors.value.push('El correo electrónico no es válido.');
      }

      if (!formData.value.indefinido) {
        const fechaInicio = new Date(formData.value.fechaInicio);
        const fechaFin = new Date(formData.value.fechaFin);

        if (isNaN(fechaInicio.getTime())) {
          errors.value.push('La fecha de inicio es obligatoria.');
        }

        if (isNaN(fechaFin.getTime())) {
          errors.value.push('La fecha de fin es obligatoria.');
        } else if (fechaFin <= fechaInicio) {
          errors.value.push('La fecha de fin debe ser mayor que la fecha de inicio.');
        }
      }

      if (errors.value.length > 0) return;

      // Crear JSON y XML
      const jsonData = JSON.stringify(formData.value, null, 2);
      const xmlData = `
        <solicitud>
          <nombre>${formData.value.nombre}</nombre>
          <apellido>${formData.value.apellido}</apellido>
          <email>${formData.value.email}</email>
          <habitaciones>${formData.value.habitaciones}</habitaciones>
          <fechaInicio>${formData.value.fechaInicio}</fechaInicio>
          <fechaFin>${formData.value.indefinido ? 'Indefinido' : formData.value.fechaFin}</fechaFin>
          <comentarios>${formData.value.comentarios}</comentarios>
        </solicitud>
      `;

      // Guardar en localStorage
      const storedData = JSON.parse(localStorage.getItem('solicitudes') || '[]');
      storedData.push({ jsonData, xmlData });
      localStorage.setItem('solicitudes', JSON.stringify(storedData));

      alert('Solicitud guardada exitosamente.');
    };

    const handleIndefinidoChange = () => {
      if (formData.value.indefinido) {
        formData.value.fechaFin = '';
      }
    };

    const goBack = () => {
      window.location.href = '/';
    };

    return {
      formData,
      errors,
      handleSubmit,
      handleIndefinidoChange,
      goBack,
    };
  },
};
</script>
  
  <style scoped>
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.body, .html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-x: hidden; /* Evita cualquier desbordamiento horizontal */
}

  .form-page {
    background-color: #e3e5e9;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .header {
    background-color: #005ba2;
    color: white;
    padding: 20px;
    text-align: center;
  }
  
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 20px;
  }
  
  .solicitud-form {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 600px;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: bold;
  }
  
  input,
  select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .dates-container {
    display: flex;
    gap: 20px;
  }
  
  .date-group {
    flex: 1;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .btn-primary {
    background-color: #005ba2;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    width: 100%;
  }
  
  .btn-primary:hover {
    background-color: #004b85;
  }
  
  .btn-secondary {
    background-color: #d71920;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    width: 100%;
  }
  
  .btn-secondary:hover {
    background-color: #b8151b;
  }
  
  .footer {
    background-color: #005ba2;
    color: white;
    text-align: center;
    padding: 15px;
    margin-top: auto;
  }
  /* Errores */
.error-list {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ffd1d1;
  border: 1px solid #ff6b6b;
  color: #d8000c;
  border-radius: 5px;
  list-style: none;
}
.error-item {
  margin: 5px 0;
}

  </style>
  