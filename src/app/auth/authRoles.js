/**
 * Authorization Roles
 */
const authRoles = {
  admin: ["Administrador", "Trabajadores Prisma"],
  staff: ["Trabajadores Prisma"],
  user: ['Administrador', 'Cliente', 'Trabajadores Prisma', 'Pc Plus', 'sadasd'],
  onlyGuest: [],
};

export default authRoles;
