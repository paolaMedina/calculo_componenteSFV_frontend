export function plant_fv_power(panel_quantity: number, fv_panel_power: number): number {
    return panel_quantity * fv_panel_power / 1000;
}