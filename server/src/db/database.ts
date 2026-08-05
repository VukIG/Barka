import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
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
      Number(ownerId),
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
  firstName: string,
  lastName: string,
  age: number,
  gender: string | null,
  nationality: string,
  role: string,
  email: string,
  password: string
): Promise<ResultSetHeader> => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO user
       (user_name, first_name, last_name, age, gender, nationality, role, email, password)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [username, firstName, lastName, age, gender, nationality, role, email, password]
  );

  return result;
};

export const getUserProfile = async (userId: number) => {
  const [userRows]: any = await pool.query(
    `SELECT u.id, u.user_name, u.first_name, u.last_name, u.nationality, u.verified, u.created,
            COUNT(DISTINCT rv.id) AS review_count,
            ROUND(AVG(rv.rating), 1) AS average_rating
     FROM user u
     LEFT JOIN review rv ON rv.reviewee_id = u.id
     WHERE u.id = ?
     GROUP BY u.id`,
    [userId]
  );

  const [trips]: any = await pool.query(
    `SELECT r.id, sp.name AS from_port, ep.name AS to_port, r.date, r.expected_arrival, r.ticket_cost, r.status, b.type AS boat_type, b.seats AS boat_seats
     FROM ride r
     JOIN port sp ON r.start_port_id = sp.id
     JOIN port ep ON r.end_port_id = ep.id
     JOIN boats b ON r.boat_id = b.id
     WHERE r.owner_id = ?
     ORDER BY r.date DESC`,
    [userId]
  );

  const [userReviews]: any = await pool.query(
    `SELECT rv.id, rv.rating, rv.description, rv.date, reviewer.user_name AS reviewer_name, sp.name AS from_port, ep.name AS to_port
     FROM review rv
     JOIN user reviewer ON rv.reviewer_id = reviewer.id
     JOIN ride r ON rv.ride_id = r.id
     JOIN port sp ON r.start_port_id = sp.id
     JOIN port ep ON r.end_port_id = ep.id
     WHERE rv.reviewee_id = ?
     ORDER BY rv.date DESC`,
    [userId]
  );

  return {
    user: userRows[0] || null,
    trips: trips,
    reviews: userReviews,
  };
};

export const getSpecificRide = async (rideId: number) => {
  const [rideData]:any = await pool.query(
    `SELECT * FROM ride WHERE ride.id = ?`,
    [rideId]
  )
}