from fastapi import FastAPI, HTTPException
from app.schemas.simulation import SimulationRequest
from app.services.simulation import simulate_failure

app = FastAPI(title="BREAKWISE API")


@app.get("/health")
def health_check():
    return {"status": "ok"}


ENTITIES = [
    {
        "id": "payment-provider",
        "name": "Payment Provider",
        "type": "VENDOR",
        "criticality": "HIGH",
    },
    {
        "id": "payment-system",
        "name": "Payment System",
        "type": "SYSTEM",
        "criticality": "CRITICAL",
    },
    {
        "id": "checkout",
        "name": "Checkout",
        "type": "PROCESS",
        "criticality": "HIGH",
    },
    {
        "id": "orders",
        "name": "Orders",
        "type": "PROCESS",
        "criticality": "CRITICAL",
    },
    {
        "id": "revenue",
        "name": "Revenue",
        "type": "PROCESS",
        "criticality": "CRITICAL",
    },
]


DEPENDENCIES = [
    {
        "source": "payment-provider",
        "target": "payment-system",
    },
    {
        "source": "payment-system",
        "target": "checkout",
    },
    {
        "source": "checkout",
        "target": "orders",
    },
    {
        "source": "orders",
        "target": "revenue",
    },
]


@app.post("/simulate")
def run_simulation(request: SimulationRequest):

    try:
        result = simulate_failure(
            ENTITIES,
            DEPENDENCIES,
            request.failure_entity_id,
        )

        return result

    except ValueError as error:
        raise HTTPException(
            status_code=404,
            detail=str(error),
        )
