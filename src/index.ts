import express from "express";
import cors from "cors";
import { config, pool } from "./config";
import { register, login, refreshToken, logout } from "./auth";
import { verifyToken } from "./middleware";
import dbtestRoutes from "./routes/dbtestRoutes";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api', dbtestRoutes);
app.use('/api/auth/v1', authRoutes);
app.use('/api/v1', productRoutes);


app.post("/register", register);
app.post("/login", login);
// app.post("/refresh-token", refreshToken);
app.post("/logout", logout);

app.get("/protected", verifyToken, (req: any, res: any) => {
//   res.json({ message: "This is protected data", user: req.user });
  res.json({ 
    message: "This is protected data",
    user: req.user
  });
});

app.listen(config.port, () => {
  console.log(`Server running on http://${config.host}:${config.port}`);
});
