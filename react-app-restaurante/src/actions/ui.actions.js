import { types } from "../types/types";

export const openModal = (modalType) => {
  switch (modalType) {
    case "employees":
      return { type: types.uiOpenEmpleadosModal };

    case "jobs":
      return { type: types.uiOpenPuestosModal };

    case "tables":
      return { type: types.uiOpenTableModal };

    case "brands":
      return { type: types.uiOpenBrandModal };

    case "suppliers":
      return { type: types.uiOpenSupplierModal };

    case "users":
      return { type: types.uiOpenUserModal };

    case "rol":
      return { type: types.uiOpenRolModal };

    case "consecutivos":
      return { type: types.uiOpenConsecutivoModal };

    case "unidad_medida":
      return { type: types.uiOpenUnidadMedidaModal };

    case "country":
      return { type: types.uiOpenCountryModal };

    case "comestibles":
      return { type: types.uiOpenComestiblesModal };

    case "desechables":
      return { type: types.uiOpenDesechablesModal };

    case "limpieza":
      return { type: types.uiOpenLimpiezaModal };

    case "equipos":
      return { type: types.uiOpenEquiposModal };

    case "tecnologia":
      return { type: types.uiOpenTecnologiaModal };

    case "buffets":
      return { type: types.uiOpenBuffetModal };

    case "especialidades":
      return { type: types.uiOpenEspecialidadesModal };

    default:
      return {};
  }
};

export const closeModal = (modalType) => {
  switch (modalType) {
    case "employees":
      return { type: types.uiCloseEmpleadosModal };

    case "jobs":
      return { type: types.uiClosePuestosModal };

    case "tables":
      return { type: types.uiCloseTableModal };

    case "brands":
      return { type: types.uiCloseBrandModal };

    case "suppliers":
      return { type: types.uiCloseSupplierModal };

    case "users":
      return { type: types.uiCloseUserModal };

    case "rol":
      return { type: types.uiCloseRolModal };

    case "consecutivos":
      return { type: types.uiCloseConsecutivoModal };

    case "unidad_medida":
      return { type: types.uiCloseUnidadMedidaModal };

    case "country":
      return { type: types.uiCloseCountryModal };

    case "comestibles":
      return { type: types.uiCloseComestiblesModal };

    case "desechables":
      return { type: types.uiCloseDesechablesModal };

    case "limpieza":
      return { type: types.uiCloseLimpiezaModal };

    case "equipos":
      return { type: types.uiCloseEquiposModal };

    case "tecnologia":
      return { type: types.uiCloseTecnologiaModal };

    case "buffets":
      return { type: types.uiCloseBuffetModal };

    case "especialidades":
      return { type: types.uiCloseEspecialidadesModal };

    default:
      return {};
  }
};
