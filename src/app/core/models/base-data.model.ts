import {
    DpsAC,
    DpsDC,
    Fusible,
    InteruptorAutomatico,
    InterruptorManual,
    Inversor,
    MicroInversor,
    PanelSolar,
    InversorInterface
} from "./base_data";

export class BaseData {
    dpssAC: DpsAC[];
    dpssDC:  DpsDC[];
    fusibles: Fusible[];
    interruptoresAutomaticos: InteruptorAutomatico[];
    interruptoresManuales: InterruptorManual[];
    inversores: InversorInterface[];
    microInversores: MicroInversor[];
    panelesSolares: PanelSolar[];  
}