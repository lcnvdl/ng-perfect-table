export class ColumnDefinition {
  id = "";
  sortable = true;
  headerHTML = "";
  headerLabelHTML = "";
  title = "";
  visible = true;
  classes: string[] = [];

  get isHeaderHTML() {
    return this.headerHTML && this.headerHTML != "";
  }

  get isHeaderLabelHTML() {
    return this.headerLabelHTML && this.headerLabelHTML != "";
  }
}