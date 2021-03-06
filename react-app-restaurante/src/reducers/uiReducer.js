import { types } from "../types/types";

const initialState = {
  empleadosModalOpen: false,
  puestosModalOpen: false,
  tableModalOpen: false,
  brandsModalOpen: false,
  supplierModalOpen: false,
  userModalOpen: false,
  rolModalOpen: false,
  consecutivoModalOpen: false,
  unidadMedidaModalOpen: false,
  comestiblesModalOpen: false,
  desechablesModalOpen: false,
  limpiezaModalOpen: false,
  equiposModalOpen: false,
  tecnologiaModalOpen: false,
  buffetModalOpen: false,
  especialidadesModalOpen: false,
  bebidasCalientesModalOpen: false,
  bebidasHeladasModalOpen: false,
  bebidasGaseosasModalOpen: false,
  licoresModalOpen: false,
  vinosModalOpen: false,
  ordenesModalOpen: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenEmpleadosModal:
      return {
        ...state,
        empleadosModalOpen: true,
      };

    case types.uiCloseEmpleadosModal:
      return {
        ...state,
        empleadosModalOpen: false,
      };

    case types.uiOpenPuestosModal:
      return {
        ...state,
        puestosModalOpen: true,
      };

    case types.uiClosePuestosModal:
      return {
        ...state,
        puestosModalOpen: false,
      };

    case types.uiOpenTableModal:
      return {
        ...state,
        tableModalOpen: true,
      };

    case types.uiCloseTableModal:
      return {
        ...state,
        tableModalOpen: false,
      };

    case types.uiOpenBrandModal:
      return {
        ...state,
        brandsModalOpen: true,
      };

    case types.uiCloseBrandModal:
      return {
        ...state,
        brandsModalOpen: false,
      };

    case types.uiOpenSupplierModal:
      return {
        ...state,
        supplierModalOpen: true,
      };

    case types.uiCloseSupplierModal:
      return {
        ...state,
        supplierModalOpen: false,
      };

    case types.uiOpenUserModal:
      return {
        ...state,
        userModalOpen: true,
      };

    case types.uiCloseUserModal:
      return {
        ...state,
        userModalOpen: false,
      };

    case types.uiOpenRolModal:
      return {
        ...state,
        rolModalOpen: true,
      };

    case types.uiCloseRolModal:
      return {
        ...state,
        rolModalOpen: false,
      };

    case types.uiOpenConsecutivoModal:
      return {
        ...state,
        consecutivoModalOpen: true,
      };

    case types.uiCloseConsecutivoModal:
      return {
        ...state,
        consecutivoModalOpen: false,
      };

    case types.uiOpenUnidadMedidaModal:
      return {
        ...state,
        unidadMedidaModalOpen: true,
      };

    case types.uiCloseUnidadMedidaModal:
      return {
        ...state,
        unidadMedidaModalOpen: false,
      };

    case types.uiOpenCountryModal:
      return {
        ...state,
        countryModalOpen: true,
      };

    case types.uiCloseCountryModal:
      return {
        ...state,
        countryModalOpen: false,
      };

    case types.uiOpenComestiblesModal:
      return {
        ...state,
        comestiblesModalOpen: true,
      };

    case types.uiCloseComestiblesModal:
      return {
        ...state,
        comestiblesModalOpen: false,
      };

    case types.uiOpenDesechablesModal:
      return {
        ...state,
        desechablesModalOpen: true,
      };

    case types.uiCloseDesechablesModal:
      return {
        ...state,
        desechablesModalOpen: false,
      };

    case types.uiOpenLimpiezaModal:
      return {
        ...state,
        limpiezaModalOpen: true,
      };

    case types.uiCloseLimpiezaModal:
      return {
        ...state,
        limpiezaModalOpen: false,
      };

    case types.uiOpenEquiposModal:
      return {
        ...state,
        equiposModalOpen: true,
      };

    case types.uiCloseEquiposModal:
      return {
        ...state,
        equiposModalOpen: false,
      };

    case types.uiOpenTecnologiaModal:
      return {
        ...state,
        tecnologiaModalOpen: true,
      };

    case types.uiCloseTecnologiaModal:
      return {
        ...state,
        tecnologiaModalOpen: false,
      };

    case types.uiOpenBuffetModal:
      return {
        ...state,
        buffetModalOpen: true,
      };

    case types.uiCloseBuffetModal:
      return {
        ...state,
        buffetModalOpen: false,
      };

    case types.uiOpenEspecialidadesModal:
      return {
        ...state,
        especialidadesModalOpen: true,
      };

    case types.uiCloseEspecialidadesModal:
      return {
        ...state,
        especialidadesModalOpen: false,
      };

    case types.uiOpenBebidasCalientesModal:
      return {
        ...state,
        bebidasCalientesModalOpen: true,
      };

    case types.uiCloseBebidasCalientesModal:
      return {
        ...state,
        bebidasCalientesModalOpen: false,
      };

    case types.uiOpenBebidasHeladasModal:
      return {
        ...state,
        bebidasHeladasModalOpen: true,
      };

    case types.uiCloseBebidasHeladasModal:
      return {
        ...state,
        bebidasHeladasModalOpen: false,
      };

    case types.uiOpenBebidasGaseosasModal:
      return {
        ...state,
        bebidasGaseosasModalOpen: true,
      };

    case types.uiCloseBebidasGaseosasModal:
      return {
        ...state,
        bebidasGaseosasModalOpen: false,
      };

    case types.uiOpenLicoresModal:
      return {
        ...state,
        licoresModalOpen: true,
      };

    case types.uiCloseLicoresModal:
      return {
        ...state,
        licoresModalOpen: false,
      };

    case types.uiOpenVinosModal:
      return {
        ...state,
        vinosModalOpen: true,
      };

    case types.uiCloseVinosModal:
      return {
        ...state,
        vinosModalOpen: false,
      };

    case types.uiOpenOrdenesModal:
      return {
        ...state,
        ordenesModalOpen: true,
      };

    case types.uiCloseOrdenesModal:
      return {
        ...state,
        ordenesModalOpen: false,
      };
    default:
      return state;
  }
};
