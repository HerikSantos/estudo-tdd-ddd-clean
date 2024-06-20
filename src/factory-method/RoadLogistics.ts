import { type Logistics } from "./Logistics";

class RoadLogistics implements Logistics {
    public planDelivery(): void {
        throw new Error("Method not implemented.");
    }

    public createTransport(): void {
        throw new Error("Method not implemented.");
    }
}

const a = new RoadLogistics();
