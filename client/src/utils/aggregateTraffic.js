// Groups raw /rides/traffic rows (one row per ride) into per-port totals.
// A ride counts toward both its start port and its end port. Ports with no
// active rides simply never appear in the input, so they're absent here too.

const LOW_COLOR = "#53d8fb";
const HIGH_COLOR = "#ffbf69";
const PEAK_COLOR = "#ff735c";

export function aggregatePortTraffic(rows) {
  const ports = new Map();

  const addRide = (id, name, lat, lng) => {
    if (id == null || lat == null || lng == null) return;
    const existing = ports.get(id);
    if (existing) {
      existing.boats += 1;
    } else {
      ports.set(id, {
        name,
        latitude: Number(lat),
        longitude: Number(lng),
        boats: 1,
      });
    }
  };

  for (const row of rows) {
    addRide(
      row.start_port_id,
      row.start_port_name,
      row.start_port_lat,
      row.start_port_lng,
    );
    addRide(
      row.end_port_id,
      row.end_port_name,
      row.end_port_lat,
      row.end_port_lng,
    );
  }

  const portList = [...ports.values()];
  const maxBoats = Math.max(...portList.map((p) => p.boats), 1);

  return portList.map((port) => {
    const ratio = port.boats / maxBoats;
    const color =
      ratio >= 0.66 ? PEAK_COLOR : ratio >= 0.33 ? HIGH_COLOR : LOW_COLOR;
    return { ...port, color };
  });
}
