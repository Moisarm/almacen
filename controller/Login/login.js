const { oneUser, comparePass } = require("../user/user");
const jwt = require("jsonwebtoken");

const ENV = require(`../../config/envConfig`);

let login = async (username,password )=>{

    try {

        ///buscar al usuario y traer la clave. 

       let userDB = await oneUser({userName:username})
       userDB = userDB[0]
        console.log(userDB)

        let passOk = await comparePass(password, userDB.password)
        console.log(passOk)
    
        console.log(username, password)
        if (!username || !password) {
        //   return res.status(400).json({ message: "Username and password are required" });
            return {status:400,
                info:{ message: "Username and password are required" }
            }
        }
        if (username === userDB.userName && passOk) {
          console.log(`COincide`)
          const token = jwt.sign({ username }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES });

          return {status:200,
            response: {token}
        }
          return res.status(200).json({ token });
        } else {
            console.log(`no coincide`)
            return {status:401,
                info:{ message: "Authentication failed" }
            }
          return res.status(401).json({ message: "Authentication failed" });
        }
      } catch (error) {
        console.log(error)
        return {status:500,
            info:{ message: "Internal server error" }
        }
        return res.status(500).json({ message: "Internal server error" });
      }
}


let verifyToken = async (req, res, next) =>{

    // const header = req.header("Authorization") || "";
    // const token = header.split(" ")[1];
    const token = req.query.token;
    console.log(req)
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: "Token not provied" });
    }
    try {
      const payload = jwt.verify(token, ENV.JWT_SECRET);
      console.log(payload)
      req.username = payload.username;
      req.tokenUser = token
      next();
    } catch (error) {
      return res.status(403).json({ message: "Token not valid" });
    }
  }

module.exports = {
login,
verifyToken
}