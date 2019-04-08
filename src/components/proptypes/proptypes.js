import PropTypes from "prop-types";

export const initializeOptionsPropType = PropTypes.func.isRequired;
export const initializeCustomizedComponentsPropType = PropTypes.func.isRequired;

export const cellValPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool
]).isRequired;

// Options propstype
export const titlePropType = PropTypes.string;
export const widthPropType = PropTypes.string.isRequired;
export const heightPropType = PropTypes.string.isRequired;
export const keyColumnPropType = PropTypes.string.isRequired;
export const fontPropType = PropTypes.string;
export const idPropType = PropTypes.string.isRequired;
export const labelPropType = PropTypes.string.isRequired;
export const colSizePropType = PropTypes.number.isRequired;
export const editablePropType = PropTypes.boolean;
export const dataTypePropType = PropTypes.string;
export const inputTypePropType = PropTypes.string;
export const dateFormatPropType = PropTypes.string;
export const valuesPropType = PropTypes.array;
export const requiredPropType = PropTypes.boolean;
export const valueVerificationPropType = PropTypes.func;
export const rowPropType = PropTypes.object;
export const rowsPropType = PropTypes.arrayOf(rowPropType);
export const canEditPropType = PropTypes.boolean;
export const canPrintPropType = PropTypes.boolean;
export const canDownloadPropType = PropTypes.boolean;
export const canSearchPropType = PropTypes.boolean;
export const canRefreshRowsPropType = PropTypes.boolean;
export const canFilterColumnsPropType = PropTypes.boolean;
export const canSaveUserConfigurationPropType = PropTypes.boolean;
export const columnsOrderPropType = PropTypes.arrayOf(PropTypes.string);
export const copyToClipboardPropType = PropTypes.boolean;
export const availablePropType = PropTypes.arrayOf(PropTypes.number);
export const selectedPropType = PropTypes.number;
export const rowsSelectablePropType = PropTypes.boolean;
export const selectPageRowsPropType = PropTypes.boolean;
export const selectAllRowsPropType = PropTypes.boolean;
export const tooltipPropType = PropTypes.string;
export const iconPropType = PropTypes.element.isRequired;
export const positionPropType = PropTypes.number;
export const onClickPropType = PropTypes.func.isRequired;
export const headOfTheTablePropType = PropTypes.element;
export const bodyOfTheTablePropType = PropTypes.element;

export const datatablePropType = PropTypes.shape({
  width: widthPropType
});

export const headerPropType = PropTypes.shape({
  height: heightPropType
});

export const bodyPropType = PropTypes.shape({
  height: heightPropType
});

export const rowDimensionPropType = PropTypes.shape({
  height: heightPropType
});

export const dimensionsPropType = PropTypes.shape({
  datatable: datatablePropType,
  header: headerPropType,
  body: bodyPropType,
  row: rowDimensionPropType
});

export const columnPropType = PropTypes.shape({
  id: idPropType,
  label: labelPropType,
  colSize: colSizePropType,
  editable: editablePropType,
  dataType: dataTypePropType,
  inputType: inputTypePropType,
  dateFormat: dateFormatPropType,
  values: valuesPropType,
  required: requiredPropType,
  valueVerification: valueVerificationPropType
});

export const columnsPropType = PropTypes.arrayOf(columnPropType).isRequired;

export const dataPropType = PropTypes.shape({
  columns: columnsPropType,
  rows: rowsPropType
}).isRequired;

export const userConfigurationPropType = PropTypes.shape({
  columnsOrder: columnsOrderPropType,
  copyToClipboard: copyToClipboardPropType
});

export const rowsPerPagePropType = PropTypes.shape({
  available: availablePropType,
  selected: selectedPropType
});

export const selectionPropType = PropTypes.shape({
  rowsSelectable: rowsSelectablePropType,
  selectPageRows: selectPageRowsPropType,
  selectAllRows: selectAllRowsPropType
});

export const additionalIconsPropType = PropTypes.shape({
  tooltip: tooltipPropType,
  icon: iconPropType,
  position: positionPropType,
  onClick: onClickPropType
});

export const selectionIconsPropType = PropTypes.shape({
  tooltip: tooltipPropType,
  icon: iconPropType,
  position: positionPropType,
  onClick: onClickPropType
});

export const featuresPropType = PropTypes.shape({
  canEdit: canEditPropType,
  canPrint: canPrintPropType,
  canDownload: canDownloadPropType,
  canSearch: canSearchPropType,
  canRefreshRows: canRefreshRowsPropType,
  canFilterColumns: canFilterColumnsPropType,
  canSaveUserConfiguration: canSaveUserConfigurationPropType,
  userConfiguration: userConfigurationPropType,
  rowsPerPage: rowsPerPagePropType,
  selection: selectionPropType,
  additionalIcons: PropTypes.arrayOf(additionalIconsPropType),
  selectionIcons: PropTypes.arrayOf(selectionIconsPropType)
});

export const optionsPropType = PropTypes.shape({
  title: titlePropType,
  dimensions: dimensionsPropType,
  keyColumn: keyColumnPropType,
  font: fontPropType,
  data: dataPropType,
  features: featuresPropType
});
