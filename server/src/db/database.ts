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

export const createRideItem = async (
  ownerId: number,         
  boatId: number,        
  from: string,    
  to: string,   
  price: string,          
  departure: string,     
  arrival: string,        
  description: string,
): Promise<ResultSetHeader> => {
  const [result] = await pool.query<ResultSetHeader>(
    `
    INSERT INTO ride
      (owner_id, boat_id, start_port_id, end_port_id, ticket_cost,
       expected_arrival, \`date\`, description)
    VALUES
      (
        ?,                                          -- owner_id
        ?,                                          -- boat_id
        (SELECT id FROM port WHERE name = ?),       -- start_port_id, looked up by name
        (SELECT id FROM port WHERE name = ?),       -- end_port_id, looked up by name
        ?,                                          -- ticket_cost
        ?,                                          -- expected_arrival
        ?,                                          -- date (departure)
        ?                                           -- description
      )
    `,
    [
      42,
      boatId,
      from,          
      to,         
      Number(price),        
      arrival,
      departure,
      description,
    ]
  );

  return result;
};

export const authUser = async (email: string): Promise<UserLogin[]> => {
  const [rows] = await pool.query<UserLogin[]>(
    "SELECT * FROM user WHERE user.email = ?",
    [email]
  );
  return rows;
};

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<ResultSetHeader> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO user (user_name, email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );

  return result;
};