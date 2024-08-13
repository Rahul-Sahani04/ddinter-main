export default function handler(req, res, next) {
  console.log("Hello from the server");
  return res.status(400).json({ message: "Welcome message" });
}
