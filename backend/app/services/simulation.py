from collections import defaultdict, deque


def simulate_failure(
    entities: list[dict],
    dependencies: list[dict],
    failed_entity_id: str,
):
    """
    Simulate failure propagation through the dependency graph.

    source -> target
    means failure can propagate from source to target.
    """

    graph = defaultdict(list)

    for dependency in dependencies:
        source = dependency["source"]
        target = dependency["target"]
        graph[source].append(target)

    entity_map = {
        entity["id"]: entity
        for entity in entities
    }

    if failed_entity_id not in entity_map:
        raise ValueError("Failed entity does not exist")

    affected_ids = []
    visited = set()
    queue = deque([failed_entity_id])

    while queue:
        current = queue.popleft()

        if current in visited:
            continue

        visited.add(current)

        if current != failed_entity_id:
            affected_ids.append(current)

        for dependent in graph[current]:
            if dependent not in visited:
                queue.append(dependent)

    affected_entities = []

    for entity_id in affected_ids:
        entity = entity_map[entity_id]

        affected_entities.append({
            "id": entity["id"],
            "name": entity["name"],
            "type": entity["type"],
            "criticality": entity["criticality"],
            "impact_level": calculate_impact_level(
                entity["criticality"]
            ),
        })

    severity = calculate_severity(
        entity_map,
        failed_entity_id,
        affected_ids,
    )

    failed_entity = entity_map[failed_entity_id]

    return {
        "failed_entity": {
            "id": failed_entity["id"],
            "name": failed_entity["name"],
            "type": failed_entity["type"],
            "criticality": failed_entity["criticality"],
        },
        "affected_entities": affected_entities,
        "affected_count": len(affected_entities),
        "severity": severity,
    }


def calculate_impact_level(criticality: str):
    """
    Convert entity criticality into an impact level.
    """

    if criticality == "CRITICAL":
        return "HIGH"

    if criticality == "HIGH":
        return "MEDIUM"

    if criticality == "MEDIUM":
        return "LOW"

    return "LOW"


def calculate_severity(
    entity_map: dict,
    failed_entity_id: str,
    affected_entities: list[str],
):
    failed_criticality = entity_map[failed_entity_id]["criticality"]

    critical_count = sum(
        1
        for entity_id in affected_entities
        if entity_map[entity_id]["criticality"] in ["CRITICAL", "HIGH"]
    )

    if failed_criticality == "CRITICAL" or critical_count >= 3:
        return "HIGH"

    if failed_criticality == "HIGH" or critical_count >= 1:
        return "MEDIUM"

    return "LOW"
