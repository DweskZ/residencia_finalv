import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/Pages/LoginPage.vue';
import ResidenceForm from '../components/Pages/ResidenceForm.vue';
import AdminDashboard from '@/components/Pages/AdminDashboard.vue'; 
import GestionHabitaciones from '@/components/Pages/GestionHabitaciones.vue';
import PerfilPage from '@/components/Pages/PerfilPage.vue';
const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/residenceform',
    name: 'ResidenceForm',
    component: ResidenceForm
  },
  {
    path: '/admindashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path : '/gestionhabitaciones',
    name : 'GestionHabitaciones',
    component : GestionHabitaciones
  },
  {
    path : '/perfilpage',
    name : 'PerfilPage',
    component : PerfilPage
  },
  {
    path: '/admindashboard',
    name: 'AdminDashboard',
    component: () => import('@/components/Pages/AdminDashboard.vue'),
  },
  {
    path: '/dashboard-estudiante',
    name: 'DashboardEstudiante',
    //component: () => import('@/components/Pages/DashboardEstudiante.vue'),
  },
  {
    path: '/pagospage',
    name: 'PagosPage',
    component: () => import('@/components/Pages/PagosPage.vue'),
  },
  {
    path: '/solicitudespage',
    name: 'SolicitudesPage',
    component: () => import('@/components/Pages/SolicitudesPage.vue'),
  },
  {
    path: '/residentdashboard',
    name: 'ResidentDashboard',
    component: () => import('@/components/Pages/ResidentDashboard.vue'),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;