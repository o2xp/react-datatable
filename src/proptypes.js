import PropTypes from "prop-types";

// Redux
export const initializeOptionsPropType = PropTypes.func.isRequired;
export const initializeCustomComponentsPropType = PropTypes.func.isRequired;
export const updateComponentSizePropType = PropTypes.func.isRequired;
export const sortColumnsPropType = PropTypes.func.isRequired;
export const addToDeleteRowPropType = PropTypes.func.isRequired;
export const setPagePagePropType = PropTypes.func.isRequired;
export const setRowsPerPagePropType = PropTypes.func.isRequired;
export const setRowEditedPropType = PropTypes.func.isRequired;
export const addRowEditedPropType = PropTypes.func.isRequired;
export const revertRowEditedPropType = PropTypes.func.isRequired;
export const addNewRowPropType = PropTypes.func.isRequired;
export const saveRowEditedPropType = PropTypes.func.isRequired;
export const deleteRowPropType = PropTypes.func.isRequired;
export const setIsScrollingPropType = PropTypes.func.isRequired;
export const selectRowPropType = PropTypes.func.isRequired;
export const setRowsSelectedPropType = PropTypes.func.isRequired;
export const setColumnVisibiltyPropType = PropTypes.func.isRequired;
export const searchPropType = PropTypes.func.isRequired;
export const toggleSnackbarPropType = PropTypes.func.isRequired;
export const setUserConfigurationPropType = PropTypes.func.isRequired;
export const enqueueSnackbarPropType = PropTypes.func.isRequired;
export const refreshRowsUserPropType = PropTypes.func.isRequired;
export const refreshRowsPropType = PropTypes.func;
export const orderByColumnsPropType = PropTypes.func.isRequired;
export const addAllRowsToEditedPropType = PropTypes.func.isRequired;
export const saveAllRowsEditedPropType = PropTypes.func.isRequired;
export const revertAllRowsToEditedPropType = PropTypes.func.isRequired;
export const duplicateRowPropType = PropTypes.func.isRequired;
export const initTextPropType = PropTypes.func.isRequired;
export const isScrollingPropType = PropTypes.bool;
export const canDeletePropType = PropTypes.bool;
export const checkedPropType = PropTypes.bool;
export const orderByPropType = PropTypes.arrayOf(PropTypes.object);
export const isRefreshingPropType = PropTypes.bool;
export const strippedPropType = PropTypes.bool;
export const searchTermPropType = PropTypes.string;
export const rowsEditedPropType = PropTypes.arrayOf(PropTypes.object);
export const rowsDeletedPropType = PropTypes.arrayOf(PropTypes.object);
export const rowsSelectedPropType = PropTypes.arrayOf(PropTypes.object);
export const rowsGlobalEditedPropType = PropTypes.arrayOf(PropTypes.object);
export const maskPropType = PropTypes.array;

export const cellValPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool
]);

export const classesPropType = PropTypes.object;

// Input propTypes
export const typePropType = PropTypes.string;
export const rowIdPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);
export const columnIdPropType = PropTypes.string;
export const editingPropType = PropTypes.bool;

// Pagination propTypes
export const pageSelectedPropType = PropTypes.number;
export const pageTotalPropType = PropTypes.number;
export const rowsPerPageSelectedPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);
export const rowsCurrentPagePropType = PropTypes.arrayOf(
  PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
);
export const paginationPropType = PropTypes.shape({
  pageSelected: pageSelectedPropType,
  pageTotal: pageTotalPropType,
  rowsPerPageSelected: rowsPerPageSelectedPropType,
  rowsCurrentPage: rowsCurrentPagePropType
});

export const textPropType = PropTypes.string.isRequired;
export const textPropsPropType = PropTypes.object;

// Options propTypes
export const actionsPropType = PropTypes.func;
export const canEditRowPropType = PropTypes.func;
export const forceRerenderPropType = PropTypes.bool;
export const titlePropType = PropTypes.string;
export const overrideTextPropType = PropTypes.string;
export const widthPropType = PropTypes.string;
export const widthNumberPropType = PropTypes.number;
export const heightPropType = PropTypes.string;
export const heightNumberPropType = PropTypes.number;
export const columnSizeMultiplierPropType = PropTypes.number;
export const stylePropType = PropTypes.object;
export const keyColumnPropType = PropTypes.string;
export const fontPropType = PropTypes.string;
export const idPropType = PropTypes.string;
export const labelPropType = PropTypes.string;
export const colSizePropType = PropTypes.string;
export const editablePropType = PropTypes.bool;
export const dataTypePropType = PropTypes.string;
export const inputTypePropType = PropTypes.string;
export const dateFormatPropType = PropTypes.string;
export const valuesPropType = PropTypes.array;
export const requiredPropType = PropTypes.bool;
export const valueVerificationPropType = PropTypes.func;
export const rowPropType = PropTypes.object;
export const rowsPropType = PropTypes.arrayOf(rowPropType);
export const canEditPropType = PropTypes.bool;
export const canGlobalEditPropType = PropTypes.bool;
export const canPrintPropType = PropTypes.bool;
export const canDownloadPropType = PropTypes.bool;
export const canSearchPropType = PropTypes.bool;
export const canAddPropType = PropTypes.bool;
export const canRefreshRowsPropType = PropTypes.bool;
export const canOrderColumnsPropType = PropTypes.bool;
export const canSelectRowPropType = PropTypes.bool;
export const canSaveUserConfigurationPropType = PropTypes.bool;
export const canDuplicatePropType = PropTypes.bool;
export const columnsOrderPropType = PropTypes.arrayOf(PropTypes.string);
export const copyToClipboardPropType = PropTypes.bool;
export const availablePropType = PropTypes.arrayOf(
  PropTypes.oneOfType([PropTypes.string, PropTypes.number])
);
export const selectedPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
]);
export const rowsSelectablePropType = PropTypes.bool;
export const selectPageRowsPropType = PropTypes.bool;
export const selectAllRowsPropType = PropTypes.bool;
export const tooltipPropType = PropTypes.string;
export const iconPropType = PropTypes.element;
export const onClickPropType = PropTypes.func;
export const headOfTheTablePropType = PropTypes.element;
export const bodyOfTheTablePropType = PropTypes.element;

export const datatablePropType = PropTypes.shape({
  width: widthPropType.isRequired,
  height: heightPropType,
  widthNumber: widthNumberPropType
});

export const headerPropType = PropTypes.shape({
  height: heightPropType.isRequired,
  heightNumber: heightNumberPropType
});

export const bodyPropType = PropTypes.shape({
  heightNumber: heightNumberPropType
});

export const rowDimensionPropType = PropTypes.shape({
  height: heightPropType.isRequired,
  heightNumber: heightNumberPropType
});

export const dimensionsPropType = PropTypes.shape({
  datatable: datatablePropType,
  header: headerPropType,
  body: bodyPropType,
  row: rowDimensionPropType,
  columnSizeMultiplier: columnSizeMultiplierPropType
});

export const columnPropType = PropTypes.shape({
  id: idPropType.isRequired,
  label: labelPropType.isRequired,
  colSize: colSizePropType,
  editable: editablePropType,
  dataType: dataTypePropType,
  inputType: inputTypePropType,
  dateFormat: dateFormatPropType,
  values: valuesPropType,
  required: requiredPropType,
  valueVerification: valueVerificationPropType
});

export const columnsPropType = PropTypes.arrayOf(columnPropType);

export const dataPropType = PropTypes.shape({
  columns: columnsPropType,
  rows: rowsPropType
});

export const userConfigurationPropType = PropTypes.shape({
  columnsOrder: columnsOrderPropType,
  copyToClipboard: copyToClipboardPropType
});

export const rowsPerPagePropType = PropTypes.shape({
  available: availablePropType,
  selected: selectedPropType
});

export const additionalIconsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    tooltip: tooltipPropType,
    icon: iconPropType.isRequired,
    onClick: onClickPropType.isRequired
  })
);

export const additionalActionsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    tooltip: tooltipPropType,
    icon: iconPropType.isRequired,
    onClick: onClickPropType.isRequired
  })
);

export const selectionIconsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    tooltip: tooltipPropType,
    icon: iconPropType.isRequired,
    onClick: onClickPropType.isRequired
  })
);

export const featuresPropType = PropTypes.shape({
  canEdit: canEditPropType,
  canAdd: canAddPropType,
  canPrint: canPrintPropType,
  canDownload: canDownloadPropType,
  canSearch: canSearchPropType,
  canRefreshRows: canRefreshRowsPropType,
  canOrderColumns: canOrderColumnsPropType,
  canSaveUserConfiguration: canSaveUserConfigurationPropType,
  canSelectRow: canSelectRowPropType,
  userConfiguration: userConfigurationPropType,
  rowsPerPage: rowsPerPagePropType,
  additionalActions: additionalActionsPropType,
  additionalIcons: additionalIconsPropType,
  selectionIcons: selectionIconsPropType
});

export const optionsPropType = PropTypes.shape({
  title: titlePropType,
  dimensions: dimensionsPropType,
  keyColumn: keyColumnPropType.isRequired,
  font: fontPropType,
  data: dataPropType.isRequired,
  features: featuresPropType
});

export const CustomTableBodyRowPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.element
]);
export const CustomTableBodyCellPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.element
]);
export const CustomTableHeaderRowPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.element
]);
export const CustomTableHeaderCellPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.element
]);
export const componentPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.element
]);

export const customPropsPropType = PropTypes.any;

export const customDataTypePropType = PropTypes.shape({
  dataType: dataTypePropType.isRequired,
  component: componentPropType.isRequired
});

export const customDataTypesPropType = PropTypes.arrayOf(
  customDataTypePropType
);

export const indexPropType = PropTypes.number;
