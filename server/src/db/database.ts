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

export interface rideItem extends RowDataPacket {
  id: number;
  title: string;
  slug: string;
  text: string;
}

export interface UserLogin extends RowDataPacket {
  id: number;
  user_name: string;
  user_email: string;
  user_password: string;
}

export const allRide = async (): Promise<rideItem[]> => {
  const [rows] = await pool.query<rideItem[]>(`
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

export const filteredRides = async (): Promise<rideItem[]> => {
  const [rows] = await pool.query<rideItem[]>(`
    SELECT
      *
    FROM ride
    JOIN port  AS start_port ON ride.start_port_id = start_port.id
    JOIN port  AS end_port   ON ride.end_port_id   = end_port.id
    JOIN boats               ON ride.boat_id       = boats.id
    JOIN user  AS owner      ON ride.owner_id      = owner.id
    WHERE 
    `
  )
}

export const onerideItem = async (id: string): Promise<rideItem[]> => {
  const [rows] = await pool.query<rideItem[]>(
    "SELECT * FROM ride WHERE id = ?",
    [id]
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