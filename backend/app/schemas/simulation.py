from pydantic import BaseModel


class SimulationRequest(BaseModel):
    failure_entity_id: str
