import {
    DpsAC,
    DpsDC,
    Fusible,
    InteruptorAutomatico,
    InterruptorManual,
    Inversor,
    MicroInversor,
    PanelSolar
} from "./base_data";

export class BaseData {
    dpssAC: DpsAC[];
    dpssDC:  DpsDC[];
    fusibles: Fusible[];
    interruptoresAutomaticos: InteruptorAutomatico[];
    interruptoresManuales: InterruptorManual[];
    inversores: Inversor[];
    microInversores: MicroInversor[];
    panelesSolares: PanelSolar[];  
}