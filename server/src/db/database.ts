import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export interface RideItem extends RowDataPacket {
  first_name: string,
  last_name: string,
  id: number;
  ticket_cost: number;
  date: string;
  expected_arrival: string;
  fromPort: string;
  toPort: string;
  boatType: string;
  totalSeats: number;
}
export interface UserLogin extends RowDataPacket {
  id: number;
  user_name: string;
  user_email: string;
  user_password: string;
}

export const allRide = async (): Promise<RideItem[]> => {
  const [rows] = await pool.query<RideItem[]>(`
    SELECT
      *
    FROM ride
    JOIN port  AS start_port ON ride.start_port_id = start_port.id
    JOIN port  AS end_port   ON ride.end_port_id   = end_port.id
    JOIN boats               ON ride.boat_id       = boats.id
    JOIN user  AS owner      ON ride.owner_id      = owner.id
  `);
  return rows;
};

export const filteredRides = async (
  from: string,
  to: string,
  date: string
): Promise<RideItem[]> => {
  const [rows] = await pool.query<RideItem[]>(
    `
    SELECT ride.id, ride.ticket_cost, ride.date, ride.expected_arrival,
           start_port.name AS fromPort,
           end_port.name AS toPort,
           boats.type AS boatType,
           boats.seats AS totalSeats,
           user.first_name,
           user.last_name
    FROM ride
    JOIN port AS start_port ON ride.start_port_id = start_port.id
    JOIN port AS end_port ON ride.end_port_id = end_port.id
    JOIN boats ON ride.boat_id = boats.id
    JOIN user ON ride.owner_id = user.id
    WHERE start_port.name = ?
      AND end_port.name = ?
      AND DATE(ride.date) > ?
    `,
    [from, to, date]
  );
  return rows;
};

export const createrideItem = async (
  title: string,
  slug: string,
  text: string
): Promise<ResultSetHeader> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO ride (title, slug, text) VALUES (?, ?, ?)",
    [title, slug, text]
  );

  return result;
};

export const authUser = async (username: string): Promise<UserLogin[]> => {
  const [rows] = await pool.query<UserLogin[]>(
    "SELECT * FROM user_login WHERE user_name = ?",
    [username]
  );

  return rows;
};

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<ResultSetHeader> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO user_login (user_name, user_email, user_password) VALUES (?, ?, ?)",
    [username, email, password]
  );

  return result;
};